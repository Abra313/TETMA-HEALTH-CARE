// Import Firebase modules

import {auth,sendPasswordResetEmail }from "../firebaseConfig.js";



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
