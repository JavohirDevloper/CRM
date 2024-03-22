const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    type: mongoose.SchemaTypes.String,
    enum: ["male", "female"],
    default: "male",
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

const User = mongoose.model("User", UserSchema);
module.exports = {User};
