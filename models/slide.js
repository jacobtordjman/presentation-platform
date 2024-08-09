const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slideSchema = new Schema({
  content: { type: String, required: true },
  presentation: {
    type: Schema.Types.ObjectId,
    ref: "Presentation",
    required: true,
  },
});

module.exports = mongoose.model("Slide", slideSchema);
