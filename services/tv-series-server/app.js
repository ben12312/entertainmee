const express = require('express');
const app = express();
const PORT = process.env.PORT || 4002;
const cors = require('cors');
const { connect } = require('./config/tvSeriesDb');
const router = require('./routes/tvSeriesRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

connect()
    .then(() => {
        console.log('conencted to TV-Series DB');
        app.listen(PORT, () => console.log('server is running in port ' + PORT))
    })

