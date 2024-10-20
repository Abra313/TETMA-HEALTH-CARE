import { auth, db, storage, doc, updateDoc, getDoc, ref, uploadBytes, getDownloadURL, onAuthStateChanged, query, where, getDocs } from "../firebaseConfig.js";

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userEmail = user.email; // Get the logged-in user's email
            const userRef = doc(db, 'USERS', user.uid); // Reference to the user's document
            const userDoc = await getDoc(userRef);
            const data = userDoc.exists() ? userDoc.data() : {};
            let userRole;

            // Check if user is in the PATIENT collection
            const patientQuery = query(collection(db, "PATIENT"), where("email", "==", userEmail));
            const patientSnapshot = await getDocs(patientQuery);

            // Check if user is in the DOCTOR collection
            const doctorQuery = query(collection(db, "DOCTOR"), where("email", "==", userEmail));
            const doctorSnapshot = await getDocs(doctorQuery);

            if (!patientSnapshot.empty) {
                // User is a patient
                userRole = 'PATIENT';
                const patientData = patientSnapshot.docs[0].data();
                Object.assign(data, patientData); // Merge patient data into existing data
            } else if (!doctorSnapshot.empty) {
                // User is a doctor
                userRole = 'DOCTOR';
                const doctorData = doctorSnapshot.docs[0].data();
                Object.assign(data, doctorData); // Merge doctor data into existing data
            }

            // Update session storage with the user role
            sessionStorage.setItem('userRole', userRole);

            // Populate fields based on user role
            if (userRole === 'DOCTOR') {
                document.getElementById('specialtyInput').style.display = 'block';
                document.getElementById('specialtyInput').value = data.specialty || '';
            } else if (userRole === 'PATIENT') {
                document.getElementById('medicalHistoryWrapper').style.display = 'block';
                document.getElementById('medicalHistoryInput').value = data.medicalHistory || '';
            }

            // Populate common fields
            document.getElementById('phoneInput').value = data.phone || '';
            document.getElementById('genderInput').value = data.gender || '';
            document.getElementById('addressInput').value = data.address || '';
            document.getElementById('cityInput').value = data.city || '';
            document.getElementById('countryInput').value = data.country || '';
            document.getElementById('aboutInput').value = data.about || '';

            const imageInput = document.getElementById('imageInput');
            const preview = document.getElementById('preview');

            if (data.image) {
                preview.src = data.image;
                preview.style.display = 'block';
            }

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
                const specialty = userRole === 'DOCTOR' ? formData.get('specialty') : null;
                const medicalHistory = userRole === 'PATIENT' ? formData.get('medicalHistory') : null;
                const file = imageInput.files[0];

                try {
                    const profileData = {
                        phone,
                        gender,
                        address,
                        city,
                        country,
                        about,
                        ...(userRole === 'DOCTOR' && { specialty }),
                        ...(userRole === 'PATIENT' && { medicalHistory }),
                    };

                    console.log('Profile Data:', profileData);
                    sessionStorage.setItem('profileData', JSON.stringify(profileData));

                    let imageUrl;
                    if (file) {
                        const storageRef = ref(storage, `profileImages/${user.uid}/${file.name}`);
                        await uploadBytes(storageRef, file);
                        imageUrl = await getDownloadURL(storageRef);
                    }

                    if (imageUrl) {
                        profileData.image = imageUrl;
                    }

                    await updateDoc(userRef, profileData);
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
