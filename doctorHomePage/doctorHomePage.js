// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, get, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Firebase setup
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
const database = getDatabase(app);

// Function to get user data from Firebase
async function getUserData(userId) {
    const userRef = ref(database, 'users/' + userId);
    const snapshot = await get(userRef);
    return snapshot.val();
}

// Function to update location element
function updateLocation(userData) {
    const locationElement = document.getElementById('location');
    if (userData && userData.address) {
        locationElement.textContent = userData.address; 
    } else {
        locationElement.textContent = 'No address available'; 
    }
}

// Get logged-in user from session storage
const getUser = () => {
    const loggedInUser = sessionStorage.getItem("userDetails");

    if (!loggedInUser) {
        console.log("No user found in session.");
        return null;
    }

    try {
        const userData = JSON.parse(loggedInUser); 
        console.log("Logged in user:", userData); 
        return userData; 
    } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
    }
};

// Call the function to update the location
(async () => {
    const user = getUser();
    if (user) {
        const userData = await getUserData(user.id); // Assuming user.id contains the Firebase user ID
        updateLocation(userData);
    }
})();

// Schedule section
const scheduleFig = document.getElementById('Schedule-fig');
scheduleFig.innerHTML = '';

const newElement = document.createElement('p');
newElement.textContent = '1';
newElement.classList.add('new-schedule-class');
scheduleFig.appendChild(newElement);

// User details section
const nameElement = document.getElementById('name');
nameElement.innerHTML = 'Johnson Williams';

const monthElement = document.getElementById('month');
const timeElement = document.getElementById('time');
monthElement.innerHTML = "2024, 24 Oct";
timeElement.innerHTML = "00:00 - 12:00";

// Function to add an image
function addImage() {
    const container = document.getElementById('image-container');
    const imageElement = document.createElement('img');

    imageElement.src = "/aseeet/images/john-hopkins-hospital.jpeg";
    imageElement.alt = 'Johns Hopkins Hospital';
    imageElement.width = 50;
    imageElement.height = 50;
    imageElement.classList.add('my-image');

    container.appendChild(imageElement);
}

// Call the function to add the image
addImage();

// Function to write user data to Firebase
function writeUserData(userId, name, address) {
    const userRef = ref(database, 'users/' + userId);
    set(userRef, {
        username: name,
        address: address
    });
}

// Call the function to write user data (example usage)
writeUserData('user_123', 'Johnson Williams', '123 Main St, Anytown');
