const Controller = require('../controllers/tvSeriesController');
const router = require('express').Router();

router.get('/', Controller.show);
router.post('/', Controller.create);
router.get('/:tvseries_id', Controller.findOne);
router.patch('/:tvseries_id', Controller.edit);
router.delete('/:tvseries_id', Controller.delete);

module.exports = router