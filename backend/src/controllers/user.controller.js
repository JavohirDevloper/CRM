const Joi = require("joi");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { User } = require("../models/User.js");

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      devices: [
        {
          ip,
          userAgent,
        },
      ],
    });

    const savedUser = await newUser.save();
    res.status(201).json({ user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (!hashedPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1w" }
    );

    res.status(200).json({ token, devices: user.devices });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, filter } = req.query;

    const query = User.find().select("-password");

    // Sort
    if (sort) {
      const sortFields = sort.split(",");
      query.sort(sortFields.join(" "));
    }

    // Filter
    if (filter) {
      const filterFields = filter.split(",");
      filterFields.forEach((field) => {
        const [key, value] = field.split(":");
        query.where(key).equals(value);
      });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await User.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    query.skip(startIndex).limit(limit);

    const users = await query;

    const response = {
      data: users,
      page,
      limit,
      totalPages,
      totalCount,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMe = async (req, res) => {
  try {
    const me = req.user;
    const user = await User.findById(me._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const updateUserMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { first_name, last_name, email, password } = req.body;

    let updateData = {
      last_name,
      first_name,
      email,
      password,
    };

    if (req.file) {
      const user = await User.findById(userId);
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

    const user = await User.findByIdAndUpdate(userId, updateData, {
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
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;

    let updateData = {
      last_name,
      first_name,
      email,
      password,
    };

    if (req.file) {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      }
      if (
        user.images !==
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      ) {
        fs.unlinkSync(user.images);
      }

      updateData.images = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { updateData },
      { new: true },
      { runValidators: true }
    );
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteUserMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { is_deleted: true },
      { new: true }
    );
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(
      id,
      { is_deleted: true },
      { new: true }
    );
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  createUser,
  getAllUser,
  getUserById,
  getUserMe,
  updateUser,
  updateUserMe,
  deleteUser,
  deleteUserMe,
};
