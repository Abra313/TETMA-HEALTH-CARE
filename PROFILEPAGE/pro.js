import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getFirestore, doc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

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

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the current user
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const doctorRef = doc(firestore, 'DOCTOR', user.uid);
            const doctorDoc = await getDoc(doctorRef);

            // Populate the form with existing data or create a new doctor profile
            const data = doctorDoc.exists() ? doctorDoc.data() : {};
            document.getElementById('speciatyInput').value = data.specialty || '';
            document.getElementById('workingHoursInput').value = data.workingHours || '';
            document.getElementById('yearsInput').value = data.years || '';
            document.getElementById('phoneInput').value = data.phone || '';
            document.getElementById('genderInput').value = data.gender || '';
            document.getElementById('addressInput').value = data.address || '';
            document.getElementById('aboutInput').value = data.about || '';

            const preview = document.getElementById('preview');
            if (data.image) {
                preview.src = data.image;
                preview.style.display = 'block';
            }

            // Image preview functionality
            const imageInput = document.getElementById('imageInput');
            imageInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        preview.src = e.target.result;
                        preview.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                }
            });

            // Form submission to update profile
            const form = document.getElementById('details');
            form.addEventListener('submit', async (event) => {
                event.preventDefault();

                const formData = new FormData(form);
                const phone = formData.get('phone');
                const gender = formData.get('gender');
                const address = formData.get('address');
                const about = formData.get('about');
                const specialty = formData.get('specialty'); // Ensure specialty is captured
                const workingHours = formData.get('workingHours'); // Ensure workingHours is captured
                const years = formData.get('years'); // Ensure years is captured
                const file = imageInput.files[0];

                try {
                    // Upload the image if a new file is selected
                    let imageUrl;
                    if (file) {
                        const storageRef = ref(storage, `profileImages/${user.uid}/${file.name}`);
                        await uploadBytes(storageRef, file);
                        imageUrl = await getDownloadURL(storageRef);
                    }

                    // Prepare the update data
                    const updateData = {
                        phone,
                        gender,
                        specialty,
                        workingHours,
                        years,
                        address,
                        about,
                    };

                    // Include the imageUrl only if it was uploaded
                    if (imageUrl) {
                        updateData.image = imageUrl;
                    }

                    // Update the profile data in the "DOCTOR" collection
                    await updateDoc(doctorRef, updateData);

                    alert('Profile updated successfully!');
                } catch (error) {
                    // console.error("Error updating profile:", error);
                    // alert('Failed to update profile: ' + error.message);
                }
            });
        } else {
            alert("No user is logged in. Please log in to update your profile.");
        }
    });
});
