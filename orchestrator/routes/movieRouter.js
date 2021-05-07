const movieRouter = require('express').Router();
const Controller = require('../controllers/movieController');

movieRouter.get('/', Controller.show);
movieRouter.post('/', Controller.create);
movieRouter.get('/:movie_id', Controller.findOne);
movieRouter.patch('/:movie_id', Controller.edit);
movieRouter.delete('/:movie_id', Controller.delete);

module.exports = movieRouter