const mongoose = require("mongoose");

const UserEmailSchema = new mongoose.Schema(
  {
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
      default: "students",
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
  }
);

const UserEmail = mongoose.model("UserEmail", UserEmailSchema);
module.exports = UserEmail;
