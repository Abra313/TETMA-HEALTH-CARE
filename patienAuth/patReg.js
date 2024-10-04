import { db, auth, setDoc, doc, createUserWithEmailAndPassword, collection, getDocs } from "../firebaseConfig.js";


async function updatePatientDocuments() {
    const patientCollection = collection(db, "PATIENT");
    const snapshot = await getDocs(patientCollection);

    const updatePromises = snapshot.docs.map(async (doc) => {
        const userData = doc.data();
        
        // Create an updated user data object
        const updatedData = {
            ...userData,
            // yearOfExperience: userData.yearOfExperience || 0,
            rating: userData.rating !== undefined ? userData.rating : 0, // Set default rating
            reviews: Array.isArray(userData.reviews) ? userData.reviews : [], // Ensure reviews is an array
            appointments: Array.isArray(userData.appointments) ? userData.appointments : [], // Ensure appointments is an array
            patients: Array.isArray(userData.patients) ? userData.patients : [] // Ensure patients is an array
        };

        // Update the document with the new fields
        await setDoc(doc.ref, updatedData);
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);
    console.log("All documents updated successfully.");
}

// Call the update function
updatePatientDocuments().catch(error => {
    console.error("Error updating documents: ", error);
});

updatePatientDocuments();

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
    
    // Add your new fields here
    // const yearOfExperience = parseInt(document.getElementById('year-experience').value) || 0; // Assuming there's an input field for years of experience
   
    const appointments = []; // Initialize as an empty array
   

    showLoading();
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            name: name,
            email: email,
            // yearOfExperience: yearOfExperience,
           
            appointments: appointments,
           
            // Password is NOT stored here
        };

        const docRef = doc(db, "PATIENT", user.uid);
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
