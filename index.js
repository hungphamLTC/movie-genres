const mongoose = require('mongoose');

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/movies')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('Cound not connect to MongoDB'))

require('dotenv').config({ path: 'config/config.env' });
const express = require('express');
const genres = require('./routes/genres');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to ${port}`));
