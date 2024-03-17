const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  file: {
    type: [mongoose.SchemaTypes.String],
  },
  type_file: {
    type: mongoose.SchemaTypes.String,
    enum: ["mp4", "mp3"],
    default: "mp4",
  },
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
