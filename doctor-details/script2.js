// Sample data for doctor and statistics
const doctorDetails = {
    name: "Dr. Johnny Wilson",
    specialty: "Dentist",
    location: "New York, United States",
    patients: "7,500+",
    experience: "10+",
    rating: "4.9+",
    reviews: "4,789"
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
    }
];

// Create and style elements function
function createElement(tag, className, textContent, styles = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.innerHTML = textContent;
    Object.assign(element.style, styles);
    return element;
}

// Function to display header with doctor details
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

// Function to display doctor details
function displayDoctorDetails() {
    const container = createElement('div', 'imtext');
    const img = createElement('img', '', '', {
        borderRadius: '70px',
        height: '120px',
        width: '120px'
    });
    img.src = 'channel-1.jpeg';
    
    const htext = createElement('div', 'htext');
    htext.appendChild(createElement('h1', '', doctorDetails.name));
    const detailsHTML = `<strong class="pcolor"><p class="den">${doctorDetails.specialty}</p>
        <p><i class="fa-sharp fa-solid fa-location-dot" style="color: blue;"></i> ${doctorDetails.location}</p></strong>`;
    htext.innerHTML += detailsHTML;

    container.appendChild(img);
    container.appendChild(htext);
    document.body.appendChild(container);
}

function displayHorizontalLine() {
    const hr = createElement('hr', '', '', {
        // margin: '20px 0'
    });
    document.body.appendChild(hr);
}

// Function to display statistics
function displayStatistics() {
    const sec3 = createElement('div', 'sec3');
    const stats = [
        { icon: 'fa-users', value: doctorDetails.patients, label: 'Patients' },
        { icon: 'fa-briefcase', value: doctorDetails.experience, label: 'Years Exp' },
        { icon: 'fa-star', value: doctorDetails.rating, label: 'Rating' },
        { icon: 'fa-comment-dots', value: doctorDetails.reviews, label: 'Reviews' }
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
            height: '70px',
            margin: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
        });

        // Create the day as a <p> tag
        const dayElement = createElement('p', '', appointment.day, {
            fontSize: '15px' // Set font size for the day
        });
        dateButton.appendChild(dayElement);

        // Create the date as an <h2> tag
        const dateElement = createElement('h2', '', appointment.date, {
            fontSize: '18px' // Set font size for the date
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

// Call functions to render the UI
displayHeader();
displayDoctorDetails();
displayHorizontalLine();
displayStatistics();
displayAppointments();


