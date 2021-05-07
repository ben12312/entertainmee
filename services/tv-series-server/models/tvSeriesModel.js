const { tvSeriesDatabase } = require('../config/tvSeriesDb');
const { ObjectId } = require('mongodb')

class TvSeries {
    // findALL tv-series
    static find() {
        return tvSeriesDatabase().collection('tv-series').find().toArray()
    }
    // Add tv-series
    static create(newTvSeries) {
        return tvSeriesDatabase().collection('tv-series').insertOne(newTvSeries)
    }
    // FindOne tv-series
    static findOne(id) {
        return tvSeriesDatabase().collection('tv-series').findOne({ _id: ObjectId(id) })
    }
    // Edit tv-series
    static edit(id, editedTvSeries) {
        return tvSeriesDatabase().collection('tv-series').updateOne({ _id: ObjectId(id) }, { $set: editedTvSeries })
    }
    // Delete tv-series
    static delete(id) {
        return tvSeriesDatabase().collection('tv-series').deleteOne({ _id: ObjectId(id) })
    }
}

module.exports = TvSeries