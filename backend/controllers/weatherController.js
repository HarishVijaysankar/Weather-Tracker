const axios = require("axios");
const Weather = require("../models/Weather");

const getWeather = async (req, res) => {
  const { city } = req.params;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    // Ensure we have the necessary data
    if (!response.data || !response.data.main) {
      return res.status(404).json({ error: "City not found" });
    }

    const { temp } = response.data.main;
    const { description, main } = response.data.weather[0];  // description and main (weather condition)

    // Common weather descriptions
    const commonDescriptions = {
      "Clear": "Clear sky",
      "Clouds": "Cloudy",
      "Rain": "Rainy weather",
      "Thunderstorm": "Thunderstorm with rain",
      "Snow": "Snowy weather",
      "Mist": "Mist",
      "Haze": "Hazy",
      "Fog": "Foggy weather"
    };

    // Use the description or a fallback to a common description
    const weatherDescription = commonDescriptions[main] || description;

    const weatherData = new Weather({ city, temperature: temp, description: weatherDescription });
    await weatherData.save();

    res.json({ city, temperature: temp, description: weatherDescription });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = { getWeather };
