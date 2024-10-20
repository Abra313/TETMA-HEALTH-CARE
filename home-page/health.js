import { getUser } from "../utils/getUser.js";
import { db, collection, getDocs, query, where, doc } from "../firebaseConfig.js";
import { getDoctors, getSingleDoctor, getStoredDoctors } from "../doctor-details/getDoctors.js";
import loader from "../utils/loader.js";

const loggedInUser = getUser();
const header = document.getElementById('header');
const placeholderImg = 'https://avatar.iran.liara.run/public/boy?username=Ash';

// Uncomment this if you need to display a loader
loader(document.body, "Loading your data");

const doctors = getDoctors();

if (doctors) {
    // Change header background on scroll
    window.addEventListener('scroll', () => {
        header.style.backgroundColor = window.scrollY > 50 ? 'rgba(0, 38, 255, 100)' : 'transparent';
        header.style.color = window.scrollY > 50 ? 'black' : '';
    });

    // Initialize dropdown functionality
    document.addEventListener('DOMContentLoaded', () => {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownList = document.querySelector('.dropdown-list');
        const chevron = document.querySelector('.chevron');

        dropdownToggle.addEventListener('click', () => {
            const isVisible = dropdownList.style.display === 'block';
            dropdownList.style.display = isVisible ? 'none' : 'block';
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
    const location = document.querySelector('.location');

    // Route to all appointments
    docAppointmentProfile.onclick = function() {
        window.location.href = 'appointments.html'; // Redirect to the appointments page
    };

    // Search functionality
    const searchInput = document.getElementById('input-search');

    // Function to get doctors from session storage
    function getDoctorsFromSessionStorage() {
        return JSON.parse(sessionStorage.getItem('doctors')) || [];
    }

    // Event listener for search input
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const allDocs = getStoredDoctors();
        
        // Check if the input is empty
        if (query.length === 0) {
            const existingDoctorElement = document.getElementById('doctor-results');
            if (existingDoctorElement) {
                existingDoctorElement.remove(); // Remove previous results
                document.body.classList.remove('blur'); // Remove blur
            }
            return; // Exit the function
        }

        const filteredDoctors = allDocs.filter((doctor) => {
            const name = doctor.name?.toLowerCase() || ''; 
            const specialty = doctor.specialty?.toLowerCase() || ''; 
            return specialty.includes(query) || name.includes(query);
        });

        const doctorElement = document.createElement('div');
        doctorElement.id = 'doctor-results'; // Set an ID for easy access
        doctorElement.style.position = 'absolute';
        doctorElement.style.display = 'block'; // Show results by default
        doctorElement.innerHTML = ''; // Clear previous results

        // Display filtered results
        if (filteredDoctors.length > 0) {
            filteredDoctors.forEach(doctor => {
                const doctorInfo = `
                <div class="doctor-info" style="background-color: white; color: black; width: 144%; position: relative; z-index: 10; margin-left: 4%; margin-top: 23%; overflow-y: auto;">
                    <div class="doctor-info2">
                        <img class="doctor-img" src="${doctor.profilePicture !== 'https://example.com/profile/default.jpg' ? doctor.profilePicture : '../favourite/assest/doctor 1.jpeg'}" alt="Doctor's Profile" />
                        <div class="doctor-header">
                            <span class="badge" style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px;">Professional Doctor</span>
                            <button id="favorite-btn" style="color: red" data-email="${doctor.email}">&#10084;</button>
                        </div>
                        <h2>${doctor.name}</h2>
                        <p class="specialty">${doctor.specialty}</p>
                        <div class="ratings">
                            <span class="stars">⭐⭐⭐⭐⭐</span>
                            <span class="rating">${doctor.rating}</span>
                            <span class="reviews">${doctor.reviews.length}</span>
                        </div>
                    </div>
                </div>
                `;
                
                doctorElement.innerHTML += doctorInfo; // Append each doctor's info
            });
        } else {
            doctorElement.innerHTML = '<p>No doctors found matching your search.</p>'; // Show no results message
        }

        document.body.prepend(doctorElement); // Add the results to the DOM
        document.body.classList.add('blur'); // Add blur effect
    });

    // Set appointment details
    const doctorDetails = loggedInUser?.appointments?.[0]?.doctorDetails;
    const docImg = doctorDetails?.doctorImg || placeholderImg;
    const appointmentDate = loggedInUser?.appointments?.[0]?.date || 'Monday, 22 May';
    const appointmentTime = loggedInUser?.appointments?.[0]?.time || '10:00 AM';

    docAppointmentProfile.innerHTML = `
        <div id="doctor">
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

    // Fetch unique specialties from Firestore
    async function fetchSpecialties() {
        const specialtiesSet = new Set();
        const doctorData = getStoredDoctors();

        doctorData.forEach(doc => {
            if (doc.specialty) {
                specialtiesSet.add(doc.specialty);
            }
        });

        return Array.from(specialtiesSet);
    }

    // Fetching specialties instantly
    const specialties = await fetchSpecialties();

    // Render specialties in the UI
    async function renderSpecialties() {
        specialties.forEach((specialty) => {
            const specialtyDiv = document.createElement("div");
            specialtyDiv.classList.add("specialty-item");
            
            const img = document.createElement("img");
            img.src = placeholderImg; // Placeholder for specialty icons
            img.className = "placeHolder";
            img.style.height = "50px";
            img.style.width = "50px";

            const text = document.createElement("p");
            text.innerHTML = specialty;
            text.style.fontSize = '13px';
            text.style.color = "#3396d9";
            text.style.textOverflow = 'ellipsis';
            text.style.whiteSpace = 'nowrap';
            text.style.overflow = 'hidden';
            
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
        const allDoctors = getStoredDoctors();
        const filteredDoctors = allDoctors.filter(doctor => doctor.specialty === specialty);
        displayDoctorModal(filteredDoctors);
    }

    // Display modal with doctor details
    function displayDoctorModal(doctors) {
        const modal = document.getElementById("doctorModal");
        const doctorContainer = document.createElement('div');
        doctorContainer.setAttribute('id', 'doctorDetailsContainer');
        document.body.appendChild(doctorContainer);
        const detailsContainer = document.getElementById("doctorDetailsContainer");

        detailsContainer.innerHTML = ''; // Clear previous contents
        
        doctors.forEach(doctor => {
            const doctorInfo = `
                <div class="doctor-info">
                    <div class="doctor-info2">
                        <img class="doctor-img" src="${doctor.profilePicture !== 'https://example.com/profile/default.jpg' ? doctor.profilePicture : '../favourite/assest/doctor 1.jpeg'}" alt="Doctor's Profile" />                    
                        <div class="doctor-header">
                            <span class="badge" style="background-color: #007bff; color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px;">Professional Doctor</span>
                            <button id="favorite-btn" style="color: red">&#10084;</button>
                        </div>
                        <h2>${doctor.name}</h2>
                        <p class="specialty">${doctor.specialty}</p>
                        <div class="ratings">
                            <span class="stars">⭐⭐⭐⭐⭐</span>
                            <span class="rating">${doctor.rating}</span>
                            <span class="reviews">${doctor.reviews.length}</span>
                        </div>
                    </div>
                </div>
            `;
            
            const doctorElement = document.createElement('div');
            doctorElement.innerHTML = doctorInfo;
            detailsContainer.appendChild(doctorElement);
        
            doctorElement.addEventListener('click', () => {
                sessionStorage.setItem("selectedDoctor", doctor.email);
                window.location.href = '../doctor-details/mob2.html';
            });
        });

        modal.style.display = "block";

        const closeBtn = modal.querySelector(".close");
        closeBtn.onclick = () => {
            modal.style.display = "none";
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    document.getElementById("profile-icon").addEventListener('click', () => {
        window.location.href="../PROFILEPAGE/pro.html";
    });

    // Marquee functionality
    const marquee = document.getElementById('marquee');
    let position = 0;
    const speed = 1; // Speed of the movement

    function moveMarquee() {
        position -= speed;
        marquee.style.transform = `translateX(${position}px)`; // Apply the movement

        if (Math.abs(position) >= marquee.offsetWidth / 2) {
            position = 0;
        }

        requestAnimationFrame(moveMarquee); // Continue the animation
    }

    // Start the animation when the page loads
    window.onload = moveMarquee;

    // Footer Icon Setup
    const icons = [
        { src: '../aseeet/images/home.svg', text: '', link: './home.html' },
        { src: '../aseeet/images/consultation.svg', text: '', link: './doctor-appointment.html' },
        { src: '../aseeet/images/appointment.svg', text: '', link: './user-appointments.html' },
        { src: '../aseeet/images/profile.svg', text: '', link: './user-profile.html' }
    ];

    icons.forEach(icon => {
        const footerItem = document.createElement('div');
        footerItem.className = 'footer-icon';

        const img = document.createElement('img');
        img.src = icon.src;
        img.alt = icon.text;

        const link = document.createElement('a');
        link.href = icon.link;
        link.appendChild(img);
        footerItem.appendChild(link);
        document.querySelector('.footer').appendChild(footerItem);
    });

} else {
    console.log("No doctors found.");
    alert("No doctors found.");
}
