const { movieDatabase } = require('../config/mongoDb');
// REQUIRE FOR MONGO ID
const { ObjectId } = require('mongodb')

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
        return movieDatabase().collection('movies').findOne({ _id: ObjectId(id) })
    }
    // Edit movie
    static editMovie(id, editedMovie) {
        return movieDatabase().collection('movies').updateOne({ _id: ObjectId(id) }, { $set: editedMovie })
    }
    // Delete movie
    static delete(id) {

        return movieDatabase().collection('movies').deleteOne({ _id: ObjectId(id) })
    }
}

module.exports = Movie