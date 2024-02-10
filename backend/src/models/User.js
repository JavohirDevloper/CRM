const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    last_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    gender: {
      type: mongoose.SchemaTypes.Boolean,
      enum: ["male", "female"],
    },
    date_of_birth: {
      type: mongoose.SchemaTypes.Date,
      required: true,
      default: new Date(),
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    phone_number: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    images: {
      type: mongoose.SchemaTypes.String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    email: {
      type: mongoose.SchemaTypes.String,
      unique: true,
      required: true,
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["user", "admin", "students"],
      default: "user",
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
