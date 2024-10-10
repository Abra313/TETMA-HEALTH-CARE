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

// Function to find a specific doctor by UID
export async function findDoctor(uid) {
  try {
    console.log(`Fetching details for doctor with UID: ${uid}`);
    const doctorRef = doc(db, 'DOCTOR', uid); // Assuming UID is the document ID in the 'DOCTOR' collection
    const doctorDoc = await getDoc(doctorRef);

    if (!doctorDoc.exists()) {
      console.log('No doctor found with that UID.');
      return null; // Return null if no doctor is found
    }

    const doctorData = {
      id: doctorDoc.id,
      ...doctorDoc.data()
    };

    console.log('Doctor data:', doctorData); // Log doctor data to the console
    return doctorData; // Return the doctor data
  } catch (error) {
    console.error('Error retrieving doctor:', error);
    throw error; // Optionally rethrow the error for further handling
  }
}

// Test the function with the specific UID
const testUid = '0JAiO59adWmuHPKRBCWD';
findDoctor(testUid)
  .then(data => {
    console.log('Test Result:', data);
  })
  .catch(error => {
    console.error('Error during test:', error);
  });
