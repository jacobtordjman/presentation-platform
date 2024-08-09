const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const presentationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true, unique: true },
  authors: [String],
  dateOfPublishment: { type: Date, default: Date.now },
  slidesIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Slide",
    },
  ],
});

module.exports = mongoose.model("Presentation", presentationSchema);
