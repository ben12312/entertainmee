const Controller = require('../controllers/movieController');
const movieRouter = require('express').Router();
const { connect } = require('../config/mongoDb');

movieRouter.get('/', Controller.show);
movieRouter.post('/', Controller.create);
movieRouter.get('/:movie_id', Controller.findOne);
movieRouter.patch('/:movie_id', Controller.edit);
movieRouter.delete('/:movie_id', Controller.delete);

connect()
    .then(() => {
        console.log('conencted to Movie DB');
    })

module.exports = movieRouter