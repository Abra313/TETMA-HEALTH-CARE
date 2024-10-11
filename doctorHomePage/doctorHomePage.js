function getUserData() {
    return null; 
}

function updateLocation() {
    const locationElement = document.getElementById('location');
    const userData = getUserData();

    if (userData && userData.address) {
        locationElement.textContent = userData.address; 
    } else {
        locationElement.textContent = 'No address available'; 
    }
}

// Call the function to update the location
updateLocation();

// Schedule section
const scheduleFig = document.getElementById('Schedule-fig');
scheduleFig.innerHTML = '';

const newElement = document.createElement('p');
newElement.textContent = '1';
newElement.classList.add('new-schedule-class');
scheduleFig.appendChild(newElement);

// User details section
const nameElement = document.getElementById('name');
nameElement.innerHTML = 'Johnson Williams';

const monthElement = document.getElementById('month');
const timeElement = document.getElementById('time');
monthElement.innerHTML = "2024, 24 Oct";
timeElement.innerHTML = "00:00 - 12:00";

// Function to add an image
function addImage() {
    const container = document.getElementById('image-container');
    const imageElement = document.createElement('img');

    // Set the image source and attributes
    imageElement.src = "/aseeet/images/john-hopkins-hospital.jpeg";
    imageElement.alt = 'Johns Hopkins Hospital';
    imageElement.width = 50;
    imageElement.height = 50;
    imageElement.classList.add('my-image');

    container.appendChild(imageElement);
}

// Call the function to add the image
addImage();
