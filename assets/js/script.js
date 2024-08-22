const APIKey = "d3ab39630453b1f69262248a9ecf6aca";

// Getting access to search button
const searchButton = document.getElementById('search-button');


// Base URL for 5 day forecast
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// URL for user entered city
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// URL for current weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function getCurrentWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Getting access to current-weather div in html
        const currentWeatherDiv = document.getElementById('current-weather');
        // Creating div to hold name/date and weather icon
        const nameDiv = document.createElement('div');
        nameDiv.setAttribute('class', 'd-flex m-2');

        // Creating element for City Name and Date
        const cityName = document.createElement('h3');
        cityName.textContent = `${data.name} - ${dayjs().format('MM/DD/YYYY')}`;
        
        // Creating element for weather icon
        const weatherIcon = document.createElement('img');
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        weatherIcon.setAttribute('style', 'height: 40px');

        // Creating element for weather conditions
        const weatherConditions = document.createElement('div');
        weatherConditions.setAttribute('class', 'd-flex flex-column m-3');

        // Creating elements for temperature, wind, and humidity
        const temp = document.createElement('p');
        temp.textContent =`Temp: ${data.main.temp} degrees`;

        const wind = document.createElement('p');
        wind.textContent =`Wind: ${data.wind.speed} mph`;

        const humidity = document.createElement('p');
        humidity.textContent =`Humidity: ${data.main.humidity}%`;
        
        // Appending dynamically created elements to currentWeatherDiv
        currentWeatherDiv.appendChild(nameDiv);
        nameDiv.appendChild(cityName);
        nameDiv.appendChild(weatherIcon);

        currentWeatherDiv.appendChild(weatherConditions);
        weatherConditions.appendChild(temp);
        weatherConditions.appendChild(wind);
        weatherConditions.appendChild(humidity);
       
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
}




function getForecast(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // console.log(data);
    
    
   
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
    getCurrentWeather(data.coord.lat, data.coord.lon);
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
