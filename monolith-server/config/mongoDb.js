const { MongoClient } = require('mongodb');

let movieDb = null

async function connect() {
    try {
        const url = 'mongodb://localhost:27017'
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        })

        await client.connect()
        const database = await client.db('movies')
        movieDb = database
        return database
    } catch (error) {
        console.log(err);
    }
}

function movieDatabase() {
    return movieDb
}

module.exports = { connect, movieDatabase }