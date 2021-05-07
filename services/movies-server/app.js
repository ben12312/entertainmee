const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require('cors');
const { connect } = require('./config/movieDb');
const router = require('./routes/movieRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

connect()
    .then(() => {
        console.log('conencted from movieDb');
        app.listen(PORT, () => console.log('server is running in port ' + PORT))
    })

