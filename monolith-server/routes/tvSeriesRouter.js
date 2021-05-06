const Controller = require('../controllers/tvSeriesController');
const tvSeriesRouter = require('express').Router();
const { connect } = require('../config/tvSeriesDb');

tvSeriesRouter.get('/', Controller.show);
tvSeriesRouter.post('/', Controller.create);
tvSeriesRouter.get('/:tvseries_id', Controller.findOne);
tvSeriesRouter.patch('/:tvseries_id', Controller.edit);
tvSeriesRouter.delete('/:tvseries_id', Controller.delete);

connect()
    .then(() => {
        console.log('conencted to TV-Series DB');
    })

module.exports = tvSeriesRouter