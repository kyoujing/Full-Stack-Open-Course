import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setData(response.data);
        console.log("Data loaded");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const countryToShow = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const renderCountries = () => {
    if (countryToShow.length === 1) {
      const country = countryToShow[0];
      return (
        <div key={country.cca3}>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((lang) => (
              <li key={country.cca3}>{lang}</li>
            ))}
          </ul>
          <img src={country.flags.png} style={{ width: 400 }} />
        </div>
      );
    } else if (countryToShow.length <= 10) {
      return countryToShow.map((country) => (
        <div key={country.cca3}>
          <span style={{ marginRight: "5px" }}>{country.name.common}</span>
          <button onClick={() => setSearchText(country.name.common)}>
            Show
          </button>
        </div>
      ));
    }
    return <p>Too many matches, specify another filter</p>;
  };

  return (
    <>
      <label>
        find countries
        <input value={searchText} onChange={handleSearch} />
      </label>
      {searchText && <div>{renderCountries()}</div>}
    </>
  );
};
export default App;
