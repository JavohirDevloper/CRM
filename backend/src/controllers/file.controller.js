const File = require("../models/File");
const Joi = require("joi");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./videos/");
  },
  filename: function (req, file, cb) {
    const trimmedFileName = file.originalname.replace(/\s+/g, "").toLowerCase();
    cb(null, Date.now() + "_" + trimmedFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Faqat video fayllariga ruxsat beriladi!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("videos");

const fileValidationSchema = Joi.object({
  name: Joi.string().required(),
  type_file: Joi.string(),
});

const createFile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { error } = fileValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      console.log(req.body);
      if (!req.file) {
        return res.status(400).json({ error: "File is required" });
      }

      const fileData = {
        name: req.body.name,
        file: "/" + req.file.path,
        type_file: req.body.type_file,
      };

      const file = new File(fileData);

      try {
        const savedFile = await file.save();
        res.status(201).json(savedFile);
      } catch (error) {
        res.status(500).json({ error });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

const getAllFile = async (req, res) => {
  try {
    const file = await File.find();
    res.json(file);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getFileByID = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFile = await File.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedFile) {
      return res.status(404).json({ error });
    }
    res.json(updatedFile);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteFile = async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports = {
  createFile,
  getFileByID,
  updateFile,
  deleteFile,
  upload,
  getAllFile,
};
