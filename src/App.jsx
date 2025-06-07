import { useEffect, useState } from "react";

import loader from "./assets/loader.svg";
import browser from "./assets/browser.svg";
import "./App.css";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_cit?key=${API_KEY}`)
      .then((response) => {
        console.log("Response received from API:", response);
        // 400 - 499 : Erreur clients
        // 500 - 599 : Erreur serveur
        if (!response.ok)
          throw new Error(`Error ${response.status}, ${response.statusText}`);
        return response.json();
      })
      .then((responseData) => {
        console.log("Data received from API:", responseData);
        setWeatherData({
          city: responseData.data.city,
          country: responseData.data.country,
          iconId: responseData.data.current.weather.ic,
          temperature: responseData.data.current.weather.tp,
        });
      })
      .catch((err) => {
        console.log("Error fetching data from API:", err);
        console.dir(err);
        setErrorInfo(err.message);
      });
  }, []);

  return (
    <main>
      <div
        className={`loader-container ${!weatherData && !errorInfo && "active"}`}
      >
        <img src={loader} alt="loading icon" />
      </div>

      {weatherData && (
        <>
          <p className="city-name">{weatherData.city}</p>
          <p className="country-name">{weatherData.country}</p>
          <p className="temperature">{weatherData.temperature}°C</p>
          <div className="info-icon-container">
            <img
              src={`../public/icons/${weatherData.iconId}.svg`}
              className="info-icon"
              alt="weather icon"
            />
          </div>
        </>
      )}

      {errorInfo && !weatherData && (
        <>
          <p className="error-information">{errorInfo}</p>
          <img src={browser} alt="error icon" />
        </>
      )}
    </main>
  );
}

export default App;
