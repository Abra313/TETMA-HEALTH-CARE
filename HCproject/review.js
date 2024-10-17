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
}

function renderReview(data) {
    document.getElementById('doctor-name').textContent = data.doctor.name;
    document.getElementById('doctor-specialty').textContent = data.doctor.specialty;
    document.getElementById('doctor-location').textContent = data.doctor.location;
    document.getElementById('doctor-img').src = data.doctor.image;

    document.getElementById('booking-datetime').textContent = data.booking.datetime;
    document.getElementById('booking-package').textContent = data.booking.package;
    document.getElementById('booking-duration').textContent = data.booking.duration;
    document.getElementById('booking-for').textContent = data.booking.for;

    document.getElementById('amount').textContent = data.payment.amount;
    document.getElementById('rate').textContent = data.payment.rate;
    document.getElementById('payment-duration').textContent = data.payment.duration;
    document.getElementById('total').textContent = data.payment.total;
}

function payNow() {
    alert('Payment of ' + reviewData.payment.total + ' has been initiated.');
    window.location.href = "pay.html"; // Adjust to your payment page
}

function goBack() {
    window.history.back();
}

// Event listener for the pay now button
document.querySelector('.pay-now-button').addEventListener('click', payNow);

// Event listener for the back button (if applicable)
document.querySelector('.back-button').addEventListener('click', goBack);

// Retrieve stored data and render it
const reviewData = getStoredData();
renderReview(reviewData);
