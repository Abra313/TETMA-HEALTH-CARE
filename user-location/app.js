
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector("#searchButton");
    const addressInput = document.getElementById("address");
    const locationOutput = document.getElementById("location");
    const suggestionsContainer = document.querySelector(".suggestionBox");
    const deleteBtn = document.querySelector(".fa-circle-xmark ");
    // const searchResult = document.querySelector(".recent-search");
  
    let lat;
    let lon;
  
    searchButton.addEventListener("click", check);
  
    async function check() {
      navigator.geolocation.getCurrentPosition(async (position) => {
        lat = position.coords.latitude; // Store the latitude in the outer variable
        lon = position.coords.longitude; // Store the longitude in the outer variable
        console.log("Latitude:", lat);
        console.log("Longitude:", lon);
  
        // Use the coordinates to get the address
        const userAddress = await getAddressFromCoordinates(lat, lon);
        console.log("Address:", userAddress);
  
        // Construct a dynamic Google Maps embed URL with coordinates
        const googleMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2166913870437!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2sng!5e0!3m2!1sen!2sng!4v1727099638184!5m2!1sen!2sng`;
  
        // Display the result including the address and map
        locationOutput.innerHTML = `
          <strong>RECENT SEARCH:</strong> <br>
          <strong>Coordinates:</strong> Latitude ${lat}, Longitude ${lon}<br>
          <strong>Address:</strong> ${userAddress}<br><br>
          <iframe
            width="100%"
            height="450"
            style="border:0"
            allowfullscreen=""
            loading="lazy"
            src="${googleMapUrl}">
          </iframe>
        `;
        locationOutput.style.width = "100%";
      });
    }
  
    async function getAddressFromCoordinates(latitude, longitude) {
      const apiKey = "7ed8eb2b6d6d420b835db554885fe389"; // Replace with your Geoapify API key
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch address from coordinates.");
        }
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          return data.features[0].properties.formatted; // Return the formatted address
        } else {
          return "No address found.";
        }
      } catch (error) {
        console.error("Error during reverse geocoding:", error);
        return "Error retrieving address.";
      }
    }
   deleteBtn.addEventListener('click', ()=>{
    addressInput.value = '';
   })
  
    addressInput.addEventListener("input", async (e) => {
      const query = e.target.value;
      suggestionsContainer.innerHTML = ""; // Clear previous suggestions
      if (query.length > 2) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
          );
          const suggestions = await response.json();
          console.log("Suggestions:", suggestions);
  
          suggestionsContainer.style.display = "block";
          const sugArray = [];
  
          suggestions.forEach((suggestion) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestionItem");
            suggestionItem.textContent = suggestion.display_name;
            suggestionItem.style.padding = "5px";
            suggestionItem.style.width = "405px";
            suggestionItem.style.cursor = "pointer";
            // suggestionItem.style.width = "1000px";
        
            suggestionItem.addEventListener("click", async () => {
              addressInput.value = suggestion.display_name;
              lat = suggestion.lat;
              lon = suggestion.lon;
              sessionStorage.setItem("destination", addressInput.value);
              suggestionsContainer.style.display = "none"
              suggestionsContainer.innerHTML = ""; // Clear suggestions
              
              const result = await fetchLocation(suggestion.display_name);
              displayLocation(result);
            });
            sugArray.push(suggestionItem);
          });
          if (sugArray.length > 3) {
            suggestionsContainer.appendChild(sugArray[0]);
            suggestionsContainer.appendChild(sugArray[1]);
            suggestionsContainer.appendChild(sugArray[3]);
           
          }
        } catch (error) {
          console.error("Autocomplete API error:", error);
        }
      }
    });
  
    addressInput.addEventListener("focus", () => {
      const rect = addressInput.getBoundingClientRect();
      suggestionsContainer.style.left = `10px`;
      suggestionsContainer.style.top = `${rect.bottom}px`;
      suggestionsContainer.style.width = `405px`;
    });

    const searchResult = [];
  
    addressInput.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const address = addressInput.value.trim();
        if (address) {
          try {
            const result = await fetchLocation(address);
            displayLocation(result);
            if (!searchResult.includes(address)) {
              searchResult.push(address);
              updateRecentSearchesUI()
            }
            suggestionsContainer.innerHTML = ""; 
            suggestionsContainer.style.display = "none";
           
          } catch (error) {
            console.error("Error fetching location:", error);
            locationOutput.textContent = "Error fetching location.";
          }
        } else {
          locationOutput.textContent = "Please enter an address.";
        }
      }
    });
    function updateRecentSearchesUI() {
      const recentSearchesContainer = document.querySelector("#recent-search"); // Make sure you have this element in your HTML
      recentSearchesContainer.innerHTML = ""; // Clear existing searches
  
      recentSearches.forEach(search => {
        const searchItem = document.createElement("div");
        searchItem.classList.add("recentSearchItem");
        searchItem.textContent = search;
  
        // Optionally, you can add an event listener to allow re-selecting recent searches
        searchItem.addEventListener("click", () => {
          addressInput.value = search;
          // Optionally trigger search or fetch location again
        });
  
        recentSearchesContainer.appendChild(searchItem);
      });
    }
  
    // ... existing code ...
  });
   

  
    async function fetchLocation(address) {
      const apiKey = "7ed8eb2b6d6d420b835db554885fe389"; // Replace with your Geoapify API key
      const encodedAddress = encodeURIComponent(address);
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      return data;
    }
  
    function displayLocation(result) {
      if (result.features && result.features.length > 0) {
        const location = result.features[0];
        const googleMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2166913870437!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sen!2sng!5e0!3m2!1sen!2sng!4v1727099638184!5m2!1sen!2sng`;
  
        locationOutput.innerHTML = `
          <strong></strong> ${addressInput.value} <br>
          <strong></strong> ${location.properties.formatted}<br>
          <strong></strong> ${lat},  ${lon}<br><br>
          <iframe
            width="100%"
            height="450"
            style="border:0"
            allowfullscreen=""
            loading="lazy"
            src="${googleMapUrl}">
          </iframe>
        `;
      } else {
        locationOutput.textContent = "No location found for the given address.";
      }
    }
  ;
  