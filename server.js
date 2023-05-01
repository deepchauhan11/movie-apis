const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/movies').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
});

// Define the Movie schema
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true }
});

// Define the Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.delete('/movies/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            res.send({ message: "Movie deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete movie with id " + req.params.id
            });
        });
});

app.put('/movies/:id', (req, res) => {
    if (!req.body.name || !req.body.genre || !req.body.year) {
        return res.status(400).send({
            message: "Movie content cannot be empty"
        });
    }

    Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        genre: req.body.genre,
        year: req.body.year
    }, { new: true })
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: "Could not update movie with id " + req.params.id
            });
        }
    });

    return res.send({ message: "Movie updated successfully!" });
});

// Search movies by name
app.get('/movies/search', (req, res) => {
    const name = req.query.name;
    const query = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Movie.find(query)
        .then(movies => {
            res.send(movies);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving movies."
            });
        });
});


// get movie by id
app.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            if (!movie) {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            res.send(movie);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Movie not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving movie with id " + req.params.id
            });
        });
});


// get all movies
app.get('/movies', (req, res) => {
  Movie.find().maxTimeMS(30000).then((movies) => {
    res.json(movies);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

// post a single movie
app.post('/movies', (req, res) => {
  const movie = new Movie(req.body);
  movie.save().then(() => {
    res.send('Movie created successfully');
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
