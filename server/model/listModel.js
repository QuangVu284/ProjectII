const mongoose = require("mongoose");
const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Premier League", "Laliga", "Serie A", "Bundesliga"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.models.List || mongoose.model("List", ListSchema);
