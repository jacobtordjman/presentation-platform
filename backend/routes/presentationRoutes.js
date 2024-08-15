const express = require("express");
const router = express.Router();
const presentationController = require("../controllers/presentationController");

router.post("/", presentationController.createPresentation);
router.get("/:id", presentationController.getPresentationById);
router.get("/", presentationController.getAllPresentations);
router.put("/:id/authors", presentationController.updateAuthorsList);
router.delete("/:id", presentationController.deletePresentationById);

module.exports = router;
