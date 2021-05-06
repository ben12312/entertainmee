const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
// const { connect } = require('./config/mongoDb');
const router = require('./routes/router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)

app.listen(PORT, () => console.log('server is running in port ' + PORT))
