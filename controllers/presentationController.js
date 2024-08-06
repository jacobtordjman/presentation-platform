// Import necessary models
const Presentation = require('../models/presentation');
const Slide = require('../models/slide');

// Create a new presentation
exports.createPresentation = async (req, res) => {
  const { title, authors } = req.body;

  try {
    const newPresentation = new Presentation({ title, authors });
    await newPresentation.save();
    res.status(201).json(newPresentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a presentation by title
exports.getPresentationByTitle = async (req, res) => {
  try {
    const presentation = await Presentation.findOne({ title: req.params.title }).populate('slides');
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });
    res.json(presentation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all presentations
exports.getAllPresentations = async (req, res) => {
  try {
    const presentations = await Presentation.find().populate('slides');
    res.json(presentations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Alter the authors list
exports.alterAuthorsList = async (req, res) => {
  const { authors } = req.body;

  try {
    const presentation = await Presentation.findOne({ title: req.params.title });
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });

    presentation.authors = authors;
    await presentation.save();

    res.json(presentation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a presentation
exports.deletePresentation = async (req, res) => {
  try {
    const presentation = await Presentation.findOneAndDelete({ title: req.params.title });
    if (!presentation) return res.status(404).json({ message: 'Presentation not found' });

    await Slide.deleteMany({ presentation: presentation._id });

    res.json({ message: 'Presentation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
