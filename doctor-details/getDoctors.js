// // Import Firebase functions
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
// import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
// import firebaseConfig from './firebaseConfig.js'; // Ensure this path is correct


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Function to retrieve doctors
// async function getDoctors() {
//   try {
//     console.log('Fetching doctors...');
//     const doctorsRef = collection(db, 'DOCTOR');
//     const doctorsSnapshot = await getDocs(doctorsRef);
    
//     console.log('Doctors snapshot retrieved:', doctorsSnapshot);
    
//     const doctors = doctorsSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     console.log('Doctors data:', doctors);
    
//     const consoleElement = document.getElementById('doctors-console');
//     if (consoleElement) {
//       consoleElement.innerText = JSON.stringify(doctors, null, 2);
//     } else {
//       console.error('Element with ID "doctors-console" not found.');
//     }
//   } catch (error) {
//     console.error('Error retrieving doctors:', error);
//   }
// }

// // Call the function to retrieve and display doctors
// getDoctors();




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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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

    console.log('Doctors data:', doctors); // Log doctors data to the console
  } catch (error) {
    console.error('Error retrieving doctors:', error);
  }
}

// Call the function to retrieve doctors
getDoctors();


