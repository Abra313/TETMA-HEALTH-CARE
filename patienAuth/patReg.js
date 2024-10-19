import { db, auth, setDoc, doc, createUserWithEmailAndPassword } from "../firebaseConfig.js";

// Get elements
const loadingSpinner = document.getElementById('loading');
const submitBtn = document.getElementById('submit');
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
            password: password, // Handle this securely in production
            appointments: [],
            notifications: [],
            messages: [],
            about: "New patient.",
            phoneNumber: 0,
            address: [],
            paymentHistory: []
        };

        const docRef = doc(db, "PATIENT", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            hideLoading();
            window.location.href = "../authentication/login.html";
        })
        .catch((error) => {
            hideLoading();
            alert("Error saving user data: " + error.message);
        });
    })
    .catch((error) => {
        hideLoading();
        alert("Error: " + error.message);
    });
});

// Password toggle functionality
const togglePassword = document.getElementById('toggle-password');
togglePassword.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

// Function to populate the database with mock data (for testing purposes)
async function populateMockData() {
    // Mock data can be defined here if needed in the future
}

// Uncomment to populate mock data (make sure to run it only once)
// populateMockData();
