const APIKey = "d3ab39630453b1f69262248a9ecf6aca";

// Getting access to search button
const searchButton = document.getElementById('search-button');


// Base URL for 5 day forecast
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// URL for user entered city
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function getForecast(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    
    
   
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

function getLatLong(searchBox) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBox}&appid=${APIKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    
    getForecast(data.coord.lat, data.coord.lon);
  
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}



// Event listeners
searchButton.addEventListener('click', function(event){
    event.preventDefault();
    // Getting access to search box
    const searchBox = document.getElementById('search-input').value.trim();
    getLatLong(searchBox);
});
