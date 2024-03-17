const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  courses_name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  courses_img: {
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
});

const Courses = mongoose.model("Courses", coursesSchema);

module.exports = Courses;
