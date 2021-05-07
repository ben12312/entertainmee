const tvSeriesRouter = require('express').Router();
const Controller = require('../controllers/trSeriesController');

tvSeriesRouter.get('/', Controller.show);
tvSeriesRouter.post('/', Controller.create);
tvSeriesRouter.get('/:tvseries_id', Controller.findOne);
tvSeriesRouter.patch('/:tvseries_id', Controller.edit);
tvSeriesRouter.delete('/:tvseries_id', Controller.delete);

module.exports = tvSeriesRouter