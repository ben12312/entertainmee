const { MongoClient } = require('mongodb');

let tvSeriesDb = null

async function connect() {
    try {
        const url = 'mongodb://localhost:27017'
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        })

        await client.connect()
        const database = await client.db('tv-series')
        tvSeriesDb = database
        return database
    } catch (error) {
        console.log(err);
    }
}

function tvSeriesDatabase() {
    return tvSeriesDb
}

module.exports = { connect, tvSeriesDatabase }