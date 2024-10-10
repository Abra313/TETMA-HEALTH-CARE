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


