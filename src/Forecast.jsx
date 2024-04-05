import React, { useState } from "react";
import { WiDaySunny } from "react-icons/wi";
import "./App.css";

const API_KEY = {
  key: "DAbfXCXWRRBi6jTzrTvjuoFY8dTyRt6j",
  base: "https://api.tomorrow.io/v4/weather/",
};
function Forecast() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `${API_KEY.base}realtime?location=${query}&units=metric&apikey=${API_KEY.key}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
          console.log(data);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const WeatherType = (code) => {
    let weather = "";
    switch (code) {
      case 1000:
        weather = "Sunny";
        break;
      case 1100:
        weather = "Mostly Clear";
        break;
      case 1101:
        weather = "Partly Cloudy";
        break;
      case 1102:
        weather = "Mostly Cloudy";
        break;
      case 1001:
        weather = "Cloudy";
        break;
      case 2000:
        weather = "Fog";
        break;
      case 2100:
        weather = "Light Fog";
        break;
      case 4000:
        weather = "Drizzle";
        break;
      case 4001:
        weather = "Rain";
        break;
      case 4200:
        weather = "Light Rain";
        break;
      case 4201:
        weather = "Heavy Rain";
        break;
      case 5000:
        weather = "Snow";
        break;
      default:
        weather = "Clear";
    }
    return weather;
  };

  return (
    <div className="forecast-box">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="search cities...."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
        />
      </div>
      {typeof weather.location != "undefined" ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.location.name.split(",")[0]},
              {weather.location.name.split(",").reverse()[0]}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.data.values.temperature)}°C
            </div>
            <div className="weather">
              {WeatherType(weather.data.values.weatherCode)}
              {WeatherType(weather.data.values.weatherCode) ===
              "Partly Cloudy" ? (
                <WiDaySunny />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Forecast;
