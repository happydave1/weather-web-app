import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body>
      <div className='title'>
          <h1>Weather!</h1>
      </div>

      <div className='location-button'>
        <button onClick={getUserLocation()}>Get My Location!</button>
      </div>

    </body>
  );
}

function getUserLocation() {
  if (navigator.geolocation) {

    //code for getting user location using Geolocation API
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
    });

    
  } else {
    console.log("Geolocation is not supported on this browser!");
  }
}

export default App;
