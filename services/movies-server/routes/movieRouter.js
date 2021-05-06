const Controller = require('../controllers/movieController');
const router = require('express').Router();

router.get('/', Controller.show);
router.post('/', Controller.create);
router.get('/:movie_id', Controller.findOne);
router.patch('/:movie_id', Controller.edit);
router.delete('/:movie_id', Controller.delete);

module.exports = router