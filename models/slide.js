const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slideSchema = new Schema({
  content: { type: String, required: true },
  presentationId: {
    type: Schema.Types.ObjectId,
    ref: "Presentation",
    required: true,
  },
});

module.exports = mongoose.model("Slide", slideSchema);
