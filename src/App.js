import logo from './logo.svg';
import './App.css';
import '../src/config.json';

function App() {
  return (
    <body>
      <div className='title'>
          <h1>Weather!</h1>
      </div>

      <div className='location-button' id='location-button'>
        <button onClick={getUserLocation}>Show Me The Weather!</button>
      </div>

      <div className='weather-data'>
        <p id='weather-text'></p>
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

      const apiURL = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}&units=I`;

      fetch(apiURL) 
        .then(response => {
          
          return response.json();

        })

        .then(data => {

          //get api response
          const weatherdata = data.data[0];

          //update webpage
          weatherText.innerText = `It is currently ${weatherdata.temp} degrees in ${weatherdata.city_name}`;
          
          
        })
    });
  } else {
    console.log("Geolocation is not supported on this browser!");
  }
}

export default App;
