// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
// import { getFirestore, doc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js';
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { auth, db, storage, doc, updateDoc, getDoc, ref, uploadBytes, getDownloadURL, onAuthStateChanged } from "../firebaseConfig.js";



// Get the current user
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const patientRef = doc(db, 'PATIENT', user.uid);
        const patientDoc = await getDoc(patientRef);

        // Populate the form with existing data or create a new patient profile
        const data = patientDoc.exists() ? patientDoc.data() : {};
        document.getElementById('phoneInput').value = data.phone || '';
        document.getElementById('genderInput').value = data.gender || '';
        document.getElementById('addressInput').value = data.address || '';
        document.getElementById('aboutInput').value = data.about || '';
        if (data.image) {
            const preview = document.getElementById('preview');
            preview.src = data.image;
            preview.style.display = 'block';
        }

        // Image preview functionality
        const imageInput = document.getElementById('imageInput');
        const preview = document.getElementById('preview');
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
                    address,
                    about,
                };

                // Include the imageUrl only if it was uploaded
                if (imageUrl) {
                    updateData.image = imageUrl;
                }

                // Update the profile data in the "PATIENT" collection
                await updateDoc(patientRef, updateData);

                alert('Profile updated successfully!');
            } catch (error) {
                console.error("Error updating profile:", error);
                // alert('Failed to update profile');
            }
        });
    } else {
        alert("No user is logged in. Please log in to update your profile.");
    }
});
