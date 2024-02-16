const mongoose = require("mongoose");

const coursesSchema = new mongoose.SchemaTypes({
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
    require: true,
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
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  continuity: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  module: {
    type: mongoose.sch
  }
});
