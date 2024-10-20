import { doc, collection, db, getDocs, updateDoc, query, where }from "../firebaseConfig.js";


function goBack() {
    window.history.back();
}

const bookingDetailsString = sessionStorage.getItem('patientBooking');

let bookingDetails = '';
let isPayment = false; // Initialize isPayment

if (!bookingDetailsString) {
    console.error('No booking details found in session storage.');
} else {
    bookingDetails = JSON.parse(bookingDetailsString);

    if (!bookingDetails.patientDetails || !bookingDetails.patientDetails.email) {
        console.error('patientDetails or email is missing in bookingDetails:', bookingDetails);
        alert('Patient email is missing. Please check your booking details.');
        window.location.href = '../home-page/home.html'
    } else {
        console.log(bookingDetails.appointment.amount);
    }
};


const payWithPaystack = async () => {
    var handler = PaystackPop.setup({
        key: 'pk_test_2137558ae8e8da48a655d4999768c333fbe85ab4', // Replace with your public key
        email: bookingDetails.patientDetails.email,
        amount: bookingDetails.appointment.amount * 1000 || 10000,
        currency: 'NGN',
        callback: function(response) {
            addAppointmentToDoctor(bookingDetails.doctorDetails.email, bookingDetails);
            addAppointmentToPatient(bookingDetails.patientDetails.email, bookingDetails);
            alert('Payment successful. Transaction reference: ' + response.reference);
            
        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');
        }
    });

    handler.openIframe();
}

// Call payWithPaystack when needed, e.g., on button click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('payButton').onclick = payWithPaystack;
});



// Function to add appointment to doctor's appointments array
async function addAppointmentToDoctor(doctorEmail, bookingDetails) {
    const doctorRef = collection(db, 'DOCTOR'); // Reference to the collection
    const q = query(doctorRef, where('email', '==', doctorEmail)); // Query to find the doctor

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doctorDoc = querySnapshot.docs[0]; // Get the first matching document
            const currentAppointments = doctorDoc.data().appointments || [];
            currentAppointments.push(bookingDetails);
            
            await updateDoc(doc(db, 'DOCTOR', doctorDoc.id), {
                appointments: currentAppointments
            });
            console.log('Appointment added to doctor:', doctorEmail);
        } else {
            console.log('No doctor found with that email:', doctorEmail);
        }
    } catch (error) {
        console.error('Error updating doctor appointments:', error);
    }
}

// Function to add appointment to patient's appointments array
async function addAppointmentToPatient(patientEmail, bookingDetails) {
    const patientRef = collection(db, 'PATIENT'); // Reference to the collection
    const q = query(patientRef, where('email', '==', patientEmail)); // Query to find the patient

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const patientDoc = querySnapshot.docs[0]; // Get the first matching document
            console.log(patientDoc);
            const currentAppointments = patientDoc.data().appointments || [];
            currentAppointments.push(bookingDetails);
            
            await updateDoc(doc(db, 'PATIENT', patientDoc.id), {
                appointments: currentAppointments
            });
            console.log('Appointment added to patient:', patientEmail);
        } else {
            console.log('No patient found with that email:', patientEmail);
        }
    } catch (error) {
        console.error('Error updating patient appointments:', error);
    }
}