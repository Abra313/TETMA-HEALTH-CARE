const loggedInDoctor = JSON.parse(sessionStorage.getItem('userDetails'));

console.log(loggedInDoctor);

const welcomeCon = document.getElementById('welcome');
const appointmentLength = document.getElementById('Schedule-fig');
const schedules = document.getElementById('Schedule-pro');

welcomeCon.innerText = `Welcome ${loggedInDoctor.name}`;
appointmentLength.innerHTML = `<p>${loggedInDoctor.appointments.length}</p>`;

// Clear previous schedules
schedules.innerHTML = '';
console.log(loggedInDoctor.appointments)

// Iterate over each appointment
loggedInDoctor.appointments.forEach(appointment => {
 

    const scheduleItem = `
        <div class="profile" id="profile">
            <div class="info-wrapper">
                <div id="image-container"><img src=${appointment.patientDetails.profilePic} alt= ${appointment.patientDetails.name}  /></div>
                <div class="info" id="info">
                    <p class="name" id="name">${appointment.patientDetails.name}</p>
                </div>
            </div>
            <i class="fa-solid fa-phone" style="color: white; font: 2rem;"></i>
        </div>


        <div class="date" id="date">
            <div class="date-box">
                <i class="fa-regular fa-calendar" style="color: white;"></i>
                <p class="month" id="month">${appointment.appointment.date}</p>
            </div>
            <p style="color: white;">|</p>
           <div class="date-box">
            <i class="fa-regular fa-clock" style="color: white;"></i>
            <p class="time" id="time">${appointment.appointment.time}</p>
           </div>
    `;

    // Append the schedule item to the schedules element
    schedules.innerHTML += scheduleItem;
});
