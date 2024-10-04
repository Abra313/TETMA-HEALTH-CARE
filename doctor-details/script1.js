        document.addEventListener("DOMContentLoaded", function() {
            // Data arrays
            const doctorDetails = {
                name: "Dr. Johnny Wilson",
                specialty: "Dentist",
                location: "New York, United States"
            };

            const stats = [
                { icon: "fa-users", value: "7,500+", label: "Patients" },
                { icon: "fa-briefcase", value: "10+", label: "Years Exp" },
                { icon: "fa-star", value: "4.9+", label: "Rating" },
                { icon: "fa-comment-dots", value: "4,789", label: "Reviews" }
            ];

            const workingHours = [
                { day: "Monday", hours: "00:00 - 00:00" },
                { day: "Tuesday", hours: "00:00 - 00:00" },
                { day: "Wednesday", hours: "00:00 - 00:00" },
                { day: "Thursday", hours: "00:00 - 00:00" },
                { day: "Friday", hours: "00:00 - 00:00" },
                { day: "Saturday", hours: "00:00 - 00:00" },
                { day: "Sunday", hours: "00:00 - 00:00" }
            ];

            // Display doctor details
            const htext = document.querySelector('.htext');
            htext.innerHTML = `
                <h1>${doctorDetails.name}</h1>
                <strong class="pcolor">
                    <p class="den">${doctorDetails.specialty}</p>
                    <p><i class="fa-sharp fa-solid fa-location-dot" style="color: blue;"></i> ${doctorDetails.location}</p>
                </strong>
            `;

            // Apply styles for doctor details
            htext.querySelector('h1').style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            htext.querySelector('h1').style.fontSize = '20px';
            htext.querySelector('.pcolor').style.color = 'grey';

            // Display stats
            const sec3 = document.querySelector('.sec3');
            stats.forEach(stat => {
                const section = document.createElement('div');
                section.className = 'section3';
                section.innerHTML = `
                    <i class="fa-solid ${stat.icon}"></i>
                    <h1 style="margin-bottom: 0;">${stat.value}</h1>
                    <p style="margin-top: 0;">${stat.label}</p>
                `;
                sec3.appendChild(section);

                // Apply styles for each stat section
                section.querySelector('i').style.color = 'blue';
                section.querySelector('i').style.backgroundColor = 'rgb(196, 192, 192)';
                section.querySelector('i').style.fontSize = '30px';
                section.querySelector('i').style.borderRadius = '50px';
                section.querySelector('i').style.padding = '17px';
                section.querySelector('i').style.cursor = 'pointer';

                section.querySelector('h1').style.color = 'blue';
                section.querySelector('h1').style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                section.querySelector('h1').style.display = 'flex';
                section.querySelector('h1').style.alignItems = 'center';
                section.querySelector('h1').style.justifyContent = 'center';

                section.querySelector('p').style.color = 'grey';
                section.querySelector('p').style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
                section.querySelector('p').style.fontSize = '17px';
                section.querySelector('p').style.display = 'flex';
                section.querySelector('p').style.alignItems = 'center';
                section.querySelector('p').style.justifyContent = 'center';
            });

            // Display working hours
            const cont = document.querySelector('.cont');
            workingHours.forEach(({ day, hours }) => {
                const weekDiv = document.createElement('div');
                weekDiv.className = 'weeks';
                weekDiv.innerHTML = `
                    <p>${day}</p>
                    <p>${hours}</p>
                `;
                cont.appendChild(weekDiv);

                // Apply styles for working hours
                weekDiv.style.display = 'flex';
                weekDiv.style.alignItems = 'center';
                weekDiv.style.justifyContent = 'space-between';
                weekDiv.style.padding = '6px';
                weekDiv.style.margin = '10px';
                weekDiv.style.boxSizing = 'border-box';     

weekDiv.querySelectorAll('p').forEach(p => {
    p.style.margin = '0'; 
    p.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    p.style.color = 'grey';
});
});
});