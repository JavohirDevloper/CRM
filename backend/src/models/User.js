const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  date: {
    type: mongoose.SchemaTypes.Date,
  },
  purchasedCourses: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Courses",
    default: [],
  },
  role: {
    type: mongoose.SchemaTypes.String,
    default: "student",
  },
  is_deleted: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  devices: {
    type: [
      {
        ip: {
          type: String,
          required: true,
        },
        userAgent: String,
        deviceId: String,
      },
    ],
    default: [],
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };
