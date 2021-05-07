const router = require('express').Router();
const movieRouter = require('./movieRouter');
const tvSeriesRouter = require('./tvSeriesRouter');

router.use('/movie', movieRouter);
router.use('/tv-series', tvSeriesRouter);

module.exports = router