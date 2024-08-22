const APIKey = "d3ab39630453b1f69262248a9ecf6aca";

// Getting access to search button
const searchButton = document.getElementById('search-button');


// Base URL for 5 day forecast
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// URL for user entered city
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// URL for current weather
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Function to get current weather data
function getCurrentWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKey}&units=imperial`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Getting access to current-weather div in html
        const currentWeatherDiv = document.getElementById('current-weather');

        // Empties currentWeatherDiv to avoid repeating data
        currentWeatherDiv.innerHTML = '';

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
        temp.textContent =`Temp: ${data.main.temp}\u00B0F`;

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

// Function to get 5 day forecast
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
    // Get access to forecast card div
     const forecastCards = document.getElementById('forecast-cards');
     const cardContainer = document.createElement('div');

     const divHeader = document.createElement('h4');
     divHeader.textContent = '5 Day Forecast';
     divHeader.setAttribute('class', 'm-2');

     forecastCards.appendChild(divHeader);
     forecastCards.appendChild(cardContainer);

      // Find first midday index in results from fetch
    let midday; 
    for (i = 0; i < 8; i++) {
        let hour = (dayjs(data.list[i].dt_txt).add(data.city.timezone, 'second')).format('HH');
        if (hour >= 12 && hour <=14) {midday = i;}
    }

    // Finds all midday indexes
    for ( i = 0; i <5; i ++) {
        let index = i*8 + midday;
        let date = (dayjs(data.list[index].dt_txt).add(data.city.timezone, 'second')).format('MM/DD/YYYY');

        const forecastCard = document.createElement('div');
        forecastCard.setAttribute('class', 'card');

        const forecastDate = document.createElement('h5');
        forecastDate.setAttribute('class', 'card-title');
        forecastDate.textContent = dayjs(data.list[index].dt_txt).format('MM/DD/YYYY');

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body p-2');

        // Icon
        const icon = document.createElement('img');
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`);
        icon.setAttribute('style', 'height: 30px');
        // Temp
        const temp = document.createElement('p');
        temp.textContent =`Temp: ${data.list[index].main.temp}\u00B0F` ;
        // Wind
        const wind = document.createElement('p');
        wind.textContent = `Wind: ${data.list[index].wind.speed} MPH`
        // Humidity
        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${data.list[index].main.humidity}%`

        
        forecastCard.appendChild(forecastDate);
        forecastCard.appendChild(cardBody);

        cardBody.appendChild(icon);
        cardBody.appendChild(temp);
        cardBody.appendChild(wind);
        cardBody.appendChild(humidity);
   
        cardContainer.appendChild(forecastCard);
    }

    
   
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

// Function to get latitude and longitude for other fetch requests
function getLatLong(searchBox) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBox}&appid=${APIKey}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Calling functions to use latitude and longitude to get forecast and current weather data
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
