'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const foods = require('./data.json');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('I am home at last!');
});

app.get('/foods', (request, response) => {
  const veg = request.query.veg === 'true';

  const firstVeggy = foods.find(food => food.vegetarian === veg);

  response.send(firstVeggy);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
