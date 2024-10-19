import { signInWithEmailAndPassword, auth, db, collection, query, where, getDocs } from '../firebaseConfig.js';

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
        const user = userCredential.user;

        // Log the user before setting to session storage
        console.log("User to be stored in sessionStorage:", user);
        sessionStorage.setItem("tetma_user", JSON.stringify(user));
        
        // Firestore Query: Find the doctor with the matching email in the "DOCTOR" collection
        const doctorsRef = collection(db, 'DOCTOR');
        const doctorQuery = query(doctorsRef, where('email', '==', email));
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
            // If found in DOCTOR collection, redirect to doctor's home page
            const doctorDoc = doctorSnapshot.docs[0];
            const doctorData = doctorDoc.data();
            sessionStorage.setItem("userDetails", JSON.stringify(doctorData)); // Store the complete doctor details
            console.log("Doctor Data retrieved from Firestore:", doctorData);
            
            // Redirect to the doctor's home page
            window.location.href = "../doctorHomePage/doctorHomePage.html";
            alert("Doctor login is successful");
        } else {
            // If not found in DOCTOR, check in the PATIENT collection
            const patientsRef = collection(db, 'PATIENT');
            const patientQuery = query(patientsRef, where('email', '==', email));
            const patientSnapshot = await getDocs(patientQuery);

            if (!patientSnapshot.empty) {
                // If found in PATIENT collection, redirect to patient home page
                console.log("Patient found with the provided email.");
                const patientDoc = patientSnapshot.docs[0];
                const patientData = patientDoc.data();
                sessionStorage.setItem("userDetails", JSON.stringify(patientData));

                // Redirect to the patient's home page
                window.location.href = "../user-location/rukky.html";
                alert("Patient login is successful");
            } else {
                console.log("No user found with the provided email in both collections.");
                alert("No user found with the provided email.");
            }
        }

        clearTimeout(loadingTimeout);
        // Hide loading spinner
        loading.style.display = "none";
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

// Function to get the user from session storage
export const getUser = () => {
    const loggedInUser = sessionStorage.getItem("tetma_user");
    
    if (!loggedInUser) {
        console.log("No user found in session.");
        return null;
    }

    const user = JSON.parse(loggedInUser);  // Correctly parse the string into an object
    console.log(user);    // You can now access the user properties

    return user;
};
