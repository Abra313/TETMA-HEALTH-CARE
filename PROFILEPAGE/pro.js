import { auth, db, storage, doc, updateDoc, getDoc, ref, uploadBytes, getDownloadURL, onAuthStateChanged, collection, query, where, getDocs, setDoc } from "../firebaseConfig.js";

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userEmail = JSON.parse(sessionStorage.getItem('userDetails')).email;
            console.log(userEmail)
            let userData;
            const doctorRef = collection(db, 'DOCTOR');
            const patientRef = collection(db, 'PATIENT');

            // Query PATIENT collection
            const patientQuery = query(patientRef, where("email", "==", userEmail));
            const patientSnapshot = await getDocs(patientQuery);

            if (!patientSnapshot.empty) {
                // User found in PATIENT collection
                userData = {
                    ...patientSnapshot.docs[0].data(),
                    collection: 'PATIENT',
                    id: patientSnapshot.docs[0].id
                };
            } else {
                // Query DOCTOR collection
                const doctorQuery = query(doctorRef, where("email", "==", userEmail));
                const doctorSnapshot = await getDocs(doctorQuery);

                if (!doctorSnapshot.empty) {
                    // User found in DOCTOR collection
                    userData = {
                        ...doctorSnapshot.docs[0].data(),
                        collection: 'DOCTOR',
                        id: doctorSnapshot.docs[0].id
                    };
                }
            }

            // Populate fields with existing data
            if (userData) {
                document.getElementById('phoneInput').value = userData.phone || '';
                document.getElementById('genderInput').value = userData.gender || '';
                document.getElementById('addressInput').value = userData.address || '';
                document.getElementById('cityInput').value = userData.city || '';
                document.getElementById('countryInput').value = userData.country || '';
                document.getElementById('aboutInput').value = userData.about || '';

                // Specialty handling
                const specialtyInput = document.getElementById('specialtyInput');
                if (userData.specialty) {
                    specialtyInput.value = userData.specialty; // Set existing specialty
                } else {
                    specialtyInput.value = ""; // Clear if no specialty exists
                }

                // Image preview
                const imageInput = document.getElementById('imageInput');
                const preview = document.createElement('img');
                preview.id = 'imagePreview';
                document.getElementById('uploadimg').appendChild(preview);
                if (userData.image) {
                    preview.src = userData.image;
                    preview.style.display = 'block';
                }

                // Image upload handling
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

                // Form submission handling
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
                    const specialty = userData.collection === 'DOCTOR' ? formData.get('specialty') : null;
                    const file = imageInput.files[0];

                    try {
                        const profileData = {
                            phone,
                            gender,
                            address,
                            city,
                            country,
                            about,
                            ...(specialty && { specialty }) // Only include specialty if present
                        };

                        let imageUrl;
                        if (file) {
                            const storageRef = ref(storage, `profileImages/${user.uid}/${file.name}`);
                            await uploadBytes(storageRef, file);
                            imageUrl = await getDownloadURL(storageRef);
                        }

                        if (imageUrl) {
                            profileData.image = imageUrl;
                        }

                        // Update or create user document
                        const userRef = doc(db, userData.collection, userData.id);
                        await updateDoc(userRef, profileData);
                        
                        alert('Profile updated successfully!');
                    } catch (error) {
                        console.error("Error updating profile:", error);
                        alert('Failed to update profile: ' + error.message);
                    }
                });
            } else {
                alert("No user found in PATIENT or DOCTOR collections.");
            }
        } else {
            alert("No user is logged in. Please log in to update your profile.");
        }
    });
});
