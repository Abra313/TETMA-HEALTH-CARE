// Import the storeSelection function if necessary
// import { storeSelection } from './storage.js';

function getStoredData() {
    return {
        doctor: {
            name: sessionStorage.getItem('doctorName') || "",
            specialty: sessionStorage.getItem('doctorSpecialty') || "",
            location: sessionStorage.getItem('doctorLocation') || "",
            image: sessionStorage.getItem('doctorImage') || ""
        },
        booking: {
            datetime: sessionStorage.getItem('bookingDatetime') || "",
            package: sessionStorage.getItem('bookingPackage') || "",
            duration: sessionStorage.getItem('bookingDuration') || "",
            for: sessionStorage.getItem('bookingFor') || ""
        },
        payment: {
            amount: sessionStorage.getItem('paymentAmount') || "",
            rate: sessionStorage.getItem('paymentRate') || "",
            duration: sessionStorage.getItem('paymentDuration') || "",
            total: sessionStorage.getItem('paymentTotal') || ""
        }
    };
};

const bookingData = JSON.parse(sessionStorage.getItem('patientBooking'));
console.log(bookingData)

    document.getElementById('doctor-name').textContent = bookingData.doctorDetails.name;
    document.getElementById('doctor-specialty').textContent = bookingData.doctorDetails.specialty;
    document.getElementById('doctor-location').textContent = bookingData.doctorDetails.location;
    document.getElementById('doctor-img').src = bookingData.doctorDetails.image;

    document.getElementById('booking-datetime').textContent = `${bookingData.appointment.date} / ${bookingData.appointment.time}`;

    document.getElementById('amount').textContent = `₦${bookingData.appointment.amount}`;
    document.getElementById('payment-duration').textContent = bookingData.appointment.duration;

function payNow() {
    alert('Payment of ' + `₦${bookingData.appointment.amount}` + ' has been initiated.');
    window.location.href = "pay.html"; // Adjust to your payment page
}

function goBack() {
    window.history.back();
}

// Event listener for the pay now button
document.querySelector('.pay-now-button').addEventListener('click', payNow);

// Event listener for the back button (if applicable)
document.querySelector('.back-button').addEventListener('click', goBack);

