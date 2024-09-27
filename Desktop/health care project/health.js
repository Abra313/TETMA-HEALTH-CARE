
    const specialtyContainer = document.getElementById("DS-icon"); // Main container div

const specialties = [
    {
        specialty: 'Dentist',
        icon: "./images/medical-icon--i-dental.svg"
    },
    {
        specialty: 'Cardiologist',
        icon: "./images/medical-icon--i-cardiology.png"
    },
    {
        specialty: 'Orthopedic',
        icon: "./images/solid-orthopedic.svg"
    },
    {
        specialty: 'Veterinarian',
        icon: "./images/veterinary.svg"
    }
];
   
specialties.forEach((spec) => {
    // Create a div for each specialty
    const specialtyDiv = document.createElement("div");
    specialtyDiv.classList.add("specialty-item"); // Add a class for styling if needed

    // Create the image and text for each specialty
    const img = document.createElement("img");
    const text = document.createElement("p");

    img.src = spec.icon;
    text.innerHTML = spec.specialty;
    img.classList.add("dental");

    // Append the img and text to the specialty div
    specialtyDiv.appendChild(img);
    specialtyDiv.appendChild(text);

    // Append the specialty div to the main container
    specialtyContainer.appendChild(specialtyDiv);
});


  const currentDate = new Date();

  // Get day, date, and month names
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayName = days[currentDate.getDay()];       // Get the day of the week
  const day = currentDate.getDate();                // Get the day of the month
  const monthName = months[currentDate.getMonth()];  // Get the month name

  // Format the date as Day, Date Month
  const formattedDate = `${dayName}, ${day} ${monthName}`;

  // Append the formatted date to the div
  const dateContainer = document.getElementById("date-time");
  dateContainer.textContent = formattedDate;

    // Function to convert and format time with AM/PM
    function formatTimeWithAmPm(hours, minutes) {
        // Determine if it's AM or PM
        const period = hours >= 12 ? 'PM' : 'AM';
    
        // Convert 24-hour time to 12-hour time
        const adjustedHours = hours % 12 || 12; // Convert '0' hour to '12' for midnight
    
        // Ensure minutes are two digits
        const formattedMinutes = minutes.toString().padStart(2, '0');
    
        // Return the formatted time with AM/PM
        return `${adjustedHours}:${formattedMinutes} ${period}`;
      }
    
      // Function to set the appointment time
      function setAppointmentTime(startHour, startMinute, endHour, endMinute) {
        // Format both start and end time with AM/PM
        const startTime = formatTimeWithAmPm(startHour, startMinute);
        const endTime = formatTimeWithAmPm(endHour, endMinute);
    
        // Display the appointment time in "HH:MM AM/PM - HH:MM AM/PM" format
        const appointmentTime = `${startTime} - ${endTime}`;
    
        // Append the formatted time to the div
        const timeContainer = document.getElementById("time");
        timeContainer.textContent = appointmentTime;
      }
    
      // Example: Set appointment from 9:00 AM to 10:00 AM
      setAppointmentTime(12, 0, 16, 0);  // Start time: 9:00 AM, End time: 10:00 AM


    // Adding the chevron click event
    const imgChevron = document.getElementById('chevron-down');
    imgChevron.addEventListener('click', (event) => {
        imgChevron.classList.toggle('rotate');
    });
    const data = [
        { imageUrl: './images/home.svg.svg', text: 'Home', url: 'https://example1.com' },
        { imageUrl: './images/map-solid-24.png', text: 'Explore', url: 'https://example2.com' },
        { imageUrl: './images/mingcute-calendar-fill.svg', text: 'Bookings', url: 'https://example3.com' },
        { imageUrl: './images/chat.svg', text: 'Chat', url: 'https://example4.com' },
        { imageUrl: './images/profile-footer.svg', text: 'Profile', url: 'https://example5.com' }
    ];

    const marquee = document.getElementById('marquee');
    const marqueeContainer = document.querySelector('.marquee-container');
    let position = 0;
    const speed = 1; // Speed of the movement

    function moveMarquee() {
      position -= speed;
      marquee.style.transform = `translateX(${position}px)`; // Apply the movement

      // Reset position when the entire first set of images is out of view
      if (Math.abs(position) >= marquee.offsetWidth / 2) {
        position = 0;
      }

      requestAnimationFrame(moveMarquee); // Continue the animation
    }

    // Start the animation when the page loads

            // Array of icon data
            const icons = [
                { src: 'https://via.placeholder.com/50', text: 'Home', link: 'https://example.com/home' },
                { src: 'https://via.placeholder.com/50', text: 'About', link: 'https://example.com/about' },
                { src: 'https://via.placeholder.com/50', text: 'Services', link: 'https://example.com/services' },
                { src: 'https://via.placeholder.com/50', text: 'Contact', link: 'https://example.com/contact' },
                { src: 'https://via.placeholder.com/50', text: 'Help', link: 'https://example.com/help' }
            ];
          // Select the footer element
          const footer = document.getElementById('footer');

          // Create the main div that will contain all icon divs
          const footerContainer = document.createElement('div');
          footerContainer.className = 'footer-container';
  
          // Loop through the icons array and create each icon div
          icons.forEach(icon => {
              // Create the icon container div
              const iconDiv = document.createElement('div');
              iconDiv.className = 'icon-container';
  
              // Create a link for the icon
              const iconLink = document.createElement('a');
              iconLink.href = icon.link;
  
              // Create the image (icon)
              const iconImage = document.createElement('img');
              iconImage.src = icon.src;
              iconImage.alt = icon.text;
  
              // Append the image to the link
              iconLink.appendChild(iconImage);
  
              // Create a link for the text
              const textLink = document.createElement('a');
              textLink.href = icon.link;
              textLink.textContent = icon.text;
  
              // Append the icon and text link to the container div
              iconDiv.appendChild(iconLink);
              iconDiv.appendChild(textLink);
  
              // Append each icon container div to the main footer container
              footerContainer.appendChild(iconDiv);
          });
  
          // Append the footer container to the footer element
          footer.appendChild(footerContainer);