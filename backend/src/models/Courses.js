const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  courses_name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  images: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  category: {
    type: [mongoose.SchemaTypes.String],
    required: true,
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  number_of_lessons: {
    type: mongoose.SchemaTypes.String,
    default: Date.now(),
  },
  module: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  is_deleted: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
});

const Courses = mongoose.model("Courses", coursesSchema);

module.exports = Courses;
