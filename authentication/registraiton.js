import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

// Get elements
const loadingSpinner = document.getElementById('loading');
const submitBtn = document.getElementById('submit');
const db = getFirestore(app);
const auth = getAuth(app);
const passwordField = document.getElementById('signup-password');

// Show loading spinner
function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
}

// Hide loading spinner
function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

// Add event listener for submit button
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const name = document.getElementById('signup-name').value;

    showLoading();
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            name: name,
            email: email,
            // Password is NOT stored here
        };

        const docRef = doc(db, "DOCTOR", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            hideLoading();
            window.location.href = "login.html";
        })
        .catch((error) => {
            hideLoading();
            alert("Error saving user data: " + error.message);
        });
    })
    .catch((error) => {
        hideLoading();
        alert("Error creating user: " + error.message);
    });
});

// Password toggle functionality
const togglePassword = document.getElementById('toggle-password');
togglePassword.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});
