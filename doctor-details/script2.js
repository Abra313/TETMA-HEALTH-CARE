import { collection, db, addDoc } from "../firebaseConfig.js";
import { getSingleDoctor, getDoctors } from "./getDoctors.js";


// const doctors = [
//     {
//         name: "Dr. Johnny Wilson",
//         specialty: "Dentist",
//         location: "New York, United States",
//         experience: "10+",
//         rating: "4.9+",
//         reviews: "4,789",
//         about: "Experienced and dedicated dental professional.",
//         yearsOfExperience: "12",
//         workingHours: ["Mon-Fri: 9am - 5pm"],
//         address: "123 Main St, New York, NY",
//         messages: [],
//         password: "D3ntal$2024",
//         email: "johnny.wilson@example.com",
//         patients: [
//             { name: "Alice Johnson", age: 30, condition: "Cavity" },
//             { name: "Bob Smith", age: 45, condition: "Root Canal" },
//             { name: "Carol White", age: 28, condition: "Teeth Whitening" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-johnny-wilson.jpg",
//         appointments: [
//             { date: "2024-10-10", time: "10:00 AM", patient: "Alice Johnson", status: "Confirmed" },
//             { date: "2024-10-11", time: "2:00 PM", patient: "Bob Smith", status: "Pending" },
//             { date: "2024-10-12", time: "11:30 AM", patient: "Carol White", status: "Cancelled" },
//         ]
//     },
//     {
//         name: "Dr. Emma Smith",
//         specialty: "Pediatrician",
//         location: "New York, United States",
//         experience: "8+",
//         rating: "4.8+",
//         reviews: "2,345",
//         about: "Caring pediatrician focused on children's health.",
//         yearsOfExperience: "8",
//         workingHours: ["Mon-Fri: 10am - 6pm"],
//         address: "456 Elm St, New York, NY",
//         messages: [],
//         password: "P3di@tric2024",
//         email: "emma.smith@example.com",
//         patients: [
//             { name: "Liam Anderson", age: 6, condition: "Flu" },
//             { name: "Sophia Brown", age: 4, condition: "Checkup" },
//             { name: "Mason Lee", age: 10, condition: "Allergies" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-emma-smith.jpg",
//         appointments: [
//             { date: "2024-10-15", time: "1:00 PM", patient: "Liam Anderson", status: "Confirmed" },
//             { date: "2024-10-16", time: "3:00 PM", patient: "Sophia Brown", status: "Pending" },
//             { date: "2024-10-17", time: "11:00 AM", patient: "Mason Lee", status: "Confirmed" },
//         ]
//     },
//     {
//         name: "Dr. Olivia Brown",
//         specialty: "Cardiologist",
//         location: "New York, United States",
//         experience: "15+",
//         rating: "4.7+",
//         reviews: "1,500",
//         about: "Expert in cardiovascular health.",
//         yearsOfExperience: "15",
//         workingHours: ["Mon-Fri: 8am - 4pm"],
//         address: "789 Maple Ave, New York, NY",
//         messages: [],
//         password: "C@rdio2024!",
//         email: "olivia.brown@example.com",
//         patients: [
//             { name: "David Green", age: 60, condition: "Heart Disease" },
//             { name: "Eva Harris", age: 55, condition: "Hypertension" },
//             { name: "Jacob Wilson", age: 70, condition: "Arrhythmia" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-olivia-brown.jpg",
//         appointments: [
//             { date: "2024-10-20", time: "9:30 AM", patient: "David Green", status: "Confirmed" },
//             { date: "2024-10-21", time: "1:30 PM", patient: "Eva Harris", status: "Pending" },
//             { date: "2024-10-22", time: "2:30 PM", patient: "Jacob Wilson", status: "Cancelled" },
//         ]
//     },
//     {
//         name: "Dr. Liam Johnson",
//         specialty: "Dermatologist",
//         location: "New York, United States",
//         experience: "9+",
//         rating: "4.6+",
//         reviews: "1,200",
//         about: "Specializes in skin conditions and treatments.",
//         yearsOfExperience: "9",
//         workingHours: ["Mon-Fri: 9am - 5pm"],
//         address: "101 Pine St, New York, NY",
//         messages: [],
//         password: "D3rm@2024!",
//         email: "liam.johnson@example.com",
//         patients: [
//             { name: "Grace Lee", age: 34, condition: "Acne" },
//             { name: "Oliver Martin", age: 22, condition: "Eczema" },
//             { name: "Chloe Clark", age: 29, condition: "Psoriasis" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-liam-johnson.jpg",
//         appointments: [
//             { date: "2024-10-25", time: "10:30 AM", patient: "Grace Lee", status: "Confirmed" },
//             { date: "2024-10-26", time: "12:00 PM", patient: "Oliver Martin", status: "Pending" },
//             { date: "2024-10-27", time: "3:00 PM", patient: "Chloe Clark", status: "Confirmed" },
//         ]
//     },
//     {
//         name: "Dr. Noah Davis",
//         specialty: "Neurologist",
//         location: "New York, United States",
//         experience: "12+",
//         rating: "4.9+",
//         reviews: "3,000",
//         about: "Focused on neurological disorders and treatments.",
//         yearsOfExperience: "12",
//         workingHours: ["Mon-Fri: 9am - 5pm"],
//         address: "202 Birch Rd, New York, NY",
//         messages: [],
//         password: "Neuro$2024",
//         email: "noah.davis@example.com",
//         patients: [
//             { name: "Emma Scott", age: 40, condition: "Migraine" },
//             { name: "Aiden Taylor", age: 35, condition: "Parkinson's" },
//             { name: "Ella Davis", age: 50, condition: "Multiple Sclerosis" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-noah-davis.jpg",
//         appointments: [
//             { date: "2024-10-30", time: "9:00 AM", patient: "Emma Scott", status: "Confirmed" },
//             { date: "2024-10-31", time: "1:00 PM", patient: "Aiden Taylor", status: "Pending" },
//             { date: "2024-11-01", time: "3:00 PM", patient: "Ella Davis", status: "Cancelled" },
//         ]
//     },
//     {
//         name: "Dr. Ava Garcia",
//         specialty: "Orthopedic Surgeon",
//         location: "New York, United States",
//         experience: "11+",
//         rating: "4.8+",
//         reviews: "2,800",
//         about: "Specializes in bone and joint health.",
//         yearsOfExperience: "11",
//         workingHours: ["Mon-Fri: 8am - 4pm"],
//         address: "303 Cedar Blvd, New York, NY",
//         messages: [],
//         password: "Ortho2024#",
//         email: "ava.garcia@example.com",
//         patients: [
//             { name: "James King", age: 65, condition: "Hip Replacement" },
//             { name: "Mia Garcia", age: 50, condition: "Knee Pain" },
//             { name: "Lucas Martinez", age: 42, condition: "Fracture" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-ava-garcia.jpg",
//         appointments: [
//             { date: "2024-11-05", time: "9:30 AM", patient: "James King", status: "Confirmed" },
//             { date: "2024-11-06", time: "11:00 AM", patient: "Mia Garcia", status: "Pending" },
//             { date: "2024-11-07", time: "2:00 PM", patient: "Lucas Martinez", status: "Confirmed" },
//         ]
//     },
//     {
//         name: "Dr. Sophia Martinez",
//         specialty: "General Practitioner",
//         location: "New York, United States",
//         experience: "7+",
//         rating: "4.5+",
//         reviews: "2,100",
//         about: "Provides comprehensive health care.",
//         yearsOfExperience: "7",
//         workingHours: ["Mon-Fri: 9am - 5pm"],
//         address: "404 Oak St, New York, NY",
//         messages: [],
//         password: "GenPrac@2024",
//         email: "sophia.martinez@example.com",
//         patients: [
//             { name: "Michael Johnson", age: 30, condition: "Fever" },
//             { name: "Emily Smith", age: 27, condition: "Checkup" },
//             { name: "Benjamin Brown", age: 38, condition: "Headache" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-sophia-martinez.jpg",
//         appointments: [
//             { date: "2024-11-10", time: "10:00 AM", patient: "Michael Johnson", status: "Confirmed" },
//             { date: "2024-11-11", time: "1:30 PM", patient: "Emily Smith", status: "Pending" },
//             { date: "2024-11-12", time: "3:00 PM", patient: "Benjamin Brown", status: "Confirmed" },
//         ]
//     },
//     {
//         name: "Dr. Jackson Lee",
//         specialty: "Psychiatrist",
//         location: "New York, United States",
//         experience: "6+",
//         rating: "4.4+",
//         reviews: "1,000",
//         about: "Focused on mental health and well-being.",
//         yearsOfExperience: "6",
//         workingHours: ["Mon-Fri: 9am - 5pm"],
//         address: "505 Spruce St, New York, NY",
//         messages: [],
//         password: "MindCare2024!",
//         email: "jackson.lee@example.com",
//         patients: [
//             { name: "Sophie White", age: 28, condition: "Anxiety" },
//             { name: "Liam Black", age: 33, condition: "Depression" },
//             { name: "Isabella Gray", age: 22, condition: "Stress" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-jackson-lee.jpg",
//         appointments: [
//             { date: "2024-11-15", time: "10:00 AM", patient: "Sophie White", status: "Confirmed" },
//             { date: "2024-11-16", time: "2:00 PM", patient: "Liam Black", status: "Pending" },
//             { date: "2024-11-17", time: "11:00 AM", patient: "Isabella Gray", status: "Confirmed" },
//         ]
//     },
//     {
//         name: "Dr. Mia Anderson",
//         specialty: "Endocrinologist",
//         location: "New York, United States",
//         experience: "8+",
//         rating: "4.3+",
//         reviews: "800",
//         about: "Specializes in hormonal and metabolic disorders.",
//         yearsOfExperience: "8",
//         workingHours: ["Mon-Fri: 10am - 6pm"],
//         address: "606 Willow Rd, New York, NY",
//         messages: [],
//         password: "Endo@2024",
//         email: "mia.anderson@example.com",
//         patients: [
//             { name: "Daniel Young", age: 50, condition: "Diabetes" },
//             { name: "Emma Wilson", age: 45, condition: "Thyroid Issues" },
//             { name: "Oliver Smith", age: 36, condition: "Obesity" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-mia-anderson.jpg",
//         appointments: [
//             { date: "2024-11-20", time: "10:30 AM", patient: "Daniel Young", status: "Confirmed" },
//             { date: "2024-11-21", time: "1:30 PM", patient: "Emma Wilson", status: "Pending" },
//             { date: "2024-11-22", time: "3:00 PM", patient: "Oliver Smith", status: "Confirmed" },
//         ]
//     },
//     {
//         name: "Dr. Lucas Thompson",
//         specialty: "Ophthalmologist",
//         location: "New York, United States",
//         experience: "10+",
//         rating: "4.7+",
//         reviews: "1,200",
//         about: "Expert in eye health and vision care.",
//         yearsOfExperience: "10",
//         workingHours: ["Mon-Fri: 9am - 5pm"],
//         address: "707 Walnut St, New York, NY",
//         messages: [],
//         password: "Vision2024*",
//         email: "lucas.thompson@example.com",
//         patients: [
//             { name: "Charlotte Lee", age: 34, condition: "Cataracts" },
//             { name: "Amelia Brown", age: 29, condition: "Glaucoma" },
//             { name: "Henry Green", age: 60, condition: "Macular Degeneration" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-lucas-thompson.jpg",
//         appointments: [
//             { date: "2024-11-25", time: "9:00 AM", patient: "Charlotte Lee", status: "Confirmed" },
//             { date: "2024-11-26", time: "1:00 PM", patient: "Amelia Brown", status: "Pending" },
//             { date: "2024-11-27", time: "3:00 PM", patient: "Henry Green", status: "Confirmed" },
//         ]
//     },
//     {
//         name: "Dr. Amelia Taylor",
//         specialty: "Cardiologist",
//         location: "New York, United States",
//         experience: "14+",
//         rating: "4.8+",
//         reviews: "1,900",
//         about: "Dedicated to heart health and prevention.",
//         yearsOfExperience: "14",
//         workingHours: ["Mon-Fri: 8am - 4pm"],
//         address: "808 Ash St, New York, NY",
//         messages: [],
//         password: "Cardio*2024",
//         email: "amelia.taylor@example.com",
//         patients: [
//             { name: "Ella Martin", age: 65, condition: "Heart Failure" },
//             { name: "Liam Walker", age: 55, condition: "Coronary Artery Disease" },
//             { name: "Sophia Hall", age: 70, condition: "Arrhythmia" },
//         ],
//         profilePicture: "https://example.com/profiles/dr-amelia-taylor.jpg",
//         appointments: [
//             { date: "2024-12-01", time: "9:00 AM", patient: "Ella Martin", status: "Confirmed" },
//             { date: "2024-12-02", time: "2:00 PM", patient: "Liam Walker", status: "Pending" },
//             { date: "2024-12-03", time: "11:00 AM", patient: "Sophia Hall", status: "Confirmed" },
//         ]
//     },
//     // Add more doctors here as needed
// ];




// async function pushDoctorsToFirestore() {
//     for (const doctor of doctors) {
//         try {
//             // Add a new document with a generated ID in the DOCTOR collection
//             await addDoc(collection(db, "DOCTOR"), doctor);
//             console.log(`Doctor added: ${doctor.name}`);
//         } catch (error) {
//             console.error("Error adding doctor: ", error);
//         }
//     }
// }

// // Call the function to push doctors
// pushDoctorsToFirestore();






// // Sample data for doctor and statistics
// const doctorDetails = {
//     name: "Dr. Johnny Wilson",
//     specialty: "Dentist",
//     location: "New York, United States",
//     patients: "7,500+",
//     experience: "10+",
//     rating: "4.9+",
//     reviews: "4,789",
// };

// // Sample data for appointment days and times
// const appointmentData = [
//     {
//         day: 'Today',
//         date: '4 Oct',
//         times: ['7:00 PM', '7:30 PM', '8:00 PM']
//     },
//     {
//         day: 'Mon',
//         date: '5 Oct',
//         times: ['5:00 PM', '5:30 PM', '6:00 PM']
//     },
//     {
//         day: 'Tue',
//         date: '6 Oct',
//         times: ['6:30 PM', '7:00 PM', '7:30 PM']
//     },
//     {
//         day: 'wed',
//         date: '7 Oct',
//         times: ['8:30 PM', '8:00 PM', '8:30 PM']
//     },
    
// ]; 

// // Create and style elements function
// function createElement(tag, className, textContent, styles = {}) {
//     const element = document.createElement(tag);
//     if (className) element.className = className;
//     if (textContent) element.innerHTML = textContent;
//     Object.assign(element.style, styles);
//     return element;
// }

// // Function to display header with doctor details
// function displayHeader() {
//     const hbar = createElement('div', 'hbar');
//     const leftArrow = createElement('div', 'left-arrow', '<i class="fa-sharp fa-solid fa-arrow-left"></i>');
    
//     const text = createElement('div', 'text');
//     const docTitle = createElement('p', 'doc', '<strong>Doctor Details</strong>');
//     const shareIcon = createElement('i', 'fa-solid fa-share-nodes');
//     const heartIcon = createElement('i', 'fa-regular fa-heart', '', { id: 'likeIcon' });

//     text.appendChild(docTitle);
//     text.appendChild(shareIcon);
//     text.appendChild(heartIcon);
    
//     hbar.appendChild(leftArrow);
//     hbar.appendChild(text);
    
//     document.body.appendChild(hbar);
// }

// // Function to display doctor details
// function displayDoctorDetails() {
//     const container = createElement('div', 'imtext');
//     const img = createElement('img', '', '', {
//         borderRadius: '70px',
//         height: '120px',
//         width: '120px'
//     });
//     img.src = 'channel-1.jpeg';
    
//     const htext = createElement('div', 'htext');
//     htext.appendChild(createElement('h1', '', doctorDetails.name));
//     const detailsHTML = `<strong class="pcolor"><p class="den">${doctorDetails.specialty}</p>
//         <p><i class="fa-sharp fa-solid fa-location-dot" style="color: blue;"></i> ${doctorDetails.location}</p></strong>`;
//     htext.innerHTML += detailsHTML;

//     container.appendChild(img);
//     container.appendChild(htext);
//     document.body.appendChild(container);
// }

// function displayHorizontalLine() {
//     const hr = createElement('hr', '', '', {
//         // margin: '20px 0'
//     });
//     document.body.appendChild(hr);
// }

// // Function to display statistics
// function displayStatistics() {
//     const sec3 = createElement('div', 'sec3');
//     const stats = [
//         { icon: 'fa-users', value: doctorDetails.patients, label: 'Patients' },
//         { icon: 'fa-briefcase', value: doctorDetails.experience, label: 'Years Exp' },
//         { icon: 'fa-star', value: doctorDetails.rating, label: 'Rating' },
//         { icon: 'fa-comment-dots', value: doctorDetails.reviews, label: 'Reviews' }
//     ];

//     stats.forEach(stat => {
//         const section = createElement('div', 'section3');
//         section.appendChild(createElement('i', `fa-solid ${stat.icon}`));
//         section.appendChild(createElement('h1', '', stat.value));
//         section.appendChild(createElement('p', '', stat.label));
//         sec3.appendChild(section);
//     });

//     document.body.appendChild(sec3);
// }

// // Function to display appointment booking
// function displayAppointments() {
//     const appHeader = createElement('h3', 'app', 'Book Appointment');
//     document.body.appendChild(appHeader);

//     const allDate = createElement('div', 'allDate');
//     allDate.appendChild(createElement('p', '', 'Day'));

//     const bntdate = createElement('div', 'bntdate');
//     appointmentData.forEach(appointment => {
//         const dateButton = createElement('button', 'datemonth', '', {
//             border: '1px solid grey',
//             borderRadius: '45px',
//             width: '140px',
//             // height: '65px',
//             margin: '5px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer'
//         });

//         // Create the day as a <p> tag
//         const dayElement = createElement('p', '', appointment.day, {
//             fontSize: '18px', // Set font size for the day
//             fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
//         });
//         dateButton.appendChild(dayElement);

//         // Create the date as an <h2> tag
//         const dateElement = createElement('h2', '', appointment.date, {
//             fontSize: '21px' // Set font size for the date
//         });
//         dateButton.appendChild(dateElement);

//         bntdate.appendChild(dateButton);
//     });
//     allDate.appendChild(bntdate);
//     document.body.appendChild(allDate);

//     const timeSection = createElement('div', 'time');
//     timeSection.appendChild(createElement('p', '', 'Time'));
//     const tbnt = createElement('div', 'tbnt');

//     // Create default time buttons for the first day
//     appointmentData[0].times.forEach(time => {
//         const timeButton = createElement('button', 'butt', time, {
//             border: '1px solid grey',
//             padding: '10px',
//             borderRadius: '40px',
//             width: '32%',
//             fontSize: '20px',
//             cursor: 'pointer'
//         });
//         tbnt.appendChild(timeButton);
//     });
    
//     timeSection.appendChild(tbnt);
//     document.body.appendChild(timeSection);

//     const customSchedule = createElement('div', 'cus');
//     customSchedule.appendChild(createElement('p', '', 'Want a custom Schedule?'));
//     const requestLink = createElement('a', 'req', 'Request Schedule', {
//         textDecoration: 'none',
//         cursor: 'pointer',
//         color: 'blue'
//     });
//     customSchedule.appendChild(requestLink);
//     document.body.appendChild(customSchedule);

//     const appointmentButton = createElement('button', 'bntapp', 'Make Appointment', {
//         marginLeft: '10%',
//         padding: '10px',
//         borderRadius: '30px',
//         width: '80%',
//         border: 'none',
//         marginBottom: '50px',
//         fontSize: '18px',
//         color: 'white',
//         cursor: 'pointer',
//         backgroundColor: 'blue'
//     });
//     document.body.appendChild(appointmentButton);
// }

// // Call functions to render the UI
// displayHeader();
// displayDoctorDetails();
// displayHorizontalLine();
// displayStatistics();
// displayAppointments();



// Import Firebase functions (ensure this is at the top of your script)
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
// const db = getFirestore(app);



// Sample data for doctor and statistics
const doctorDetails = {
    name: "Dr. Johnny Wilson",
    specialty: "Dentist",
    location: "New York, United States",
    patients: "7,500+",
    experience: "10+",
    rating: "4.9+",
    reviews: "4,789",
};


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
    let doctorCity = ""
    if(doctorData.address){
        doctorCity = doctorData.address
    }else{
        doctorCity = doctorData.address.map((array) =>{
            return array.city;
        }) 
    }

     
    
    const htext = createElement('div', 'htext');
    htext.appendChild(createElement('h1', '', doctorData.name));
    const detailsHTML = `<strong class="pcolor"><p class="den">${doctorData.specialty}</p>
        <p><i class="fa-sharp fa-solid fa-location-dot" style="color: blue;"></i> ${doctorCity}</p></strong>`;
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
        { icon: 'fa-briefcase', value: doctorData.yearsOfExperience || "N/A", label: 'Years Exp' },
        { icon: 'fa-star', value: doctorData.rating || "N/A", label: 'Rating' },
        { icon: 'fa-comment-dots', value: doctorData.review.length || "N/A", label: 'Reviews' }
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

// Function to display appointment booking
function displayAppointments() {
    const appHeader = createElement('h3', 'app', 'Book Appointment');
    document.body.appendChild(appHeader);

    const allDate = createElement('div', 'allDate');
    allDate.appendChild(createElement('p', '', 'Day'));

    const bntdate = createElement('div', 'bntdate');
    appointmentData.forEach(appointment => {
        const dateButton = createElement('button', 'datemonth', '', {
            border: '1px solid grey',
            borderRadius: '45px',
            width: '140px',
            margin: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
        });

        // Create the day as a <p> tag
        const dayElement = createElement('p', '', appointment.day, {
            fontSize: '18px',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        });
        dateButton.appendChild(dayElement);

        // Create the date as an <h2> tag
        const dateElement = createElement('h2', '', appointment.date, {
            fontSize: '21px'
        });
        dateButton.appendChild(dateElement);

        bntdate.appendChild(dateButton);
    });
    allDate.appendChild(bntdate);
    document.body.appendChild(allDate);

    const timeSection = createElement('div', 'time');
    timeSection.appendChild(createElement('p', '', 'Time'));
    const tbnt = createElement('div', 'tbnt');

    // Create default time buttons for the first day
    appointmentData[0].times.forEach(time => {
        const timeButton = createElement('button', 'butt', time, {
            border: '1px solid grey',
            padding: '10px',
            borderRadius: '40px',
            width: '32%',
            fontSize: '20px',
            cursor: 'pointer'
        });
        tbnt.appendChild(timeButton);
    });
    
    timeSection.appendChild(tbnt);
    document.body.appendChild(timeSection);

    const customSchedule = createElement('div', 'cus');
    customSchedule.appendChild(createElement('p', '', 'Want a custom Schedule?'));
    const requestLink = createElement('a', 'req', 'Request Schedule', {
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'blue'
    });
    customSchedule.appendChild(requestLink);
    document.body.appendChild(customSchedule);

    const appointmentButton = createElement('button', 'bntapp', 'Make Appointment', {
        marginLeft: '10%',
        padding: '10px',
        borderRadius: '30px',
        width: '80%',
        border: 'none',
        marginBottom: '50px',
        fontSize: '18px',
        color: 'white',
        cursor: 'pointer',
        backgroundColor: 'blue'
    });
    document.body.appendChild(appointmentButton);
}

// Function to find a specific doctor by UID
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
const doctorEmail = sessionStorage.getItem("selectedDoctor");
console.log(doctorEmail);
initUI(doctorEmail);

