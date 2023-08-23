import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const countryNames = response.data.map(
          (country) => country.name.common
        );
        setCountries(countryNames);
      });
  }, []);

  useEffect(() => {
    const countryList = countries.filter((country) =>
      country.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCountries(countryList);
  }, [searchValue]);

  const handleSearchChange = (event) => {
    const search = event.target.value;
    setSearchValue(search);
  };

  return (
    <div>
      <span>find countries</span>
      <input value={searchValue} onChange={handleSearchChange} />
      <Countries
        countryList={filteredCountries}
        setCountries={setFilteredCountries}
      />
    </div>
  );
};

export default App;
