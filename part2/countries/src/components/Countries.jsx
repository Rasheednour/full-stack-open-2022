import React from "react";
import Country from "./Country";
const Countries = ({ countryList }) => {
  const numOfCountries = countryList.length;
  return (
    <>
      {numOfCountries === 1 ? (
        <Country country={countryList[0]} />
      ) : (
        <div>
          {numOfCountries > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            <ul>
              {countryList.map((country) => (
                <li key={country}>{country}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Countries;
