import React, { useState, useEffect } from "react";
import axios from "axios";
const Country = ({ country }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then((response) => {
        setData(response.data);
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
        </div>
      )}
    </>
  );
};

export default Country;
