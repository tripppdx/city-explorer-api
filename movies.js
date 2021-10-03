'use strict';

// IMPORTS
const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

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
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1`;

    const moviesResponse = await axios.get(url);
    // console.log(moviesResponse.data);
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
}

module.exports = handleGetMovies;
