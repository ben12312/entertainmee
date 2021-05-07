const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const router = require('./routes/router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => console.log(`running in port ${PORT}`));