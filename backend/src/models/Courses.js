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
  title: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  tip: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  number_of_lessons: {
    type: mongoose.SchemaTypes.String,
    default: Date.now(),
  },
  continuity: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  module: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  stars: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    max: 5,
    min: 1,
  },
  user_ref_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Courses = mongoose.model("Courses", coursesSchema);

module.exports = Courses;
