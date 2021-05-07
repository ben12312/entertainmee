const TvSeries = require('../models/tvSeriesModel');

class Controller {
    // FINDALL
    static async show(req, res) {
        try {
            const tvSeries = await TvSeries.find()
            res.status(200).json(tvSeries)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    // CREATE
    static async create(req, res) {
        const newTvSeries = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: []
        }
        try {
            await TvSeries.create(newTvSeries)
            res.status(201).json({ message: 'success added' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    // FIND ONE
    static async findOne(req, res) {
        const tvseries_id = req.params.tvseries_id
        try {
            const foundTvSeries = await TvSeries.findOne(tvseries_id)
            res.status(200).json(foundTvSeries)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    // EDIT
    static async edit(req, res) {
        const tvseries_id = req.params.tvseries_id
        const editedTvSeries = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity
        }
        try {
            await TvSeries.edit(tvseries_id, editedTvSeries)
            res.status(200).json({ message: 'success edited' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    // DELETE
    static async delete(req, res) {
        const tvseries_id = req.params.tvseries_id
        try {
            await TvSeries.delete(tvseries_id)
            res.status(200).json({ message: 'success delete' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

module.exports = Controller