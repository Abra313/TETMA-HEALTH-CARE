

// Function to store selected service, duration, payment details, doctor details, and booking details in sessionStorage
export function storeSelection(service, duration, paymentDetails, doctorDetails, bookingDetails) {
    sessionStorage.setItem('selectedService', service);
    sessionStorage.setItem('selectedDuration', duration);
    
    // Storing payment details in sessionStorage
    sessionStorage.setItem('paymentAmount', paymentDetails.amount);
    sessionStorage.setItem('paymentRate', paymentDetails.rate);
    sessionStorage.setItem('paymentDuration', paymentDetails.duration);
    sessionStorage.setItem('paymentTotal', paymentDetails.total);

    // Storing doctor details in sessionStorage
    sessionStorage.setItem('doctorName', doctorDetails.name);
    sessionStorage.setItem('doctorSpecialty', doctorDetails.specialty);
    sessionStorage.setItem('doctorLocation', doctorDetails.location);
    sessionStorage.setItem('doctorImage', doctorDetails.image);

    // Storing booking details in sessionStorage
    sessionStorage.setItem('bookingDatetime', bookingDetails.datetime);
    sessionStorage.setItem('bookingPackage', bookingDetails.package);
    sessionStorage.setItem('bookingDuration', bookingDetails.duration);
    sessionStorage.setItem('bookingFor', bookingDetails.for);
}
