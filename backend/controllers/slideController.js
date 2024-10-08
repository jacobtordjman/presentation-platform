const Slide = require("../models/slide");
const Presentation = require("../models/presentation");

// Add a slide to a presentation
exports.addSlide = async (req, res) => {
  const { content } = req.body;

  try {
    const presentation = await Presentation.findOne({
      _id: req.params.presentationId,
    });
    if (!presentation)
      return res.status(404).json({ message: "Presentation not found" });

    const newSlide = new Slide({ content, presentationId: presentation._id });
    await newSlide.save();

    presentation.slidesIds.push(newSlide);
    await presentation.save();

    res.status(201).json(newSlide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a slide
exports.updateSlide = async (req, res) => {
  const { content } = req.body;

  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: "Slide not found" });

    slide.content = content;
    await slide.save();

    res.json(slide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a slide
exports.deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ message: "Slide not found" });

    await Presentation.updateMany(
      { slidesIds: slide._id },
      { $pull: { slidesIds: slide._id } }
    );

    res.json({ message: "Slide deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
