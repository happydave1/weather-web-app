import logo from './logo.svg';
import './App.css';
import '../src/config.json';
import '../src/index.css';
import placeholderImage from './assets/placeholder.png';

function App() {
  return (
    <body className='website'>
      <div>
          <h1 className='title'>Weather!</h1>
      </div>

      <div className='weather-data'>
        <p id='weather-text'>placeholder text here</p>
        <img id='weather-icon' src={placeholderImage} alt='weather icon'/>
        <p id='conditions-description'>placeholder text here</p>
      </div>

      <div className='location-button' id='location-button'>
        <button className='location-button' onClick={getUserLocation}>Show Me The Weather!</button>
      </div>

    </body>
  );
}

function getUserLocation() {
  if (navigator.geolocation) {
    //code for getting user location using Geolocation API
    navigator.geolocation.getCurrentPosition(position => {

      //coordinates
      const { latitude, longitude } = position.coords;

      //get element to display weather data
      var weatherText = document.getElementById('weather-text');

      //communicate with WeatherBit API
      //NOTE: Users must sign up at WeatherBit and get an API key
      const configJSON = require('../src/config.json');
      const API_KEY = configJSON.weatherBit.apiKey;
      console.log(API_KEY);

      const apiURL = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}&units=I`;

      fetch(apiURL) 
        .then(response => {

          if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
          }
          
          return response.json();

        })

        .then(data => {

          //get api response
          const weatherdata = data.data[0];

          //update webpage
          weatherText.innerText = `It is currently ${weatherdata.temp} degrees in ${weatherdata.city_name}`;
          weatherText.style.visibility = 'visible';

          //change weather icon
          const icon = document.getElementById("weather-icon");
          const iconurl = `https://cdn.weatherbit.io/static/img/icons/${weatherdata.weather.icon}.png`;
          icon.src = iconurl;
          icon.style.visibility = 'visible';
          
          //display conditions outside
          const conditionsText = document.getElementById("conditions-description");
          conditionsText.textContent = `Conditions outside: ${weatherdata.weather.description}`;
          conditionsText.style.visibility = 'visible';
        })

        .catch(error => {
          // Handle errors, including 403 Forbidden
          if (error instanceof Error && error.message.includes('403')) {
            console.error('Error: Access Forbidden. Check authentication and permissions.');
            weatherText.innerText = 'Check your API key, 403 forbidden error caught';
            weatherText.style.visibility = 'visible';
          } else {
            console.error(`Fetch error: ${error.message}`);
          }
        });
    });
  } else {
    console.log("Geolocation is not supported on this browser!");
  }
}

export default App;
