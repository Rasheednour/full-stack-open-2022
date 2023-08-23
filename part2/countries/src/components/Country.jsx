import React, { useState, useEffect } from "react";
import axios from "axios";
const Country = ({ country }) => {
  const [data, setData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then((response) => {
        const countryData = response.data;
        setData(countryData);
        axios
          .get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${countryData.latlng[0]}&lon=${countryData.latlng[1]}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${api_key}`
          )
          .then((response) => {
            setWeatherData(response.data);
          });
      });
  }, []);
  return (
    <>
      {data && (
        <div>
          <h2>{data.name.common}</h2>
          <p>capital {data.capital[0]}</p>
          <p>area {data.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.keys(data.languages).map((language) => (
              <li key={language}>{data.languages[language]}</li>
            ))}
          </ul>
          <img src={data.flags.png} alt={data.flags.alt}></img>
          <h3>Weather in {data.name.common}</h3>
          {weatherData && (
            <div>
              <p>temperature {weatherData.current.temp} Celcius</p>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              ></img>
              <p>wind {weatherData.current.wind_speed} m/s</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Country;
