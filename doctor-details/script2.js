import { getSingleDoctor, getDoctors } from "./getDoctors.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your Firebase configuration
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
const db = getFirestore(app);

const logginUser = JSON.parse(sessionStorage.getItem('userDetails'));
console.log(logginUser)

const doctorEmail = sessionStorage.getItem("selectedDoctor");
console.log(doctorEmail);
// Sample data for doctor and statistics
const doctorDetails = getSingleDoctor(doctorEmail);
console.log(doctorDetails)

// Sample data for appointment days and times
const appointmentData = [
    {
        day: 'Today',
        date: '4 Oct',
        times: ['7:00 PM', '7:30 PM', '8:00 PM']
    },
    {
        day: 'Mon',
        date: '5 Oct',
        times: ['5:00 PM', '5:30 PM', '6:00 PM']
    },
    {
        day: 'Tue',
        date: '6 Oct',
        times: ['6:30 PM', '7:00 PM', '7:30 PM']
    },
    {
        day: 'Wed',
        date: '7 Oct',
        times: ['8:30 PM', '8:00 PM', '8:30 PM']
    },
];

const patientBooking = {
    patientDetails : {
        name: '',
        location: '',
        email: '',
        about: ''
    },
    doctorDetails : {
        name: '',
        specialty: '',
        location: '',
        rating: '',
        email: ''
    },
    appointment :  {
        date: '',
        time: '',
        amount: '70000'
    },

}


// Create and style elements function
function createElement(tag, className, textContent, styles = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.innerHTML = textContent;
    Object.assign(element.style, styles);
    return element;
}

// Function to display header
function displayHeader() {
    const hbar = createElement('div', 'hbar');
    const leftArrow = createElement('div', 'left-arrow', '<i class="fa-sharp fa-solid fa-arrow-left"></i>');
    
    const text = createElement('div', 'text');
    const docTitle = createElement('p', 'doc', '<strong>Doctor Details</strong>');
    const shareIcon = createElement('i', 'fa-solid fa-share-nodes');
    const heartIcon = createElement('i', 'fa-regular fa-heart', '', { id: 'likeIcon' });

    text.appendChild(docTitle);
    text.appendChild(shareIcon);
    text.appendChild(heartIcon);
    
    hbar.appendChild(leftArrow);
    hbar.appendChild(text);
    
    document.body.appendChild(hbar);
}

// Function to display doctor details using fetched data
function displayDoctorDetails(doctorData) {
    const container = createElement('div', 'imtext');
    const img = createElement('img', '', '', {
        borderRadius: '70px',
        height: '120px',
        width: '120px'
    });
    img.src = doctorData.imageUrl || 'channel-1.jpeg'; // Use a default image if none provided
    
    const htext = createElement('div', 'htext');
    htext.appendChild(createElement('h1', '', doctorData.name));
    const detailsHTML = `<strong class="pcolor"><p class="den">${doctorData.specialty}</p>
        <p><i class="fa-sharp fa-solid fa-location-dot" style="color: blue;"></i> ${doctorData.location}</p></strong>`;
    htext.innerHTML += detailsHTML;

    container.appendChild(img);
    container.appendChild(htext);
    document.body.appendChild(container);
}

function displayHorizontalLine() {
    const hr = createElement('hr', '', '', {});
    document.body.appendChild(hr);
}

// Function to display statistics
function displayStatistics(doctorData) {
    const sec3 = createElement('div', 'sec3');
    const stats = [
        { icon: 'fa-users', value: doctorData.patients.length || "N/A", label: 'Patients' },
        { icon: 'fa-briefcase', value: doctorData.yearsOfExperience            || "N/A", label: 'Years Exp' },
        { icon: 'fa-star', value: doctorData.rating || "N/A", label: 'Rating' },
        { icon: 'fa-comment-dots', value: doctorData.reviews || "N/A", label: 'Reviews' }
    ];

    stats.forEach(stat => {
        const section = createElement('div', 'section3');
        section.appendChild(createElement('i', `fa-solid ${stat.icon}`));
        section.appendChild(createElement('h1', '', stat.value));
        section.appendChild(createElement('p', '', stat.label));
        sec3.appendChild(section);
    });

    document.body.appendChild(sec3);
}



// Create the booking form
const bookingForm = document.createElement('div');
bookingForm.innerHTML = `
<div class="container">
    <h2 class="appointment">Schedule an Appointment</h2>
    <form id="appointmentForm">
        <div class="form-group">
            <label for="appointmentDate" class="label">Appointment Date</label>
            <input type="date" id="appointmentDate" name="appointmentDate" class="input-date" required>
        </div>

        <div class="form-group">
            <label for="appointmentTime" class="label">Appointment Time</label>
            <input type="time" id="appointmentTime" name="appointmentTime" class="input-time" required>
        </div>

        <button type="submit" class="app-bnt">Schedule Appointment</button>
    </form>
    <p class="note">We will contact you to confirm your appointment.</p>
</div>
`;

// Insert the booking form into the body
const body = document.querySelector('body');
body.insertAdjacentElement("afterend", bookingForm);

// Update the bookingForm submit event listener
document.getElementById('appointmentForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const inputDate = document.getElementById('appointmentDate').value;
    const inputTime = document.getElementById('appointmentTime').value;

    // Populate the patientBooking object with doctor details and input values
    patientBooking.doctorDetails = {
        name: doctorDetails.name,
        specialty: doctorDetails.specialty,
        location: doctorDetails.location,
        rating: doctorDetails.rating,
        email: doctorDetails.email
    };
    patientBooking.appointment = {
        date: inputDate,
        time: inputTime,
        amount : 70000
    };

    patientBooking.patientDetails = {
        name: logginUser.name,
        location: logginUser.location,
        email: logginUser.email,
        about: logginUser.about
    },
    console.log(doctorDetails.email);
    console.log('Patient Booking Details:', patientBooking);

    sessionStorage.setItem('patientBooking', JSON.stringify(patientBooking));
    window.location.href = '../booking-form/form.html'
    // Additional code to handle the booking (e.g., sending to a server) can be added here.
});

// Function to display appointments
// function displayAppointments() {
//     const appointmentSection = createElement('div', 'appointment-section');
//     appointmentSection.innerHTML = '<h2>Available Appointments</h2>';
    
//     appointmentData.forEach(appointment => {
//         const daySection = createElement('div', 'day-section');
//         const dayTitle = createElement('h3', '', `${appointment.day} (${appointment.date})`);
        
//         const timeList = createElement('ul', 'time-list');
//         appointment.times.forEach(time => {
//             const timeItem = createElement('li', '', time);
//             timeList.appendChild(timeItem);
//         });
        
//         daySection.appendChild(dayTitle);
//         daySection.appendChild(timeList);
//         appointmentSection.appendChild(daySection);
//     });

//     document.body.appendChild(appointmentSection);
// }

// Function to find doctor details
export async function findDoctor(uid) {
    try {
        console.log(`Fetching details for doctor with UID: ${uid}`);
        const doctorRef = doc(db, 'DOCTOR', uid);
        const doctorDoc = await getDoc(doctorRef);

        if (!doctorDoc.exists()) {
            console.log('No doctor found with that UID.');
            return null;
        }

        const doctorData = {
            id: doctorDoc.id,
            ...doctorDoc.data()
        };

        console.log('Doctor data:', doctorData);
        return doctorData;
    } catch (error) {
        console.error('Error retrieving doctor:', error);
        throw error;
    }
}

// Function to initialize the UI
async function initUI(email) {
    const doctorData = await getSingleDoctor(email);
    
    if (doctorData) {
        displayHeader();
        displayDoctorDetails(doctorData);
        displayHorizontalLine();
        displayStatistics(doctorData);
        displayAppointments();
    } else {
        console.error('No doctor data to display.');
    }
}

// Call the initUI function with the specific UID

initUI(doctorEmail);
