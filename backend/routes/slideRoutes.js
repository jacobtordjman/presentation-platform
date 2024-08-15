const express = require("express");
const router = express.Router();
const slideController = require("../controllers/slideController");

router.post("/:presentationId/slides", slideController.addSlide);
router.put("/:id", slideController.updateSlide);
router.delete("/:id", slideController.deleteSlide);

module.exports = router;
