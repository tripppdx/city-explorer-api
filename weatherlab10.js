'use strict';

const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const cache = require('./cache.js');

class Weather {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

async function getWeather(request, response) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    const key = 'weather-' + lat + lon;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

    if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
      console.log('Cache hit');
      // console.log(cache);
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = await axios
        .get(url)
        .then(response => parseWeather(response.data));
    }

    console.log(cache[key].data);
    response.status(200).send(cache[key].data);
    // return cache[key].data;
  } catch (err) {
    console.log(err);
  }
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = getWeather;
