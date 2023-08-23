import React from "react";
import Country from "./Country";
const Countries = ({ countryList, setCountries }) => {
  const numOfCountries = countryList.length;
  const showCountry = (countryName) => {
    setCountries([countryName]);
  };
  return (
    <>
      {numOfCountries === 1 ? (
        <Country country={countryList[0]} />
      ) : (
        <div>
          {numOfCountries > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            <div>
              {countryList.map((country) => (
                <div key={country}>
                  <span>{country}</span>
                  <button
                    onClick={() => {
                      showCountry(country);
                    }}
                  >
                    show
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Countries;
