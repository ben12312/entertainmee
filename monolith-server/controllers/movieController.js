const Movie = require('../models/movieModel');

class Controller {
    // FINDALL
    static async show(req, res) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    // CREATE
    static async create(req, res) {
        const newMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: []
        }
        try {
            await Movie.create(newMovie)
            res.status(201).json({ message: 'success added' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    // FIND ONE
    static async findOne(req, res) {
        const movie_id = req.params.movie_id
        try {
            const foundMovie = await Movie.findOne(movie_id)
            res.status(200).json(foundMovie)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    // EDIT
    static async edit(req, res) {
        const movie_id = req.params.movie_id
        const editedMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity
        }
        try {
            await Movie.editMovie(movie_id, editedMovie)
            res.status(200).json({ message: 'success edited' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    // DELETE
    static async delete(req, res) {
        const movie_id = req.params.movie_id
        try {
            await Movie.delete(movie_id)
            res.status(200).json({ message: 'success delete' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

module.exports = Controller