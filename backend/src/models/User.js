const mongoose = require("mongoose");

const UserEmailSchema = new mongoose.Schema({
  first_name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  last_name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  images: {
    type: mongoose.SchemaTypes.String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  gender: {
    type: mongoose.SchemaTypes.Boolean,
    enum: ["male", "female"],
  },
  role: {
    type: mongoose.SchemaTypes.String,
    default: "student",
  },
  is_deleted: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
});

const UserEmail = mongoose.model("User", UserEmailSchema);
module.exports = UserEmail;
