const Joi = require('joi');
const mongoose = require('mongoose')

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 50
    }
}));

//validate function
function validateGenre(genre, res){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const validation = schema.validate(genre);

    if (validation.error){
        res.status(400).send(validation.error.details[0].message);
        return;
    }
}

exports.Genre = Genre;
exports.validate = validateGenre;