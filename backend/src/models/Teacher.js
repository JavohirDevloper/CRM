const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.SchemaTypes.String,
      unique: true,
      required: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["admin", "teacher"],
      default: "teacher",
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
