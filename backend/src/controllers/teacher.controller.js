const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const superTeacher = await Teacher.findOne({ email });
    if (!superTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const passwordMatch = await bcrypt.compare(password, superTeacher.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: superTeacher._id, role: superTeacher.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "4d",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const createTeacher = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({ email, password: hashedPassword });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const Teachers = await Teacher.find().select("-password");
    res.json(Teachers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).select("-password");
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(4),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeacher = await Teacher.findByIdAndDelete(id, {
      is_deleted: true,
    });
    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res
      .status(200)
      .json({ message: "Teacher deleted successfully", deletedTeacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  login,
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
