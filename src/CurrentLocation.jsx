import React, { useState, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import "./App.css";

function CurrentLocation() {
  let API_KEY = "DAbfXCXWRRBi6jTzrTvjuoFY8dTyRt6j";
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [weather, setWeather] = useState(null);
  let URL = `https://api.tomorrow.io/v4/weather/realtime?location=${lat}%2C%20${lon}&apikey=DAbfXCXWRRBi6jTzrTvjuoFY8dTyRt6j`;
  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    function getPosition(position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  }

  useEffect(() => {
    console.log(lat, lon);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.values.temperature);
        setTemperature(data.data.values.temperature);
        setHumidity(data.data.values.humidity);
        setWindSpeed(data.data.values.windSpeed);
        setWeatherCode(data.data.values.weatherCode);
      })
      .catch((err) => console.log(err));
  }, [lat, lon]);
  return (
    <>
      <div className="Current-box">
        <h1>Weather Application</h1>
        <div className="current-location">
          <small>Latitude:{lat}</small>
          <br />
          <small>Longitude:{lon}</small>
        </div>
        <div className="current-weather">
          <div className="current-temp">
            <h1>{temperature}°C</h1>
          </div>
          <div className="current-humidity card-template">
            <h4>Humidity</h4>
            <div className="humidity">
            <WiThermometer style={{fontSize:"30px"}}/>
            <h3>{humidity}%</h3>
            </div>
           
          </div>
          <div className="current-windSpeed card-template">
            <h4>WindSpeed</h4>
            <div className="winsdSpeed">
            <WiStrongWind />
            <h3>{windSpeed}m/s</h3>
            </div>
            
          </div>
          <div className="current-weatherCode card-template">
            <h3>{weatherCode}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentLocation;
