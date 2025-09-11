import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from 'next/link';
import { useRouter } from 'next/router';
import "leaflet/dist/leaflet.css";

const OneMapSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // State to hold suggestions
  const [showFilterPopup, setShowFilterPopup] = useState(false); // State for filter popup
  const [searchradius, setRadius] = useState(5000); // Initial radius set to 5000 meters
  // Refs for map and marker
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromLat, setFromLat] = useState(null);
  const [fromLon, setFromLon] = useState(null);
  const [toLat, setToLat] = useState(null);
  const [toLon, setToLon] = useState(null);
  const router = useRouter();
  const [activeSearch, setActiveSearch] = useState(null); // 'from' or 'to'

  useEffect(() => {
    const loadLeaflet = async () => {
      const L = await import("leaflet");
      const pointsLayer = L.layerGroup();
      if (!mapInstanceRef.current && mapContainerRef.current) {
        mapInstanceRef.current = L.map(mapContainerRef.current, {
          zoomControl: false, // Disable zoom controls initially
        }).setView([1.3521, 103.8198], 13);


        pointsLayer.addTo(mapInstanceRef.current);

        L.tileLayer("https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png", {
          attribution: 'Map data © OneMap, Singapore Land Authority',
        }).addTo(mapInstanceRef.current);

        L.control.zoom({ position: "bottomright" }).addTo(mapInstanceRef.current);
       
        // Handle user location
        mapInstanceRef.current.locate({ setView: true, maxZoom: 17, enableHighAccuracy: true });

        let marker;
        const customIcon = L.icon({
          iconUrl: 'https://img.icons8.com/?size=100&id=3723&format=png&color=FF0000',
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38],
        });

        function onLocationFound(e) {
          const div = createSelectionPopup(e);
          marker = L.marker(e.latlng, { icon: customIcon, draggable: true })
            .addTo(mapInstanceRef.current)
            .bindPopup(div)
            .openPopup();

          // Update points whenever the location is found or adjusted
          updatePoints(e.latlng);
        }

        mapInstanceRef.current.on('locationfound', onLocationFound);

        function onLocationError() {
          marker = L.marker([1.363, 103.817], {icon: customIcon, draggable: true }).addTo(mapInstanceRef.current);
          alert('Geolocation Error: Please turn on Location Services for your web browser.');
        }

        mapInstanceRef.current.on('locationerror', onLocationError);

        // Update points on map click
        mapInstanceRef.current.on('click', onMapClick);
        function onMapClick(e) {
          console.log("Map clicked:", e.latlng);  // Log the latlng to confirm the click event
          fetchPoints(e.latlng);  // Call the function to fetch data
          const div = createPopup(e);
          marker = marker.setLatLng(e.latlng).addTo(mapInstanceRef.current).bindPopup(div).openPopup();
          updatePointsfromAPI(e.latlng); // Update points when user clicks on the map
          const circle = L.circle(e.latlng, {
            radius: searchradius,  // Set the radius (1500 km for example)
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.2
          
        }).addTo(mapInstanceRef.current);
    
        // Optionally, if you want to remove the previous circle before adding the new one:
        if (window.previousCircle) {
            mapInstanceRef.current.removeLayer(window.previousCircle);
        }
        
        // Save the current circle to remove it later
        window.previousCircle = circle;
        }


        function createSelectionPopup(e) {
          const radius = e.accuracy;
          const div = document.createElement('div');
          div.innerHTML = `<p style="text-align: center">You are currently within <span class="math-inline">${radius}m from: </br> <b></span>${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}</b></p>`;
          div.className = 'popup-container';

          const button = document.createElement('button');
          button.innerHTML = 'Select this location';
          button.className = 'button-class';
          button.onclick = function () {
            goToLink(e.latlng.lat, e.latlng.lng);
          };

          div.appendChild(button);
          return div;
        }

        function createPopup(e) {
          const div = document.createElement('div');
          div.innerHTML = `<p style="text-align: center">You have selected this point at:</br> <b>${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}</b></p>`;
          div.className = 'popup-container';

          const button = document.createElement('button');
          button.innerHTML = 'Right Here!';
          button.className = 'button-class';
          button.onclick = function () {
            goToLink(e.latlng.lat, e.latlng.lng);
          };

          div.appendChild(button);
          return div;
        }

        // Function to update points based on the current location
        function updatePoints(latLng) {
          // Fetch and update the points near the current location
          // This can be an API call or other mechanism to fetch new points
          console.log("Updating points based on", latLng);
          // For example, you could fetch points here using a function
        }
        const fetchImage = async (imageUuid) => {
          if (!imageUuid) {
            console.error("No imageUuid provided for fetching the image");
            return null; // Return early if imageUuid is not provided
          }
        
          const headers = {
            'Content-Type': 'application/json',
            'X-API-Key': 'c9CPS2M90Tx2DemirvzQ50mFnvsic1Ig',
          };
        
          const imageUrl = `https://api.stb.gov.sg/media/download/v2/${imageUuid}`;
        
          try {
            const response = await fetch(imageUrl, { headers });
        
            if (!response.ok) {
              console.error(`Failed to fetch image: ${response.statusText}`);
              return null;
            }
        
            // Handle the response as a Blob (binary data)
            const imageBlob = await response.blob();
        
            // Create a URL for the Blob
            const imageObjectUrl = URL.createObjectURL(imageBlob);
        
            return imageObjectUrl;  // Return the image URL created from the Blob
          } catch (error) {
            console.error("Error fetching image:", error);
            return null;
          }
        };
     // Function to update points based on the current location (API call)
     const updatePointsfromAPI = async (apiData)=> {
      if (!apiData || !apiData.data || apiData.data.length === 0) {
        console.error("No valid data available to process");
        return; // No valid data, so we don't proceed
      }
    
      pointsLayer.clearLayers()
    
      // Define a color mapping for dataset values
      const datasetColors = {
        accommodation: "#FF0000", // Red
        attractions: "#0000FF",  // Blue
        events: "#00FF00",       // Green
        food_beverages: "#FFA500", // Orange
        mice_events: "#800080",  // Purple
        precincts: "#FFC0CB",    // Pink
        shops: "#FFFF00",        // Yellow
        tours: "#00FFFF",        // Cyan
      };
    
      // Generate a custom SVG icon with color
      const createCustomIcon = (color) => {
        const svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="${color}" />
          </svg>
        `;
        return L.divIcon({
          className: "custom-icon",
          html: svgIcon,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
      };
    
      // Iterate through each point and process asynchronously
      for (const point of apiData.data) {
        if (point.location && point.location.latitude && point.location.longitude) {
          const lat = point.location.latitude;
          const lon = point.location.longitude;
          const dataset = point.dataset;
    
          const color = datasetColors[dataset] || "#000000"; // Default: black
          const customIcon = createCustomIcon(color);
    
          // Create the marker first and add it to the map immediately
          const marker = L.marker([lat, lon], { icon: customIcon });
    
          // Create the popup content
          const popupContent = `
            <strong>${point.name}</strong><br>
            Address: ${point.address?.postalCode || "N/A"}<br>
            Rating: ${point.rating || "N/A"}<br>
            Tags: ${point.tags?.join(", ") || "N/A"}
          `;
          marker.bindPopup(popupContent);
    
          // Add the marker to the layer
          pointsLayer.addLayer(marker);
    
          // Check if image UUID is available and fetch the image asynchronously
          const imageUuid = point.images?.[0]?.uuid; // Now using the first image's UUID
          console.log('imageUuid:', imageUuid);  // Check if UUID exists for each point
          if (imageUuid) {
            // Use setTimeout to ensure the image fetch doesn't block marker rendering
            setTimeout(async () => {
              try {
                // Fetch the image asynchronously
                const imageUrl = await fetchImage(imageUuid);
    
                // Update the popup content with the image once it's fetched
                const updatedPopupContent = `
                  ${imageUrl ? `<img src="${imageUrl}" alt="${point.name}" height="300px" width="300px"><br>` : ''}
                  <strong>${point.name}</strong><br>
                  Address: ${point.address?.postalCode || "N/A"}<br>
                  Rating: ${point.rating || "N/A"}<br>
                  Tags: ${point.tags?.join(", ") || "N/A"}
                `;
                marker.setPopupContent(updatedPopupContent);
              } catch (error) {
                console.error("Error fetching image:", error);
              }
            }, 0); // Ensures this happens after marker rendering
          }
        }
      }
    
      // Add the updated layer to the map
      pointsLayer.addTo(mapInstanceRef.current);
    };
 

    
// Function to fetch points based on the latitude and longitude with additional headers and query parameters
async function fetchPoints(latLng) {
  const headers = {
    'Content-Type': 'application/json', // Content type for the request body
        'X-API-Key': 'c9CPS2M90Tx2DemirvzQ50mFnvsic1Ig',
    'X-Content-Language': 'en', // Language header, use the appropriate code for your language


  }
 
  const location = `${latLng.lat},${latLng.lng}`; // Convert latLng to a string as required
  const radius = searchradius; // Radius in meters
  const dataset = ''; // Example dataset, change as needed
  const keyword = ''; // Optional keyword for search, can be modified based on input
  const sort = "distance_rating"; // Optional sorting field, change as needed
  const sortOrder = ''; // Optional sorting order
  const distinct = "Yes"; // Optional distinct flag to filter duplicated places
  const limit = "20";

  // Constructing the query parameters
  const queryParams = new URLSearchParams({
    location: location,
    radius: radius,
    dataset: dataset,
    keyword: keyword,
    sort: sort,
    sortOrder: sortOrder,
    distinct: distinct,
    limit: limit,
  });

  // Construct the full API URL with query parameters
  const apiUrl = `https://api.stb.gov.sg/services/navigation/v2/search?${queryParams.toString()}`;

  console.log("API URL:", apiUrl); // Log the URL being called

  try {
    // Fetching data with the headers and query parameters
    const response = await fetch(apiUrl, { headers: headers });
    
    // Check if the response is successful
    if (response.ok) {
      const data = await response.json();
      console.log("API Response:", data); // Log the response from the API
       // Assume the API returns an array of points with lat, lng, name, and description
      updatePointsfromAPI(data)
      return data.points;
    } else {
      console.error("API Error:", response.status); // Log if the API call failed
      return [];
    }
  } catch (error) {
    console.error("Fetch Error:", error); // Log any fetch-related errors
    return [];
  }
}
}};

    if (typeof window !== "undefined") {
      loadLeaflet();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off();
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [searchradius]);

 // Search input handling
 const handleSearchInput = (e, isFrom) => {
  const value = e.target.value;
  setSearchInput(value);

  if (value.length >= 3) {
    fetchSuggestions(value, isFrom);
  } else {
    setSuggestions([]);
  }

  // Set the active search bar
  setActiveSearch(isFrom ? 'from' : 'to');

  // Update the specific location based on whether it's "From" or "To"
  if (isFrom) {
    setFromLocation(value);
  } else {
    setToLocation(value);
  }
};

const handleSearch = () => {
  if (fromLat && fromLon && toLat && toLon) {
    console.log('From:', fromLat, fromLon);
console.log('To:', toLat, toLon);

    // Redirect to another page with lat, lon parameters
    router.push(`https://bfarouting.app.airbase.sg/route/?fromLoc=${fromLat},${fromLon}&toLoc=${toLat},${toLon}`);

  } else {
    alert('Please select both "From" and "To" locations.');
  }
};

const fetchSuggestions = (value, isFrom) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE && this.status === 200) {
      const response = JSON.parse(this.responseText);
      if (response.found > 0 && response.results.length > 0) {
        setSuggestions(response.results);
      } else {
        setSuggestions([]);
      }
    }
  });

  xhr.open(
    'GET',
    `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${value}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
  );
  xhr.send();
};

const handleSuggestionClick = (suggestion, isFrom) => {
  if (isFrom) {
    setFromLocation(suggestion.SEARCHVAL);  // Set the name of the location
    setFromLat(suggestion.LATITUDE);  // Latitude from the response
    setFromLon(suggestion.LONGITUDE);  // Longitude from the response
  } else {
    setToLocation(suggestion.SEARCHVAL);  // Set the name of the location
    setToLat(suggestion.LATITUDE);  // Latitude from the response
    setToLon(suggestion.LONGITUDE);  // Longitude from the response
  }
  setSuggestions([]);  // Clear the suggestions after selection
};

const handleSearchLocation = (lat, lon) => {
  if (markerRef.current) {
    markerRef.current.remove();  // Remove existing marker if any
  }

  markerRef.current = L.marker([lat, lon], { icon: customIcon })
    .addTo(mapInstanceRef.current)
    .bindPopup(createSearchPopup(lat, lon))
    .openPopup();

  mapInstanceRef.current.setView([lat, lon], 16);  // Set map view to the selected location
};

const handleLocateUser = () => {
  if (mapInstanceRef.current) {
    mapInstanceRef.current.locate({ setView: true, maxZoom: 17, enableHighAccuracy: true });
  }
};
const handleSwapLocations = () => {
  const tempLocation = fromLocation;
  const tempLat = fromLat;
  const tempLon = fromLon;

  setFromLocation(toLocation);
  setFromLat(toLat);
  setFromLon(toLon);

  setToLocation(tempLocation);
  setToLat(tempLat);
  setToLon(tempLon);
};
const toggleFilterPopup = () => {
  setShowFilterPopup((prevState) => !prevState);
};

const closeFilterPopup = () => {
  setShowFilterPopup(false);
};

const handleSliderChange = (event) => {
  const newRadius = event.target.value * 1000; // Convert from km to meters
  setRadius(newRadius);  // Update the search radius state
  console.log('New radius:', newRadius);  // Log to check if it's updating
};

return (
  <div>
  <div id="container" style={{ position: "relative", height: "100vh", width: "100%" }}>
    <div id="map" ref={mapContainerRef} style={{ height: "100%", width: "100%" }}></div>

    {/* Search Bar Section */}
    <div
      className="search-container"
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column", // Stack search bars vertically
        alignItems: "flex-start", // Align search bars to the left
        gap: "10px", // Space between the search bars
      }}
    >
      
      {/* "From" Search Bar */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={fromLocation}
          onChange={(e) => handleSearchInput(e, true)}  // true for "From"
          placeholder="From Address or Landmark"
          aria-label="From Search Input"
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '348px',
            fontSize: '16px',
            transition: 'border-color 0.3s ease',
          }}
        />
        {/* Suggestions for "From" */}
        {activeSearch === 'from' && suggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '82px',  // Adjust to be below the "From" search bar
              left: '0',
              zIndex: 1000,
              listStyle: 'none',
              padding: '0px 16px',
              background: '#fff',
              borderRadius: '5px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slightly deeper shadow for a modern look
              border: '1px solid #ccc',
              maxHeight: '200px',
              overflowY: 'auto',
              width: '348px',
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion, true)} // true for "From"
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  borderBottom: '1px solid #eee',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
              >
                <b>{suggestion.SEARCHVAL}</b>
                <p>{suggestion.ADDRESS}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* "To" Search Bar */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={toLocation}
          onChange={(e) => handleSearchInput(e, false)}  // false for "To"
          placeholder="To Address or Landmark"
          aria-label="To Search Input"
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '348px',
            fontSize: '16px',
            transition: 'border-color 0.3s ease',
          }}
        />
        {/* Suggestions for "To" */}
        {activeSearch === 'to' && suggestions.length > 0 && (
          <ul
            style={{
              position: 'absolute',
              top: '28px',  // Adjust to be below the "To" search bar
              left: '0',
              zIndex: 1000,
              listStyle: 'none',
              padding: '0px 16px',
              background: '#fff',
              borderRadius: '5px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slightly deeper shadow for a modern look
              border: '1px solid #ccc',
              maxHeight: '200px',
              overflowY: 'auto',
              width: '348px',
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion, false)} // false for "To"
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  borderBottom: '1px solid #eee',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#fff')}
              >
                  <b>{suggestion.SEARCHVAL}</b>
                  <p>{suggestion.ADDRESS}</p>
              </li>
              
            ))}
            
          </ul>
          
        )}
                {/* Swap Button */}
                <button
  onClick={handleSwapLocations}
  style={{
    position: "absolute",
    right: "-60px", // Move it to the right side of the input fields
    transform: "translateY(-50%)", // Adjust for exact centering
    padding: "10px 14px",
    color: "white",
    border: "none",
    cursor: "pointer",
    background: "none",
  }}
>
  <img
    src="https://mobile.onemap.gov.sg/web/images/swap-destination.png"
    alt="Swap"
    style={{
      width: "40px",
      height: "30px",
    }}
  />
</button>
        
      </div>
    </div>

    {/* Button Section */}
    <div
      className="button-container"
      style={{
        position: "absolute",
        top: "20px",
        margin: "2px 50px",
        left: "415px", // Adjust to place beside search bars
        zIndex: 1000,
        display: "flex",
        alignItems: "center", // Align buttons horizontally
        gap: "10px", // Space between buttons
      }}
    >
      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          padding: "12px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {/* Locate Me Button */}
      <button
        onClick={handleLocateUser}
        style={{
          padding: "12px 16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Locate Me
      </button>

      {/* Filter Button */}
      <button
        onClick={() => setShowFilterPopup(!showFilterPopup)} // Toggle the popup visibility
        style={{
          padding: "12px 16px",
          width: '80px',
          backgroundColor: "#FF6347", // Tomato color for filter button
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Filter
      </button>
    </div>

    {/* Filter Popup */}
    {showFilterPopup && (
      <div
        className="filter-popup"
        style={{
          position: "absolute",
          top: "60px",
          left: "55%",
          width: '250px',
          zIndex:'1000',
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "1rem",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
          border: "1px solid #ccc",
        }}
      >
        <h3>Filter Options</h3>
        {/* Filtering options below */}
        <div style={{ marginBottom: '10px' }}>
          {/* Checkbox 1: Sample POI filter */}
          <label>
            <input
              type="checkbox"
              id="filterCategory1"
              onChange={(e) => handleFilterToggle(e.target, 'Category 1')}
            />
            Show POIs in Category 1
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          {/* Checkbox 2: Sample distance filter */}
          <label>
            <input
              type="checkbox"
              id="filterCategory2"
              onChange={(e) => handleFilterToggle(e.target, 'Category 2')}
            />
            Show POIs in Category 2
          </label>
        </div>

        <div>
          <label htmlFor="radiusSlider">Search Radius (km):</label>
          <input
            id="radiusSlider"
            type="range"
            min="0.01"
            max="10"
            step="0.5"
            value={searchradius / 1000}  // Convert meters to km for slider
            onChange={handleSliderChange}
            style={{
              marginLeft: "10px",
              width: "200px",
            }}
          />
          <span>{searchradius / 1000} km</span> {/* Display the selected radius */}
        </div>

        <button
          onClick={closeFilterPopup}
          style={{
            backgroundColor: '#FF6347',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    )}
  </div>
</div>
    
  );
};

export default OneMapSearch;
