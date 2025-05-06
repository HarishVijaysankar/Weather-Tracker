// models/Weather.js
const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  condition: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Weather", WeatherSchema);
