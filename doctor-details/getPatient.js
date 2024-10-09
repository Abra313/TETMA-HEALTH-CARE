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

// Function to retrieve patients
async function getPatients() {
  try {
    console.log('Fetching patients...');
    const patientsRef = collection(db, 'PATIENT'); // Assuming your collection is named 'PATIENT'
    const patientsSnapshot = await getDocs(patientsRef);
    
    console.log('Patients snapshot retrieved:', patientsSnapshot);
    
    if (patientsSnapshot.empty) {
      console.log('No patients found.');
      return []; // Return an empty array if no patients are found
    }

    const patients = patientsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Patients data:', patients); // Log patients data to the console
    return patients; // Return the patients data
  } catch (error) {
    console.error('Error retrieving patients:', error);
    throw error; // Optionally rethrow the error for further handling
  }
}

// Call the function to retrieve patients
getPatients().then(patients => {
  console.log('Retrieved patients:', patients);
}).catch(error => {
  console.error('Failed to retrieve patients:', error);
});
