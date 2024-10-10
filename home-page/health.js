import { getUser } from "../utils/getUser.js";
import { db, collection, getDocs, query, where } from "../firebaseConfig.js";

const loggedInUser = getUser();
const header = document.getElementById('header');

// Change header background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 38, 255, 100)';
        header.style.color = 'white';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

// Initialize dropdown functionality
document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownList = document.querySelector('.dropdown-list');
    const chevron = document.querySelector('.chevron');

    dropdownToggle.addEventListener('click', () => {
        dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
        chevron.classList.toggle('rotate');
    });

    dropdownList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            dropdownToggle.firstChild.textContent = event.target.textContent;
            dropdownList.style.display = 'none';
            chevron.classList.remove('rotate');
        }
    });

    renderSpecialties();
});

// DOM Elements
const specialtyContainer = document.getElementById("DS-icon");
const upcomingSchedule = document.querySelector('.upcoming-schedule');
const docAppointmentProfile = document.getElementById('twodivs');
const locationElement = document.querySelector('.location');

// Check if the logged-in user exists
if (loggedInUser) {
    const doctorDetails = loggedInUser.appointments?.[0]?.doctorDetails;
    const docImg = doctorDetails?.doctorImg || 'https://avatar.iran.liara.run/public/boy?username=Ash';
    const appointmentDate = loggedInUser.appointments?.[0]?.date || 'Monday, 22 May';
    const appointmentTime = loggedInUser.appointments?.[0]?.time || '10:00 AM';
    
    // Check if address exists before setting it
    locationElement.textContent = loggedInUser.address || 'Address not available';
    
    docAppointmentProfile.innerHTML = `
        <div id="dctrprofile">
            <img src="${docImg}" alt="">
            <div id="dctrtext">
                <p style="font-weight: 500;">${doctorDetails?.name || 'Dr. Nosheen Khan'}</p>
                <p style="font-weight: 300;">${doctorDetails?.specialty || 'Dentist Consultation'}</p>
            </div>
        </div>
        <div id="dctrcnct">
            <img src="../aseeet/images/telephone.png" alt="">
        </div>
        <div id="datetime">
            <div id="date">
                <img src="../aseeet/images/calendar.png" height="20px" width="20px" alt="calendar-icon">
                <p id="date-time">${appointmentDate}</p>
            </div>
            <div id="timeIcon">
                <img src="../aseeet/images/carbon--time.svg" alt="" height="20px" width="20px" alt="">
                <p id="time">${appointmentTime}</p>
            </div>
        </div>
    `;
    
    const appointmentCount = document.createElement('p');
    appointmentCount.innerText = loggedInUser.appointments.length;
    upcomingSchedule.appendChild(appointmentCount);
} else {
    // Handle the case where no user is logged in
    locationElement.textContent = 'Please log in to see your appointments.';
    docAppointmentProfile.innerHTML = '<p>No appointment details available.</p>';
}

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

    specialties.forEach((specialty) => {
        const specialtyDiv = document.createElement("div");
        specialtyDiv.classList.add("specialty-item");
        
        const img = document.createElement("img");
        img.src = "../aseeet/images/placeholder-icon.png"; // Placeholder for specialty icons
        const text = document.createElement("p");
        text.innerHTML = specialty;
        
        specialtyDiv.appendChild(img);
        specialtyDiv.appendChild(text);
        specialtyContainer.appendChild(specialtyDiv);
        
        specialtyDiv.addEventListener('click', () => {
            fetchDoctorsBySpecialty(specialty);
        });
    });
}

// Fetch doctors by selected specialty
async function fetchDoctorsBySpecialty(specialty) {
    const doctorCollection = collection(db, 'DOCTOR');
    const q = query(doctorCollection, where("specialty", "==", specialty));
    const doctorSnapshot = await getDocs(q);
    
    const doctors = doctorSnapshot.docs.map(doc => doc.data());
    displayDoctorModal(doctors);
}

// Display modal with doctor details
function displayDoctorModal(doctors) {
    const modal = document.getElementById("doctorModal");
    const detailsContainer = document.getElementById("doctorDetailsContainer");
    
    detailsContainer.innerHTML = ''; // Clear previous contents
    
    doctors.forEach(doctor => {
        const doctorInfo = `
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p><strong>Specialty:</strong> ${doctor.specialty}</p>
                <p><strong>Address:</strong> ${doctor.address}</p>
                <p><strong>Email:</strong> ${doctor.email}</p>
                <p><strong>Phone:</strong> ${doctor.contact || "Not Available"}</p>
                <p><strong>Years of Experience:</strong> ${doctor.yearsOfExperience}</p>
                <p><strong>About:</strong> ${doctor.about}</p>
                <p><strong>Working Hours:</strong> ${doctor.workingHours.join(", ")}</p>
                <p><strong>Rating:</strong> ${doctor.rating}</p>
            </div>
        `;
        detailsContainer.innerHTML += doctorInfo;
    });

    modal.style.display = "block";

    const closeBtn = modal.querySelector(".close");
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

// Start the marquee animation
const marquee = document.getElementById('marquee');
let position = 0;
const speed = 1;

function moveMarquee() {
    position -= speed;
    marquee.style.transform = `translateX(${position}px)`;

    if (Math.abs(position) >= marquee.offsetWidth / 2) {
        position = 0;
    }

    requestAnimationFrame(moveMarquee);
}

moveMarquee();

// Footer Icon Setup
const icons = [
    { src: '../aseeet/images/home.svg', text: 'Home', link: 'https://example.com/home' },
    { src: '../aseeet/images/carbon--location-filled.png', text: 'About', link: 'https://example.com/about' },
    { src: '../aseeet/images/mingcute-calendar-fill.svg', text: 'Services', link: 'https://example.com/services' },
    { src: '../aseeet/images/chat.svg', text: 'Contact', link: 'https://example.com/contact' },
    { src: '../aseeet/images/profile-footer.svg', text: 'Help', link: '/PROFILEPAGE/pro.html' }
];

const footer = document.getElementById('footer');
const footerContainer = document.createElement('div');
footerContainer.className = 'footer-container';

icons.forEach(icon => {
    const iconDiv = document.createElement('div');
    iconDiv.className = 'icon-container';

    const iconLink = document.createElement('a');
    iconLink.href = icon.link;

    const iconImage = document.createElement('img');
    iconImage.src = icon.src;
    iconImage.alt = icon.text;

    iconLink.appendChild(iconImage);
    
    const textLink = document.createElement('a');
    textLink.href = icon.link;
    textLink.textContent = icon.text;

    iconDiv.appendChild(iconLink);
    iconDiv.appendChild(textLink);
    footerContainer.appendChild(iconDiv);
});

footer.appendChild(footerContainer);
