// doctorHomePage.js

// Mock function to get user data. Replace this with your actual user retrieval logic.
function getUserData() {
    // Simulating a user with no address.
    // return { name: 'John Doe', address: '123 Main St, Anytown, USA' }; // Example with address
    return null; // Simulating no user logged in
    // return { name: 'Jane Doe', address: null }; // Example with no address
}

function updateLocation() {
    const locationElement = document.getElementById('location');
    const userData = getUserData();

    if (userData && userData.address) {
        locationElement.textContent = userData.address; // Update with the user's address
    } else {
        locationElement.textContent = 'No address available'; // Fallback message
    }
}

// Call the function to update the location on page load
updateLocation();

// doctorHomePage.js

// Mock function to get schedule data. Replace this with your actual data retrieval logic.
// doctorHomePage.js

function getScheduleData() {
    // Example of schedule data without time
    return [
        { event: 'Check-up with Dr. Smith' },
        { event: 'Dental Appointment' },
        // Add more schedules as needed
    ];
}

function updateSchedule() {
    const scheduleFigElement = document.getElementById('Schedule-fig');
    const scheduleData = getScheduleData(); // Get the schedule data

    // Clear existing content
    scheduleFigElement.innerHTML = '';

    // Check if there are any schedules
    if (scheduleData.length === 0) {
        scheduleFigElement.textContent = 'No upcoming schedules'; // Fallback message
        return;
    }

    // Create and append schedule items as text content
    scheduleData.forEach(schedule => {
        const scheduleText = `${schedule.date}: ${schedule.event}`;
        scheduleFigElement.textContent += scheduleText + '\n'; // Append each schedule with a newline
    });
}

// Call the function to update the schedule on page load
updateSchedule();


// Function to update the schedule
function updateSchedule(title, date) {
    const scheduleFig = document.getElementById('Schedule-fig');
    scheduleFig.innerHTML = ""; // Clear existing content

    // Create new elements
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    titleElement.classList.add("schedule-title");

    const dateElement = document.createElement("p");
    dateElement.textContent = `Date: ${date}`;
    dateElement.classList.add("schedule-date");

    // Append new elements to Schedule-fig
    scheduleFig.appendChild(titleElement);
    scheduleFig.appendChild(dateElement);
}

// Example: Update the schedule with a specific item
updateSchedule("0",);
