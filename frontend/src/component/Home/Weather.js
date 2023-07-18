import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '593846e9b3334895a24185918231705'; // Replace with your actual WeatherAPI API key

  useEffect(() => {
    if (location) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${location}`
          );
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };

      fetchSearchResults();
    }
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearchResultClick = (result) => {
    setLocation(result.name);
    setSearchResults([]);
  };

  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
          );
          const data = await response.json();
          setWeatherData(data.forecast.forecastday);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  return (
    <div className="weather-container">
      <h1 className="weather-heading">Weather Prediction</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={handleLocationChange}
          className="search-input"
        />
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((result) => (
              <li
                key={result.id}
                onClick={() => handleSearchResultClick(result)}
                className="search-result"
              >
                {result.name}, {result.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      {weatherData ? (
        <div className="weather-info">
          {weatherData.map((day) => (
            <div key={day.date} className="day-forecast">
              <p className="day">{day.date}</p>
              <p className="weather-data">Temperature: {day.day.avgtemp_c}°C</p>
              <p className="weather-data">Humidity: {day.day.avghumidity}%</p>
              <p className="weather-data">Condition: {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No weather data available</p>
      )}
    </div>
  );
};

export default Weather;