import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getFirestore, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

// Your Firebase project configuration
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
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Login logic
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        loginForm.style.display = 'none';
        document.getElementById('profileUpdate').style.display = 'block';
    } catch (error) {
        console.error("Error logging in:", error);
        alert('Failed to login: ' + error.message);
    }
});

// Get current user and set up profile update
onAuthStateChanged(auth, (user) => {
    if (user) {
        const imageInput = document.getElementById('imageInput');
        const preview = document.getElementById('preview');

        // Function to preview the image
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });

        const form = document.getElementById('details');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const phone = formData.get('phone');
            const gender = formData.get('gender');
            const address = formData.get('address');
            const about = formData.get('about');
            const file = imageInput.files[0];

            try {
                // Upload the image if a new file is selected
                let imageUrl;
                if (file) {
                    const storageRef = ref(storage, `profileImages/${file.name}`);
                    await uploadBytes(storageRef, file);
                    imageUrl = await getDownloadURL(storageRef);
                }

                // Prepare the update data
                const updateData = {
                    phone,
                    gender,
                    address,
                    about,
                };
                
                // Include the imageUrl only if it was uploaded
                if (imageUrl) {
                    updateData.image = imageUrl;
                }

                // Update the profile data in the "PATIENT" collection using the user's UID
                const patientRef = doc(firestore, 'PATIENT', user.uid);
                await updateDoc(patientRef, updateData);

                alert('Profile updated successfully!');
            } catch (error) {
                console.error("Error updating profile:", error);
                alert('Failed to update profile');
            }
        });
    } else {
        // No user is signed in
        console.log("No user is logged in.");
    }
});
