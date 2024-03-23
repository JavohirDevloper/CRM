const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const registerAdmin = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email }).select("-password");
    if (existingAdmin) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });
    const savedAdmin = await newAdmin.save();

    res.status(201).json({ admin: savedAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const superAdmin = await Admin.findOne({ email });
    if (!superAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const passwordMatch = await bcrypt.compare(password, superAdmin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: superAdmin._id, role: superAdmin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, filter } = req.query;

    const query = Admin.find().select("-password");

    if (sort) {
      const sortFields = sort.split(",");
      query.sort(sortFields.join(" "));
    }

    if (filter) {
      const filterFields = filter.split(",");
      filterFields.forEach((field) => {
        const [key, value] = field.split(":");
        query.where(key).equals(value);
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCount = await Admin.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    query.skip(startIndex).limit(limit);

    const admin = await query;

    const response = {
      data: admin,
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

const getFindById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAdmin = async (req, res) => {
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

    const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );
    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res
      .status(200)
      .json({ message: "Admin deleted successfully", deletedAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  registerAdmin,
  loginAdmin,
  createAdmin,
  getAllAdmins,
  getFindById,
  updateAdmin,
  deleteAdmin,
};
