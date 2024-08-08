const express = require('express');
const router = express.Router();
const presentationController = require('../controllers/presentationController');

router.post('/', presentationController.createPresentation);
router.get('/:title', presentationController.getPresentationByTitle);
router.get('/', presentationController.getAllPresentations);
router.put('/:title/authors', presentationController.alterAuthorsList);
router.delete('/:title', presentationController.deletePresentation);

module.exports = router;
