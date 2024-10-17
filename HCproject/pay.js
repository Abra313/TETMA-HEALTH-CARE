function goBack() {
    window.history.back();
}

const bookingDetailsString = sessionStorage.getItem('patientBooking');

if (!bookingDetailsString) {
    console.error('No booking details found in session storage.');
} else {
    const bookingDetails = JSON.parse(bookingDetailsString);

    if (!bookingDetails.patientDetails || !bookingDetails.patientDetails.email) {
        console.error('patientDetails or email is missing in bookingDetails:', bookingDetails);
        alert('Patient email is missing. Please check your booking details.');
    } else {
        console.log(bookingDetails);
        
        function payWithPaystack() {
            var handler = PaystackPop.setup({
                key: 'pk_test_2137558ae8e8da48a655d4999768c333fbe85ab4', // Replace with your public key
                email: bookingDetails.patientDetails.email,
                amount: (bookingDetails.appointment.amount || 10000) * 100, // Amount in kobo
                currency: 'NGN',
                callback: function(response) {
                    alert('Payment successful. Transaction reference: ' + response.reference);
                    window.location.href = './review.html';
                },
                onClose: function() {
                    alert('Transaction was not completed, window closed.');
                }
            });

            // Function to add appointment to doctor's appointments array
            async function addAppointmentToDoctor(doctorEmail, bookingDetails) {
                const doctorRef = doc(db, 'DOCTOR', doctorEmail); // Adjust the path as necessary

                try {
                    const doctorDoc = await getDoc(doctorRef);
                    if (doctorDoc.exists()) {
                        const currentAppointments = doctorDoc.data().appointments || [];
                        currentAppointments.push(bookingDetails);
                        
                        await updateDoc(doctorRef, {
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
                const patientRef = doc(db, 'PATIENT', patientEmail); // Adjust the path as necessary

                try {
                    const patientDoc = await getDoc(patientRef);
                    if (patientDoc.exists()) {
                        const currentAppointments = patientDoc.data().appointments || [];
                        currentAppointments.push(bookingDetails);
                        
                        await updateDoc(patientRef, {
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

            // Add appointments to both doctor and patient
            addAppointmentToDoctor(bookingDetails.doctorDetails.email, bookingDetails);
            addAppointmentToPatient(bookingDetails.patientDetails.email, bookingDetails);

            handler.openIframe();
        }

        // Call payWithPaystack when needed, e.g., on button click
        document.getElementById('payButton').onclick = payWithPaystack; // Ensure your button has the ID 'payButton'
    }
}
