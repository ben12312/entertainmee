const { movieDatabase } = require('../config/movieDb');

class Movie {
    // findALL Movies
    static find() {
        return movieDatabase().collection('movies').find().toArray()
    }
    // Add movie
    static create(newMovies) {
        return movieDatabase().collection('movies').insertOne(newMovies)
    }
    // FindOne movie
    static findOne(id) {
        return movieDatabase().collection('movies').findOne({ _id: id })
    }
    // Edit movie
    static editMovie(id, editedMovie) {
        return movieDatabase().collection('movies').updateOne({ _id: id }, { $set: editedMovie })
    }
    // Delete movie
    static delete(id) {
        return movieDatabase().collection('movies').deleteOne({ _id: id })
    }
}

module.exports = Movie