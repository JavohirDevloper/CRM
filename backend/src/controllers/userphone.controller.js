const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/UserPhone.js");

const registerAndLoginUser = async (req, res) => {
  try {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string(),
      date_of_birth: Joi.date(),
      phone_number: Joi.string().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      first_name,
      email,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email }).select("-password");
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      first_name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const registerUser = async (req, res) => {
  try {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string(),
      date_of_birth: Joi.date(),
      phone_number: Joi.string().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await registerAndLoginUser(req, res);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      date_of_birth,
      gender,
      phone_number,
      email,
      password,
    } = req.body;

    let updateData = {
      last_name,
      first_name,
      date_of_birth,
      gender,
      phone_number,
      email,
      password,
    };

    if (req.file) {
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      if (
        user.images !==
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      ) {
        fs.unlinkSync(user.images);
      }

      updateData.images = req.file.path;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    if (
      user.images !==
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      fs.unlinkSync(user.images);
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  registerAndLoginUser,
};
