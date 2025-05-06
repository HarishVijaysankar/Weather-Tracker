const express = require("express");
const { getWeather } = require("../controllers/weatherController"); // ✅ Import the function

const router = express.Router();

// ✅ Ensure this is GET, not POST
router.get("/:city", getWeather);

module.exports = router;
