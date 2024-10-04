import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth,onAuthStateChanged , createUserWithEmailAndPassword, signInWithEmailAndPassword ,sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, setDoc, doc, collection, getDocs,getDoc,updateDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js';

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

// Get elements
const db = getFirestore(app);
const auth = getAuth(app);
// Initialize Firebase

const firestore = getFirestore(app);
const storage = getStorage(app);


export{
  getDocs,
  collection,
    db,
    auth, 
    setDoc, 
    doc, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateDoc,
    getDoc,
    ref,
    uploadBytes,
    getDownloadURL,
    onAuthStateChanged,
    storage,
    addDoc
}