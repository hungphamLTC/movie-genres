//const {Rental, validate} = require('../models/rentals'); 
const {Rental} = require('../models/rentals'); 
// const {Movie} = require('../models/movies'); 
// const {Customer} = require('../models/customer'); 
//const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

//Fawn.init('mongodb://127.0.0.1:27017/movies')

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

// router.post('/', async (req, res) => {
//   try {
//     validate(req.body, res); // Validate the request body

//     // Lookup the customer by customerId
//     const customer = await Customer.findById(req.body.customerId);
//     if (!customer) return res.status(400).send('Invalid customer.');

//     // Lookup the movie by movieId
//     const movie = await Movie.findById(req.body.movieId);
//     if (!movie) return res.status(400).send('Invalid movie.');

//     // Check if the movie is in stock
//     if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

//     // Create a new rental
//     let rental = new Rental({
//       customer: {
//         _id: customer._id,
//         name: customer.name,
//         phone: customer.phone
//       },
//       movie: {
//         _id: movie._id,
//         title: movie.title,
//         dailyRentalRate: movie.dailyRentalRate
//       }
//     });

//     // Use Fawn to perform the transaction (save rental and update movie stock)
//     try {
//       new Fawn.Task()
//         .save('rentals', rental)
//         .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
//         .run();

//       // Send the rental object as a response
//       res.send(rental);
//     } catch (ex) {
//       // Handle any errors that occur during the transaction
//       res.status(500).send('Something failed during the transaction.');
//     }
//   } catch (ex) {
//     // Handle validation errors
//     res.status(400).send(ex.message); // Send the validation error message
//   }
// });

// router.post('/', async (req, res) => {
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     await client.connect();

//     const session = client.startSession();
//     session.startTransaction();

//     try {
//       const { error } = validate(req.body); 
//       if (error) return res.status(400).send(error.details[0].message);

//       const customer = await Customer.findById(req.body.customerId);
//       if (!customer) throw new Error('Invalid customer.');

//       const movie = await Movie.findById(req.body.movieId);
//       if (!movie) throw new Error('Invalid movie.');

//       if (movie.numberInStock === 0) throw new Error('Movie not in stock.');

//       const rental = new Rental({
//         customer: {
//           _id: customer._id,
//           name: customer.name,
//           phone: customer.phone,
//         },
//         movie: {
//           _id: movie._id,
//           title: movie.title,
//           dailyRentalRate: movie.dailyRentalRate,
//         },
//       });

//       await rental.save();
//       movie.numberInStock--;

//       await rental.save();
//       await movie.save();

//       await session.commitTransaction();
//       session.endSession();

//       res.send(rental);
//     } catch (ex) {
//       await session.abortTransaction();
//       session.endSession();
//       throw ex;
//     }
//   } finally {
//     client.close();
//   }
// });

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 