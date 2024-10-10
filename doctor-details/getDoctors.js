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
export async function getDoctors() {
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
      console.log('Doctors data:', doctors); // Log doctors data to the console
      sessionStorage.setItem('allDoctors', JSON.stringify(doctors));
    } else {
      console.log('No doctors found.');
    }
  } catch (error) {
    console.error('Error retrieving doctors:', error);
  }
}

// Call the function to retrieve doctors
// getDoctors();

// Function to get stored doctors from session storage
export const getStoredDoctors = () => {
  const storedDoctors = sessionStorage.getItem("allDoctors");
  if (storedDoctors) {
    const result = JSON.parse(storedDoctors);
    return result;
  } else {
    console.error('Doctors not found in session storage.');
    alert('Doctors not found');
  }
};

export const getSingleDoctor = (email) => {
  const allDocs = getStoredDoctors();
  const doctor =  allDocs.find((array) => array.email == email);
  console.log(doctor);
  return doctor
};


// Call to retrieve and log stored doctors
const docs = getStoredDoctors();

