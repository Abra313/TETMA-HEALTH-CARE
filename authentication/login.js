import { signInWithEmailAndPassword, auth, db, collection, query, where, getDocs,  addDoc } from '../firebaseConfig.js';
import { getDoctors } from '../doctor-details/getDoctors.js';


// const patients = [
//     {
//         name: "Alice Johnson",
//         password: "password123",
//         email: "alice.johnson@example.com",
//         address: "123 Maple St, Springfield, IL",
//         age: 30,
//         about: "A passionate nurse who loves helping others.",
//         messages: [
//             { from: "Dr. Smith", content: "Your appointment is confirmed.", date: "2024-10-01" },
//             { from: "Hospital", content: "Please remember to take your medication.", date: "2024-10-03" }
//         ],
//         appointments: [
//             { 
//                 date: "2024-10-10", 
//                 time: "10:00 AM", 
//                 doctorDetails: { 
//                     name: "Dr. Smith", 
//                     specialty: "Cardiologist", 
//                     contact: "555-0123" 
//                 } 
//             },
//             { 
//                 date: "2024-11-01", 
//                 time: "2:00 PM", 
//                 doctorDetails: { 
//                     name: "Dr. Brown", 
//                     specialty: "General Practitioner", 
//                     contact: "555-0456" 
//                 } 
//             }
//         ],
//         notifications: [
//             { content: "New health tips available.", date: "2024-09-28" },
//             { content: "Check your lab results.", date: "2024-09-30" }
//         ],
//         gender: "Female"
//     },
//     // ... Add the other patient objects here
//     {
//         name: "James Davis",
//         password: "james456",
//         email: "james.davis@example.com",
//         address: "159 Oakwood St, Springfield, IL",
//         age: 27,
//         about: "Fitness enthusiast and community volunteer.",
//         messages: [],
//         appointments: [],
//         notifications: [
//             { content: "Check out the new community health program.", date: "2024-10-01" }
//         ],
//         gender: "Male"
//     }
// ];

// // Function to push data to Firestore
// const pushPatientsToFirestore = async () => {
//     const patientsRef = collection(db, 'PATIENT'); // Reference to the PATIENT collection

//     try {
//         for (const patient of patients) {
//             await addDoc(patientsRef, patient);
//             console.log(`Patient ${patient.name} added to Firestore.`);
//         }
//         console.log("All patients added successfully.");
//     } catch (error) {
//         console.error("Error adding patient: ", error);
//     }
// };

// // Call the function to push data
// pushPatientsToFirestore();


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
            // Directly get the first matching doctor document
            const doctorDoc = doctorSnapshot.docs[0];
            const doctorData = doctorDoc.data();
            sessionStorage.setItem("userDetails", JSON.stringify(doctorData)); // Store the complete doctor details
            console.log("Doctor Data retrieved from Firestore:", doctorData);
            
            // Redirect to the doctor's home page
            window.location.href = "../home-page/home.html";
            alert("Doctor login is successful");
        } else {
            // If not found in DOCTOR, check in the PATIENT collection
            const patientsRef = collection(db, 'PATIENT');
            const patientQuery = query(patientsRef, where('email', '==', email));
            const patientSnapshot = await getDocs(patientQuery);

            if (!patientSnapshot.empty) {
                // If found in PATIENT collection, redirect to patient home page
                console.log("Patient found with the provided email.");
                
                // You can add additional code here if you want to store patient data
                const patientDoc = patientSnapshot.docs[0];
                const patientData = patientDoc.data();
                sessionStorage.setItem("userDetails", JSON.stringify(patientData));

                window.location.href = "../home-page/home.html";

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
