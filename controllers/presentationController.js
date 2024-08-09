// Import necessary models
const mongoose = require("mongoose");
const Presentation = require("../models/presentation");
const Slide = require("../models/slide");

// Create a new presentation
exports.createPresentation = async (req, res) => {
  const { title, authors } = req.body;

  try {
    const presentationByTitle = await Presentation.findOne({
      title
    });

    // If a presentation with the same title exists, send a conflict response
    if (presentationByTitle) {
      throw Error("Presentation with this title already exists.");
    }
    
    const newPresentation = new Presentation({
      _id: new mongoose.Types.ObjectId(),
      title,
      authors,
    });
    await newPresentation.save();
    res.status(201).json(newPresentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a presentation by id
exports.getPresentationById = async (req, res) => {
  try {
    const presentation = await Presentation.findOne({
      _id: req.params.id,
    }).populate("slidesIds");
    if (!presentation)
      return res.status(404).json({ message: "Presentation not found" });
    res.json(presentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all presentations
exports.getAllPresentations = async (req, res) => {
  try {
    const presentations = await Presentation.find().populate("slidesIds");
    res.json(presentations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the authors list
exports.updateAuthorsList = async (req, res) => {
  const { authors } = req.body;

  try {
    const presentation = await Presentation.findOne({ _id: req.params.id });
    if (!presentation)
      return res.status(404).json({ message: "Presentation not found" });

    presentation.authors = authors;
    await presentation.save();

    res.json(presentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a presentation
exports.deletePresentationById = async (req, res) => {
  try {
    const presentation = await Presentation.findOneAndDelete({
      _id: req.params.id,
    });
    if (!presentation)
      return res.status(404).json({ message: "Presentation not found" });

    await Slide.deleteMany({ presentationId: presentation._id });

    res.json({ message: "Presentation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
