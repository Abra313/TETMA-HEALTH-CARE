// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

// Get the form and message elements
const form = document.getElementById('forgot-password-form');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;

  if (!email) {
    message.textContent = 'Please enter your email address.';
    message.className = 'error';
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 4000);
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    message.textContent = 'Password reset email sent! Please check your inbox.';
    message.className = 'success';
    
    // Redirect to a confirmation page or another part of your app
    // setTimeout(() => {
    //   window.location.href = 'confirmation.html'; // Change to your confirmation or desired page
    // }, 2000); // Delay before redirecting to allow the user to see the message

  } catch (error) {
    console.error("Error sending password reset email:", error); // Log detailed error to console
    
    if (error.code === 'auth/too-many-requests') {
      message.textContent = 'You have requested too many password resets. Please try again later.';
    } else {
      message.textContent = 'Error: ' + error.message;
    }
    
    message.className = 'error';
  }

  // Show message
  message.style.display = 'block';
  
  // Hide message after 4 seconds
  setTimeout(() => {
    message.style.display = 'none';
  }, 4000);
});
