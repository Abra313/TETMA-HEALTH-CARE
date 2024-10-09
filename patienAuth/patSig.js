import { signInWithEmailAndPassword, auth, db, doc, getDoc, setDoc } from '../firebaseConfig.js';

// Get the form element
const loginForm = document.getElementById("login-form");
const loading = document.getElementById("loading");

// Add event listener to the form
loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Show loading spinner
    loading.style.display = "flex";

    // Input
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Store the email in session storage
    sessionStorage.setItem("loggedInEmail", email);
    console.log("Email stored in session storage:", email);

    const loadingTimeout = setTimeout(() => {
        loading.style.display = "none";
    }, 7000); // 7 seconds

    try {
        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login is successful");

        const user = userCredential.user;
        localStorage.setItem("loggedInUserId", user.uid);
        
        const patientDocRef = doc(db, 'PATIENT', user.uid); 
        const patientData = {
            email: email,
            uid: user.uid,
            // Add other patient-specific data as needed
        };

        // Store patient data in Firestore
        await setDoc(patientDocRef, patientData, { merge: true });
        console.log("Patient data stored in Firestore:", patientData);

        // Fetch patient data from Firestore
        const patientDoc = await getDoc(patientDocRef);
        if (patientDoc.exists()) {
            sessionStorage.setItem("patientData", JSON.stringify(patientDoc.data())); // Corrected variable name
            console.log("Patient Data retrieved from Firestore:", patientDoc.data());
        } else {
            console.log("No such document in patient collection!");
        }

        clearTimeout(loadingTimeout);
        // Hide loading spinner
        loading.style.display = "none";
        // Redirect
        window.location.href = "../home-page/home.html";
    } catch (error) {
        clearTimeout(loadingTimeout);
        loading.style.display = "none";
        alert(error.message);
    }
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
