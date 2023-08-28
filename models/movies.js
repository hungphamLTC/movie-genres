const mongoose = require('mongoose')
const Joi = require('joi');
const {genreSchema} = require('./genres')

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },

    genre:{
        type: genreSchema,
        required: true,
    },

    numberInStock:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}))

function validateMovie(movie, res){
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(), // require client API input, genreID is enough instead of a whole genre object
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
      });

    const validation = schema.validate(movie);

    if (validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }
}

exports.Movie = Movie; 
exports.validate = validateMovie;
