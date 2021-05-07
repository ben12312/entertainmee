const axios = require('axios');
const baseUrl = 'http://localhost:4002'

class Controlller {
    static show(req, res) {
        axios({ method: 'GET', url: baseUrl })
            .then(tvSeries => {
                res.status(200).json({
                    tvSeries: tvSeries.data
                })
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    }
    static create(req, res) {
        let newTvSeries = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: []
        }
        axios({
            method: 'POST',
            url: baseUrl,
            data: newTvSeries
        })
            .then(() => {
                res.status(201).json({ message: 'success create TV-Series ' + newTvSeries.title })
            })
            .catch(err => { res.status(400).json({ message: err.message }) })
    }
    static findOne(req, res) {
        const tvSeriesId = req.params.tvseries_id
        axios({
            method: 'GET',
            url: baseUrl + `/${tvSeriesId}`
        })
            .then(tvSeries => {
                res.status(200).json({
                    tvSeries: tvSeries.data
                })
            })
            .catch(err => { res.status(404).json({ message: err.message }) })
    }
    static edit(req, res) {
        const tvSeriesId = req.params.tvseries_id
        const editedTvSeries = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity
        }
        axios({
            method: 'PATCH',
            url: baseUrl + `/${tvSeriesId}`,
            data: editedTvSeries
        })
            .then(() => {
                res.status(200).json({
                    message: `success edit TV Series with title ${editedTvSeries.title}`
                })
            })
            .catch(err => { res.status(404).json({ message: err.message }) })
    }
    static delete(req, res) {
        const tvSeriesId = req.params.tvseries_id
        axios({
            method: 'DELETE',
            url: baseUrl + `/${tvSeriesId}`
        })
            .then(() => { res.status(200).json({ message: 'success delete TV Series' }) })
            .catch(err => { res.status(404).json({ message: err.message }) })
    }
}

module.exports = Controlller