'use strict';

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

class Films {
  constructor(title, poster) {
    this.title = title;
    this.poster = poster
      ? `https://image.tmdb.org/t/p/w200${poster}`
      : `http://www.artollo.com/wp-content/uploads/2014/04/WP-235.jpg`;
  }
}

app.get('/', (request, response) => {
  response.status(200).send('goto: localhost:3001/weather');
});

// WEATHER
app.get('/weather', async (request, response) => {
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
});

//MOVIES
app.get('/movies', async (request, response) => {
  try {
    const searchQuery = request.query.searchQuery;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1`;

    const moviesResponse = await axios.get(url);
    console.log(moviesResponse.data);
    if (moviesResponse) {
      let moviesArray = moviesResponse.data.results.map(
        movie => new Films(movie.title, movie.poster_path)
      );
      response.status(200).send(moviesArray);
    } else {
      response.status(400).send('Error retrieving movies data');
    }
  } catch (err) {
    console.log(err);
  }
});

// ERRORS
app.get('*', errorHandler);
function errorHandler(request, response) {
  response.status(500).send('Something went wrong');
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
