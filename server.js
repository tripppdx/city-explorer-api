'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const climate = require('./data/weather.json');

const foods = require('./data.json');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware - app.use
app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('goto: localhost:3001/weather');
});

app.get('/foods', (request, response) => {
  const veg = request.query.veg === 'true';

  const firstVeggy = foods.find(food => food.vegetarian === veg);

  response.send(firstVeggy);
});

// WEATHER
app.get('/weather', (request, response) => {
  const locationData = climate.find(city => city.city_name === 'Seattle');
  // const firstClimate = climates.find(climate => climate.searchQuery === data);
  const Forecast = {
    date: '',
    desciption: '',
  };
  response.status(200).send(weather);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
