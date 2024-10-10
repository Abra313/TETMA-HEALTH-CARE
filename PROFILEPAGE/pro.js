import { auth, db, storage, doc, updateDoc, getDoc, ref, uploadBytes, getDownloadURL, onAuthStateChanged } from "../firebaseConfig.js";

document.addEventListener('DOMContentLoaded', () => {
    // Get the current user
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const doctorRef = doc(db, 'DOCTOR', user.uid);
            const doctorDoc = await getDoc(doctorRef);

            // Populate the form with existing data or create a new doctor profile
            const data = doctorDoc.exists() ? doctorDoc.data() : {};
            document.getElementById('specialtyInput').value = data.specialty || ''; 
            document.getElementById('phoneInput').value = data.phone || '';
            document.getElementById('genderInput').value = data.gender || '';
            document.getElementById('addressInput').value = data.address || '';
            document.getElementById('cityInput').value = data.city || '';
            document.getElementById('countryInput').value = data.country || '';
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
                    reader.onload = (e) => {
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
                const city = formData.get('city');
                const country = formData.get('country');
                const about = formData.get('about');
                const specialty = formData.get('specialty');
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
                        address,
                        city,
                        country,
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
                    console.error("Error updating profile:", error);
                    alert('Failed to update profile: ' + error.message);
                }
            });
        } else {
            alert("No user is logged in. Please log in to update your profile.");
        }
    });
});
