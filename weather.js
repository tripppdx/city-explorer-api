'use strict';

// IMPORTS
const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

async function handleGetWeather(request, response) {
  try {
    let latitude = request.query.lat;
    let longitude = request.query.lon;

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&days=3&key=${WEATHER_API_KEY}`;

    const weatherResponse = await axios.get(url);
    if (weatherResponse) {
      let weatherArray = weatherResponse.data.data.map(
        forecast =>
          new Forecast(forecast.valid_date, forecast.weather.description)
      );
      response.status(200).send(weatherArray);
    } else {
      response.status(400).send('Error retrieving weather data');
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = handleGetWeather;
