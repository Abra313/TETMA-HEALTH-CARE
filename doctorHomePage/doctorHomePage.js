// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js';
import { getUser } from '../utils/getUser.js'; 

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

// Function to update user details section
function updateUserDetails(userData) {
    const nameElement = document.getElementById('name');
    const profilePicElement = document.getElementById('profile-pic');

    if (userData) {
        nameElement.textContent = userData.username || 'No name available';
        profilePicElement.src = userData.profilePic || '/path/to/default-pic.jpg'; // Set default image if none
        console.log("User details updated:", userData);
    } else {
        nameElement.textContent = 'No name available';
        profilePicElement.src = '/path/to/default-pic.jpg';
        console.log("No user data available.");
    }
}

// Function to get upcoming schedule
async function getUpcomingSchedule(userId) {
    const scheduleRef = ref(database, 'appointments/' + userId); // Adjust this path as necessary
    const snapshot = await get(scheduleRef);

    if (snapshot.exists() && snapshot.val().length > 0) {
        return snapshot.val().length; // Return the number of upcoming schedules
    } else {
        return 0; // No upcoming schedules
    }
}

// Call the function to get user data from session storage
(async () => {
    const user = getUser(); // Use the getUser function
    console.log("Retrieved user from session storage:", user);
    
    if (user) {
        updateUserDetails(user);
        
        // Get upcoming schedule
        const upcomingSchedule = await getUpcomingSchedule(user.id || 'xi1gFXzmfuSprt2MRIsTdXrDAst2'); // Use provided ID if no user ID
        console.log("Upcoming schedule count:", upcomingSchedule);
        
        // Display the upcoming schedule count in the Schedule-fig element
        const scheduleFigElement = document.getElementById('Schedule-fig'); // Ensure this element exists
        scheduleFigElement.textContent = `Upcoming Schedule: ${upcomingSchedule}`; // Display the count
    } else {
        console.warn("No user found in session storage.");
        const scheduleFigElement = document.getElementById('Schedule-fig');
        scheduleFigElement.textContent = '0'; // Display 0 if no user found
    }
})();

// Rest of your code...
