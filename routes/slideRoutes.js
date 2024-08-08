const express = require('express');
const router = express.Router();
const slideController = require('../controllers/slideController');

router.post('/:title/slides', slideController.addSlide);
router.put('/:id', slideController.alterSlide);
router.delete('/:id', slideController.deleteSlide);

module.exports = router;
