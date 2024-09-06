import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
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
const auth = getAuth(app);

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

    const loadingTimeout = setTimeout(() => {
     
        loading.style.display = "none";
       
    }, 7000); // 5 seconds

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            clearTimeout(loadingTimeout);
            // Hide loading spinner
            loading.style.display = "none";
            // Redirect
            window.location.href = "../home-page/home.html";
        })
        .catch((error) => {
            // Clear the timeout if there is an error
            clearTimeout(loadingTimeout);
            // Hide loading spinner
            loading.style.display = "none";
            // Show error message
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
