// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

// Function to find a specific patient by UID
export async function findPatient(uid) {
  try {
    console.log(`Fetching details for patient with UID: ${uid}`);
    const patientRef = doc(db, 'PATIENT', uid); // Assuming UID is the document ID in the 'PATIENT' collection
    const patientDoc = await getDoc(patientRef);

    if (!patientDoc.exists()) {
      console.log('No patient found with that UID.');
      return null; // Return null if no patient is found
    }

    const patientData = {
      id: patientDoc.id,
      ...patientDoc.data()
    };

    console.log('Patient data:', patientData); // Log patient data to the console
    return patientData; // Return the patient data
  } catch (error) {
    console.error('Error retrieving patient:', error);
    throw error; // Optionally rethrow the error for further handling
  }
}

// Test the function with the specific UID
const testUid = '1aJevnEoc5gfv0gSV4juvKVO3qa2';
findPatient(testUid)
  .then(data => {
    console.log('Test Result:', data);
  })
  .catch(error => {
    console.error('Error during test:', error);
  });
