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
      return res.status(404).json({ error: "File not found" });
    }
    res.json(updatedFile);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await File.findByIdAndDelete(id, { is_deleted: true });
    if (!deletedAdmin) {
      return res.status(404).json({ error: "File not found" });
    }
    res.status(200).json({ message: deletedAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const streamFile = (req, res) => {
  const { filename } = req.params;
  const filePath = "./videos/" + filename;
  const stat = fs.statSync(filePath);
  let fileSize = stat.size;

  const reductionFactor = 0.5;
  fileSize = Math.floor(fileSize * reductionFactor);

  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
};
module.exports = {
  createFile,
  getFileByID,
  updateFile,
  deleteFile,
  upload,
  getAllFile,
  streamFile,
};
