const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 50
    }
}));

router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('The genre with given ID was not found');

    res.send(genre)
});

router.post('/', async(req,res) =>{

    //Input validation
    validateGenre(req.body, res);

    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async(req, res) => {
    validateGenre(req.body, res);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    })
    if(!genre) return res.status(404).send('The genre with given ID was not found');

    res.send(genre);
});

router.delete('/:id', async(req, res) =>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('The genre with given ID was not found');
    res.send(genre);
});

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

module.exports = router;