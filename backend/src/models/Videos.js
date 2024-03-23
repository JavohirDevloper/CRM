const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  videos: {
    type: [mongoose.SchemaTypes.String],
    required: true,
  },
  type_video: {
    type: mongoose.SchemaTypes.String,
    enum: ["mp4", "mp3"],
    default: "mp4",
  },
  archived: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  lastViewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Videos = mongoose.model("Videos", videoSchema);
module.exports = Videos;
