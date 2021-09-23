'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

// const axios = require('axios');

const PORT = process.env.PORT || 3001;
const climateJson = require('./data/weather.json');

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.get('/', (request, response) => {
  response.status(200).send('goto: localhost:3001/weather');
});

// WEATHER
app.get('/weather', (request, response) => {
  let weatherArray = [];

  const weatherResponse = climateJson.find(
    city => city.city_name === request.query.searchQuery
  );

  if (weatherResponse) {
    weatherArray = weatherResponse.data.map(
      forecast =>
        new Forecast(forecast.valid_date, forecast.weather.description)
    );
    response.status(200).send(weatherArray);
  } else {
    response.status(400).send('City not found');
  }
});

// Errors
app.get('*', errorHandler);
function errorHandler(request, response) {
  response.status(500).send('Something went wrong');
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
