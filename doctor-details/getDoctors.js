// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNjWv2TRRAHE8wfmIY8cfCRBGma1wUX3I",
    authDomain: "tetma-health-care.firebaseapp.com",
    projectId: "tetma-health-care",
    storageBucket: "tetma-health-care.appspot.com",
    messagingSenderId: "132306558594",
    appId: "1:132306558594:web:fd0c3fd954ce2532d09e9b"
};

// Initialize Firebase only if it hasn't been initialized already
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    if (error.code !== 'app/duplicate-app') {
        console.error("Error initializing Firebase:", error);
    }
}

const db = getFirestore(app);

// Function to retrieve doctors
async function getDoctors() {
    try {
        console.log('Fetching doctors...');
        const doctorsRef = collection(db, 'DOCTOR');
        const doctorsSnapshot = await getDocs(doctorsRef);
        
        console.log('Doctors snapshot retrieved:', doctorsSnapshot);
        
        const doctors = doctorsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        if (doctors.length > 0) {
            console.log('Doctors data:', doctors); 
            sessionStorage.setItem('allDoctors', JSON.stringify(doctors));
        } else {
            console.log('No doctors found.');
        }
    } catch (error) {
        console.error('Error retrieving doctors:', error);
    }
}

// Function to get stored doctors from session storage


    const getStoredDoctors = () => {
        const storedDoctors = sessionStorage.getItem("allDoctors");
        if (storedDoctors) {
            const result = JSON.parse(storedDoctors);
            console.log('calling....')
            return result;
        } else {
            console.error('Doctors not found in session storage.');
            console.log('Doctors not found');
        }

    }





// Function to get a single doctor by email
const getSingleDoctor = (email) => {
    const allDocs = getStoredDoctors();
    const doctor = allDocs.find((doc) => doc.email === email);
    console.log(doctor);
    return doctor;
};

// Call the function to retrieve doctors when the script is loaded
getDoctors();

// Optional: Call to retrieve and log stored doctors
const docs = getStoredDoctors();
console.log("Stored doctors:", docs);

export {getDoctors, getSingleDoctor, getStoredDoctors}
