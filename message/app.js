import { getFirestore, doc, getDoc, setDoc, arrayUnion, onSnapshot, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNjWv2TRRAHE8wfmIY8cfCRBGma1wUX3I",
    authDomain: "tetma-health-care.firebaseapp.com",
    projectId: "tetma-health-care",
    storageBucket: "tetma-health-care.appspot.com",
    messagingSenderId: "132306558594",
    appId: "1:132306558594:web:fd0c3fd954ce2532d09e9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Array to hold messages
let messagesArray = [];

// Function to format timestamp to "hh:mm am/pm"
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
}

// Function to render messages in the UI
function renderMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Clear existing messages

    messagesArray.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = msg.text.startsWith("-") ? 'received' : 'sent';

        const displayText = msg.text.startsWith("-") ? msg.text.slice(1).trim() : msg.text;

        messageElement.innerHTML = `
            <div class="message-info" style="display: ${msg.sender === auth.currentUser.uid ? 'none' : 'block'};">
                <strong>${msg.senderDetails.name} (${msg.senderDetails.role})</strong>
                ${msg.isRead ? '<span class="read-notice">✓ Viewed</span>' : ''}
            </div>
            <div class="message-text" data-id="${msg.id}">
                <span class="message-content">${displayText}</span> <span class="timestamp">(${msg.timestamp})</span>
                <div class="message-actions" style="display: none;">
                    <input type="text" class="edit-input" placeholder="Edit message..." />
                    <button class="save-button">Save</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
        `;

        messageElement.addEventListener('mouseenter', () => {
            const actions = messageElement.querySelector('.message-actions');
            actions.style.display = 'flex';
        });

        messageElement.addEventListener('mouseleave', () => {
            const actions = messageElement.querySelector('.message-actions');
            actions.style.display = 'none';
        });

        messagesDiv.appendChild(messageElement);
    });

    addActionListeners();
}

// Function to send a message
async function sendMessage(receiverUid, text) {
    const senderUid = auth.currentUser.uid; // Use the logged-in user's UID

    if (text.trim() === "") return;

    const senderDetails = await getUserDetails(senderUid);
    if (!senderDetails) {
        console.error("Sender not found");
        return;
    }

    const messageData = {
        id: new Date().getTime(),
        text: text,
        sender: senderUid,
        senderDetails: {
            name: senderDetails.name,
            ...(senderDetails.specialty && { specialty: senderDetails.specialty }),
            role: senderDetails.role
        },
        receiver: receiverUid,
        timestamp: formatTime(new Date().getTime()),
        isRead: false,
    };

    // Only update the UI with the sent message
    messagesArray.push(messageData);
    renderMessages(); // Update UI

    // Push the message to the doctor's message array
    const doctorEmail = sessionStorage.getItem('chatDoctor');
    const doctorUid = await getDoctorUidByEmail(doctorEmail);
    
    if (doctorUid) {
        await updateMessages(doctorUid, messageData, "DOCTOR"); // Send message to doctor's message array
    }
}

// Function to get user details by UID
async function getUserDetails(userId) {
    const doctorDocRef = doc(db, "DOCTOR", userId);
    const patientDocRef = doc(db, "PATIENT", userId);

    const doctorDocSnap = await getDoc(doctorDocRef);
    if (doctorDocSnap.exists()) {
        const doctorData = doctorDocSnap.data();
        return {
            name: doctorData.name,
            specialty: doctorData.specialty,
            role: "doctor"
        };
    }

    const patientDocSnap = await getDoc(patientDocRef);
    if (patientDocSnap.exists()) {
        const patientData = patientDocSnap.data();
        return {
            name: patientData.name,
            specialty: null,
            role: "patient"
        };
    }

    return null;
}

// Function to update messages in Firestore
async function updateMessages(receiverUid, messageData, role) {
    const docRef = doc(db, role, receiverUid);
    await setDoc(docRef, {
        messages: arrayUnion({ ...messageData })
    }, { merge: true });
}

// Function to add action listeners for save and delete buttons
function addActionListeners() {
    const messagesDiv = document.getElementById('messages');

    messagesDiv.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', () => {
            const messageText = button.closest('.message-text');
            const editInput = messageText.querySelector('.edit-input');
            const messageId = parseInt(messageText.dataset.id, 10);

            if (editInput.value.trim() !== "") {
                editMessage(messageId, editInput.value.trim());
                editInput.value = ''; // Clear input
            }
        });
    });

    messagesDiv.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', () => {
            const messageText = button.closest('.message-text');
            const messageId = parseInt(messageText.dataset.id, 10);
            deleteMessage(messageId);
        });
    });
}

// Function to edit a message
function editMessage(messageId, newText) {
    const messageIndex = messagesArray.findIndex(msg => msg.id === messageId);
    if (messageIndex !== -1) {
        messagesArray[messageIndex].text = newText;
        renderMessages(); // Update UI
    }
}

// Function to delete a message
function deleteMessage(messageId) {
    messagesArray = messagesArray.filter(msg => msg.id !== messageId);
    renderMessages(); // Update UI
}

// Function to initialize the chat functionality when the user is logged in
async function initializeChat() {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById("messageInput");

    // Retrieve the doctor's email from session storage
    const chatDoctorEmail = sessionStorage.getItem('chatDoctor');
    
    // Get the receiver UID based on the email
    const receiverUid = await getDoctorUidByEmail(chatDoctorEmail);
    
    if (!receiverUid) {
        console.error("No doctor found with the given email.");
        return;
    }

    sendButton.addEventListener('click', (e) => {
        e.preventDefault();
        const messageText = messageInput.value;

        sendMessage(receiverUid, messageText).then(() => {
            messageInput.value = ''; // Clear input after sending
        });
    });

    // Start listening for messages
    listenForMessages(receiverUid);
}

// Function to get the doctor UID by email
async function getDoctorUidByEmail(email) {
    const doctorsCollectionRef = collection(db, "DOCTOR");
    const q = query(doctorsCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id; // Return the UID of the first matched document
    } else {
        return null; // No matching doctor found
    }
}

// Listen for authentication state changes
auth.onAuthStateChanged((user) => {
    if (user) {
        const currentUserUid = user.uid;
        console.log("User logged in:", currentUserUid);
        initializeChat(); // Initialize chat functionality for the logged-in user
    } else {
        console.log("No user is logged in.");
    }
});

// Function to listen for changes in messages for the logged-in user
function listenForMessages(loggedinUser) {
    const messagesDocRef = doc(db, "PATIENT", loggedinUser); // Change to "DOCTOR" as needed

    onSnapshot(messagesDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const messages = docSnapshot.data().messages || [];
            const lastMessage = messages[messages.length - 1]; // Get the last message

            // Only update the UI for messages that are replies from the doctor
            if (lastMessage && lastMessage.sender !== loggedinUser) {
                const modifiedText = `-${lastMessage.text}`; // Prepend "-" to the last message text

                // Push the modified message to messagesArray
                messagesArray.push({
                    id: new Date().getTime() + 1, // Unique ID for the message
                    text: modifiedText,
                    sender: lastMessage.sender, // Use the original sender
                    senderDetails: lastMessage.senderDetails, // Use the original sender details
                    receiver: lastMessage.receiver, // Use the original receiver
                    timestamp: formatTime(new Date().getTime()),
                    isRead: false,
                    isReceived: true // This will be true because text starts with '-'
                });

                console.log(messagesArray); // Log the updated messagesArray
                renderMessages(); // Re-render messages to update the UI
            }
        }
    }, (error) => {
        console.error("Error listening for messages:", error);
    });
}
