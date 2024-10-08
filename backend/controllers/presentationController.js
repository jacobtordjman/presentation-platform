// Import necessary models
const mongoose = require("mongoose");
const Presentation = require("../models/presentation");
const Slide = require("../models/slide");

// src/controllers/presentationController.js

exports.createPresentation = async (req, res) => {
  const { title, authors } = req.body;

  try {
    // Check if a presentation with the same title already exists
    const existingPresentation = await Presentation.findOne({ title });
    if (existingPresentation) {
      return res.status(400).json({ message: "A presentation with this title already exists." });
    }

    const newPresentation = new Presentation({ title, authors });
    await newPresentation.save();

    res.status(201).json(newPresentation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create presentation." });
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

// Update the entire presentation
exports.updatePresentation = async (req, res) => {
  const { title, authors, slidesIds } = req.body;

  try {
    const presentation = await Presentation.findOne({ _id: req.params.id });
    if (!presentation) {
      return res.status(404).json({ message: "Presentation not found" });
    }

    if (title !== undefined) {
      presentation.title = title;
    }

    if (authors !== undefined) {
      presentation.authors = authors;
    }

    if (slidesIds !== undefined) {
      presentation.slidesIds = slidesIds;
    }

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
