// login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// import { getFirestore, setDoc,doc  } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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


// Submit button
const submitBtn = document.getElementById("submit");
const loading = document.getElementById("loading");

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Show loading spinner
    loading.style.display = "flex";

    // Input
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // const db = getFirestore(app);
    const auth = getAuth(app);

    const loadingTimeout = setTimeout(() => {
        loading.style.display = "none";
    }, 7000); // 7 seconds

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("login is successful")


            const user = userCredential.user;

            localStorage.setItem("loggedInUserId" , user.uid)

            clearTimeout(loadingTimeout);
            // Hide loading spinner
            loading.style.display = "none";
            // Redirect
            window.location.href = "/home-page/home.html";
           
        })
        .catch((error) => {
            clearTimeout(loadingTimeout);
            loading.style.display = "none";
            alert(error.message);
        });
    
});

// Password toggle functionality
const togglePassword = document.getElementById('toggle-password');
const passwordField = document.getElementById('login-password');

togglePassword.addEventListener('click', function () {
    // Toggle password visibility
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Toggle the eye icon
    this.classList.toggle('fa-eye-slash');
});
