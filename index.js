// MODULE IMPORT
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//DATA
const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 3, name: 'Animation' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Crime' }
];

//HTTP GET

app.get('/', (req, res) =>{
    res.send('Welcome to Movie Genres')
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    if(!genre) res.status(404).send('The genre with given ID was not found');
    res.send(genre)
});

//HTTP POST
app.post('/api/genres', (req,res) =>{

    //Input validation
    validateGenre(req.body, res);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

//HTTP PUT
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('The genre with given ID was not found');

    validateGenre(req.body, res);
    genre.name = req.body.name;
    res.send(genre);
});


//HTTP DELETE
app.delete('/api/genres/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) res.status(404).send('The genre with given ID was not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genres);
})

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

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to ${port}`));