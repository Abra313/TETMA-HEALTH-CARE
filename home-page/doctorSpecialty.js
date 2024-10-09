
// Import Firestore methods (ensure your config is set up correctly)
import { db, collection, getDocs } from "./firebaseConfig.js"; 

// Fetch unique specialties from Firestore
async function fetchSpecialties() {
    const doctorCollection = collection(db, 'DOCTOR');
    const doctorSnapshot = await getDocs(doctorCollection);
    const specialtiesSet = new Set();

    doctorSnapshot.forEach(doc => {
        const doctorData = doc.data();
        if (doctorData.specialty) {
            specialtiesSet.add(doctorData.specialty);
        }
    });

    return Array.from(specialtiesSet);
}

// Render specialties in the UI
async function renderSpecialties() {
    const specialties = await fetchSpecialties();
    const specialtyContainer = document.getElementById("specialty-container");

    specialties.forEach((specialty) => {
        const specialtyDiv = document.createElement("div");
        specialtyDiv.classList.add("specialty-item");

        const img = document.createElement("img");
        img.src = "https://via.placeholder.com/50"; // Placeholder for specialty icons
        const text = document.createElement("p");
        text.innerHTML = specialty;

        specialtyDiv.appendChild(img);
        specialtyDiv.appendChild(text);
        specialtyContainer.appendChild(specialtyDiv);
    });
}

// Initialize rendering when the page loads
document.addEventListener('DOMContentLoaded', renderSpecialties);

