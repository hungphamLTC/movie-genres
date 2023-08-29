const winston = require('winston');
require('express-async-errors');
const error = require('./middleware/error')
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
require('dotenv').config({ path: 'config/config.env' });
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

process.on('uncaughtException', (ex)=>{
    console.log('WE GOT AN UNCAUGHT EXCEPTION');
    winston.error(ex.message, ex);
})


const fileTransport = new winston.transports.File({ filename: 'logfile.log' });
winston.add(fileTransport);

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/movies')
    .then(() => console.log('MongoDB Connected...'))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers)
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to ${port}`));
