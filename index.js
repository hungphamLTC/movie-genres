const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
require('dotenv').config({ path: 'config/config.env' });
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals')
const app = express();

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/movies')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('Cound not connect to MongoDB'))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers)
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to ${port}`));
