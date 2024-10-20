import { storeSelection } from '../utils/packageStore.js'; // Adjust the path as necessary

document.addEventListener('DOMContentLoaded', function() {
    const durationSelect = document.getElementById("duration");
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    const totalCostDiv = document.getElementById("totalCost");
    const packageForm = document.getElementById("packageForm"); // Reference to the form

    // Base prices for each service
    const basePrices = {
        messaging: 20000,
        voice: 40000,
        video: 60000,
        inPerson: 120000
    };

    // Update prices when the duration or service selection changes
    durationSelect.addEventListener("change", updateServicePrices);
    serviceRadios.forEach(radio => {
        radio.addEventListener("change", updateTotalCost);
    });

    // Form submit event
    packageForm.addEventListener("submit", handleFormSubmit);

    // Initial price update on page load
    updateServicePrices();

    function updateServicePrices() {
        const duration = parseInt(durationSelect.value);

        // Update the price for each service individually
        const prices = {
            messaging: document.getElementById("priceMessaging"),
            voice: document.getElementById("priceVoiceCall"),
            video: document.getElementById("priceVideoCall"),
            inPerson: document.getElementById("priceInPerson")
        };

        for (const [service, priceElement] of Object.entries(prices)) {
            const basePrice = basePrices[service];
            const totalPrice = basePrice * (duration / 30);
            priceElement.textContent = `₦${totalPrice.toFixed(2)}`; // Update price display
        }

        // Update total cost display
        updateTotalCost();
    }

    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent the default form submission

        const selectedServices = Array.from(serviceRadios).filter(radio => radio.checked);
        
        if (selectedServices.length === 0) {
            totalCostDiv.textContent = "Please select a service to book an appointment.";
            return; // Exit the function if no service is selected
        }

        const duration = parseInt(durationSelect.value);
        const paymentDetails = calculatePaymentDetails(selectedServices, duration);
        
        const doctorDetails = getDoctorDetails(); // Fetch doctor details
        const bookingDetails = getBookingDetails(duration); // Fetch booking details

        // Retrieve existing patientBooking from sessionStorage
        const patientBookingString = sessionStorage.getItem('patientBooking');
        let patientBooking = patientBookingString ? JSON.parse(patientBookingString) : {};

        // Update the booking details with the selected duration and service amount
        
            patientBooking.appointment.duration = duration,
            patientBooking.appointment.amount = paymentDetails.total.slice(1)
        

        // Store updated booking details back to session storage
        sessionStorage.setItem('patientBooking', JSON.stringify(patientBooking));

        // Store other details in session storage
        storeSelection(selectedServices.map(service => service.value), durationSelect.value, paymentDetails, doctorDetails, bookingDetails);

        // Redirect to the review page
        window.location.href = "../HCproject/review.html"; // Replace with actual payment page
    }

    function calculatePaymentDetails(selectedServices, duration) {
        let totalCost = 0;
        const serviceDetails = selectedServices.map(service => {
            const serviceName = service.id.replace('service', '').toLowerCase();
            const basePrice = basePrices[serviceName];
            const serviceCost = basePrice * (duration / 30);
            totalCost += serviceCost;
            return {
                name: serviceName,
                cost: serviceCost
            };
        });

        return {
            total: `₦${totalCost.toFixed(2)}`,
            details: serviceDetails
        };
    }

    function getDoctorDetails() {
        return {
            name: "",
            specialty: "",
            location: "",
            image: "path/to/image.jpg" // Placeholder for doctor image path
        };
    }

    function getBookingDetails(duration) {
        return {
            datetime: new Date().toISOString(),
            duration: duration,
            for: "Self" // Replace with actual value as needed
        };
    }

    function updateTotalCost() {
        const selectedServices = Array.from(serviceRadios).filter(radio => radio.checked);
        let totalCost = 0;
        
        selectedServices.forEach(service => {
            const priceElement = document.getElementById(`price${service.id.replace('service', '')}`);
            const serviceCost = parseFloat(priceElement.textContent.replace('₦', '').replace(',', ''));
            totalCost += serviceCost;
        });

        totalCostDiv.textContent = `Total Cost: ₦${totalCost.toFixed(2)}`;
        document.getElementById("nextButton").textContent = "Proceed to Pay";
    }
});
