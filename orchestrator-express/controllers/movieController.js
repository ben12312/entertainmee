const axios = require('axios');
const baseUrl = 'http://localhost:4001'

class Controlller {
    static show(req, res) {
        axios({ method: 'GET', url: baseUrl })
            .then(movies => {
                res.status(200).json({
                    movies: movies.data
                })
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    }
    static create(req, res) {
        let newMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: []
        }
        axios({
            method: 'POST',
            url: baseUrl,
            data: newMovie
        })
            .then(() => {
                res.status(201).json({ message: 'success create movie ' + newMovie.title })
            })
            .catch(err => { res.status(400).json({ message: err.message }) })
    }
    static findOne(req, res) {
        const movieId = req.params.movie_id
        axios({
            method: 'GET',
            url: baseUrl + `/${movieId}`
        })
            .then(movie => {
                res.status(200).json({
                    movie: movie.data
                })
            })
            .catch(err => { res.status(404).json({ message: err.message }) })
    }
    static edit(req, res) {
        const movieId = req.params.movie_id
        const editedMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity
        }
        axios({
            method: 'PATCH',
            url: baseUrl + `/${movieId}`,
            data: editedMovie
        })
            .then(() => {
                res.status(200).json({
                    message: `success edit movie with title ${editedMovie.title}`
                })
            })
            .catch(err => { res.status(404).json({ message: err.message }) })
    }
    static delete(req, res) {
        const movieId = req.params.movie_id
        axios({
            method: 'DELETE',
            url: baseUrl + `/${movieId}`
        })
            .then(() => { res.status(200).json({ message: 'success delete movie' }) })
            .catch(err => { res.status(404).json({ message: err.message }) })
    }
}

module.exports = Controlller