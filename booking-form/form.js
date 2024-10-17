import { storeSelection } from '../utils/packageStore.js'; // Adjust the path as necessary

document.addEventListener('DOMContentLoaded', function() {
    const durationSelect = document.getElementById("duration");
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    const totalCostDiv = document.getElementById("totalCost");
    const nextButton = document.getElementById("nextButton");

    // Listen for changes in duration and service selection
    durationSelect.addEventListener("change", updateTotalCost);
    serviceRadios.forEach(radio => {
        radio.addEventListener("change", updateTotalCost);
    });

    // Button click event
    nextButton.addEventListener("click", handleNextButtonClick);

    function handleNextButtonClick() {
        const selectedService = document.querySelector('input[name="service"]:checked');
        
        if (!selectedService) {
            totalCostDiv.textContent = "Please select a service to book an appointment.";
            return; // Exit the function if no service is selected
        }

        const duration = parseInt(durationSelect.value);
        const serviceCost = parseInt(selectedService.value);
        const paymentDetails = calculatePaymentDetails(serviceCost, duration);
        const packageName = selectedService.closest('.service').querySelector('h3').textContent;

        const doctorDetails = getDoctorDetails(); // Fetch doctor details
        const bookingDetails = getBookingDetails(packageName, duration); // Fetch booking details

        // Store all details in session storage
        storeSelection(selectedService.value, durationSelect.value, paymentDetails, doctorDetails, bookingDetails);

        // Redirect to the review page
        window.location.href = "../HCproject/review.html"; // Replace with actual payment page
    }

    function calculatePaymentDetails(serviceCost, duration) {
        const totalCost = serviceCost * (duration / 30);
        return {
            amount: `$${totalCost.toFixed(2)}`,
            rate: `1 x $${serviceCost}`,
            duration: `${duration} minutes`,
            total: `$${totalCost.toFixed(2)}`
        };
    }

    function getDoctorDetails(name,specialty,location) {
        return {
            name:"",
            specialty: "",
            location: "",
            image: "path/to/image.jpg" // Placeholder for doctor image path
        };
    }

    function getBookingDetails(packageName, duration) {
        return {
            datetime: new Date().toISOString(),
            package: packageName,
            duration: duration,
            for: "Self" // Replace with actual value as needed
        };
    }

    function updateTotalCost() {
        const duration = parseInt(durationSelect.value);
        const selectedService = document.querySelector('input[name="service"]:checked');
        
        if (selectedService) {
            const serviceCost = parseInt(selectedService.value);
            const totalCost = serviceCost * (duration / 30);
            totalCostDiv.textContent = `Total Cost: $${totalCost.toFixed(2)}`;

            nextButton.textContent = "Proceed to Pay";
        } else {
            totalCostDiv.textContent = "Please select a service to book an appointment.";
            nextButton.textContent = "NEXT"; // Revert button text if no service is selected
        }
    }
});
