'use strict';

// IMPORTS
const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const cache = require('./cache.js');

class Films {
  constructor(title, poster) {
    this.title = title;
    this.poster = poster
      ? `https://image.tmdb.org/t/p/w200${poster}`
      : `http://www.artollo.com/wp-content/uploads/2014/04/WP-235.jpg`;
  }
}

async function handleGetMovies(request, response) {
  try {
    const searchQuery = request.query.searchQuery;
    const key = 'movies-' + searchQuery;
    console.log(key);

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1`;

    if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = await axios
        .get(url)
        .then(response => parseMovies(response.data));
    }

    // console.log(cache[key].data);
    response.status(200).send(cache[key].data);
    // return cache[key].data;
  } catch (err) {
    console.log(err);
  }
}

function parseMovies(moviesData) {
  try {
    console.log('MOVIESDATA');
    let moviesSummaries = moviesData.results.map(moviesData => {
      return new Films(moviesData.title, moviesData.poster_path);
    });
    return Promise.resolve(moviesSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = handleGetMovies;
