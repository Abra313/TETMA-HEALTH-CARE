import { getFirestore, doc, getDoc, setDoc, arrayUnion, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
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

// Initial message for testing
messagesArray.push({
    id: new Date().getTime() + 1,
    text: "-i guess this works now?",
    sender: "doctorUid1",
    senderDetails: {
        name: "Dr. Smith",
        specialty: "Cardiology",
        role: "doctor"
    },
    receiver: "patientUid1",
    timestamp: formatTime(new Date().getTime()),
    isRead: false,
    isReceived: true
});

console.log(messagesArray);

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
            <div class="message-info" style="display: ${msg.sender === "o8nWrJSa9BcLTY6VDTZjQgCMyLW2" ? 'none' : 'block'};">
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
    const senderUid = "o8nWrJSa9BcLTY6VDTZjQgCMyLW2"; // Replace with auth.currentUser.uid in production

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

    messagesArray.push(messageData);
    renderMessages(); // Update UI

    // Update the messages for the receiver in Firestore
    await updateMessages(receiverUid, messageData, "PATIENT"); // Assuming receiver is a patient
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
function initializeChat() {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById("messageInput");
    
    const receiverUid = "1aJevnEoc5gfv0gSV4juvKVO3qa2"; // Replace with the actual receiver's UID

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

            if (lastMessage) {
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



// Example usage
// auth.onAuthStateChanged((user) => {
//     if (user) {
//         const currentUserUid = user.uid;
//         listenForMessages(currentUserUid); // Start listening for messages
//     } else {
//         console.log("No user is logged in.");
//     }
// });
