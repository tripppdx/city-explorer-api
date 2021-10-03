'use strict';

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

var getWeather = require('./weatherlab10.js');
var getMovies = require('./movieslab10.js');

app.get('/', (request, response) => {
  response.status(200).send('goto: localhost:3001/weather');
});

// WEATHER
app.get('/weather', getWeather);

//MOVIES
app.get('/movies', getMovies);

// ERRORS
app.get('*', errorHandler);
function errorHandler(request, response) {
  response.status(500).send('Something went wrong');
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
