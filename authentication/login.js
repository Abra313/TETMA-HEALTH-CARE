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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login is successful");

        const user = userCredential.user;
        localStorage.setItem("loggedInUserId", user.uid);
        
        // Prepare user data to store in the "doctors" collection in Firestore
        const doctorDocRef = doc(db, 'DOCTOR', user.uid); // Adjust 'doctors' to your collection name
        const doctorData = {
            email: email,
            uid: user.uid,
            // Add other doctor-specific data as needed
        };

        // Store doctor data in Firestore
        await setDoc(doctorDocRef, doctorData, { merge: true });
        console.log("Doctor data stored in Firestore:", doctorData);

        // Fetch doctor data from Firestore
        const doctorDoc = await getDoc(doctorDocRef);
        if (doctorDoc.exists()) {
            // Store doctor data in session storage
            sessionStorage.setItem("doctorData", JSON.stringify(doctorDoc.data()));
            console.log("Doctor Data retrieved from Firestore:", doctorDoc.data());
        } else {
            console.log("No such document in doctors collection!");
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
