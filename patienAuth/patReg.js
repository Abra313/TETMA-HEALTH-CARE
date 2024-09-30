// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import { db, auth, setDoc, doc, createUserWithEmailAndPassword } from "../firebaseConfig.js";

// Get elements
const loadingSpinner = document.getElementById('loading');
const submitBtn = document.getElementById('submit');
const passwordField = document.getElementById('signup-password');

// Show loading spinner
function showLoading() {
    loadingSpinner.style.display = 'block';
}

// Hide loading spinner
function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// Add event listener for submit button
submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;

    showLoading();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Prepare user data to save in Firestore
        const userData = {
            name: name,
            email: email,
            // Do not store the password here
        };

        // Save user data in Firestore under the PATIENT collection
        const docRef = doc(db, "PATIENT", user.uid);
        await setDoc(docRef, userData);
        
        hideLoading();
        alert("Account created successfully! Please log in.");
        window.location.href = "patSig.html";
    } catch (error) {
        hideLoading();
        alert("Error: " + error.message);
        console.log("Error:" + error.message);
    }
});

// Password toggle functionality
const togglePassword = document.getElementById('toggle-password');
togglePassword.addEventListener('click', () => {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye-slash'); 
});
