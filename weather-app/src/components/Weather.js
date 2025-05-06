import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Import the CSS file

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (weather && weather.lat && weather.lon) {
      setCoordinates({ lat: weather.lat, lon: weather.lon });
    }
  }, [weather]);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(response.data);
      setShowMap(true);
      console.log("Weather data:", response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "50";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes("clear") || desc.includes("sunny")) return <SunnyIcon />;
    if (desc.includes("cloud")) return <CloudyIcon />;
    if (desc.includes("rain") || desc.includes("drizzle")) return <RainyIcon />;
    if (desc.includes("snow")) return <SnowyIcon />;
    if (desc.includes("thunder") || desc.includes("storm")) return <StormyIcon />;
    if (desc.includes("wind") || desc.includes("breeze")) return <WindyIcon />;
    return <CloudyIcon />;
  };

  const getUVDescription = (uvIndex) => {
    if (uvIndex <= 2) return "Low";
    if (uvIndex <= 5) return "Moderate";
    if (uvIndex <= 7) return "High";
    if (uvIndex <= 10) return "Very High";
    return "Extreme";
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">Weather Tracker</h2>
      <div className="search-container">
        <input
          className="city-input"
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="search-button"
          onClick={fetchWeather}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Searching...
            </>
          ) : (
            'Get Weather'
          )}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-result">
          <h3 className="city-name">{weather.city}</h3>

          <div className="weather-icon-container">
            {getWeatherIcon(weather.description)}
          </div>

          <p className="weather-info temperature">Temperature: {weather.temperature}°C</p>
          <p className="weather-info description">Description: {weather.description}</p>

          {coordinates && showMap && (
            <div className="map-container">
              <h4>Location Map</h4>
              <div className="map-frame">
                <iframe
                  title="Weather Location Map"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lon}&z=10&output=embed`}
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {coordinates && showRadar && (
            <div className="radar-container">
              <h4>Weather Radar</h4>
              <div className="radar-frame">
                <iframe
                  title="Weather Radar"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  src={`https://embed.windy.com/embed2.html?lat=${coordinates.lat}&lon=${coordinates.lon}&zoom=8&level=surface&overlay=radar&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="weather-details">
            <Detail label="Humidity" value={`${weather.humidity || "90"}%`} iconClass="humidity-icon" />
            <Detail label="Wind Speed" value={`${weather.windSpeed || "16"} m/s`} iconClass="wind-icon" />
            <Detail label="Clouds" value={`${weather.clouds || "10"}%`} iconClass="clouds-icon" />
            <Detail label="Pressure" value={`${weather.pressure || "55"} hPa`} iconClass="pressure-icon" />
            <Detail label="UV Index" value={weather.uvIndex ? `${weather.uvIndex} (${getUVDescription(weather.uvIndex)})` : "30"} iconClass="uv-icon" />
            <Detail label="Sunrise" value={formatTime(weather.sunrise)} iconClass="sunrise-icon" />
            <Detail label="Sunset" value={formatTime(weather.sunset)} iconClass="sunset-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable detail component
const Detail = ({ label, value, iconClass }) => (
  <div className="weather-detail-item">
    <div className={`detail-icon ${iconClass}`}></div>
    <div className="detail-info">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  </div>
);

// Weather Icons Components
const SunnyIcon = () => (
  <svg className="weather-icon icon-sunny" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" stroke="currentColor" />
    <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" stroke="currentColor" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" stroke="currentColor" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" stroke="currentColor" />
    <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" stroke="currentColor" />
    <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" stroke="currentColor" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" stroke="currentColor" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" stroke="currentColor" />
  </svg>
);

const CloudyIcon = () => (
  <svg className="weather-icon icon-cloudy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const RainyIcon = () => (
  <svg className="weather-icon icon-rainy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 13v8" />
    <path d="M8 13v8" />
    <path d="M12 15v8" />
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
  </svg>
);

const SnowyIcon = () => (
  <svg className="weather-icon icon-snowy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
    <line x1="8" y1="16" x2="8.01" y2="16" />
    <line x1="8" y1="20" x2="8.01" y2="20" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
    <line x1="12" y1="22" x2="12.01" y2="22" />
    <line x1="16" y1="16" x2="16.01" y2="16" />
    <line x1="16" y1="20" x2="16.01" y2="20" />
  </svg>
);

const StormyIcon = () => (
  <svg className="weather-icon icon-stormy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
    <polyline points="13 11 9 17 15 17 11 23" />
  </svg>
);

const WindyIcon = () => (
  <svg className="weather-icon icon-windy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
);

export default Weather;
