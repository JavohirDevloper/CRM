const Videos = require("../models/Videos");
const Joi = require("joi");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./videos/");
  },
  filename: function (req, file, cb) {
    const trimmedFileName = file.originalname.replace(/\s+/g, "").toLowerCase();
    cb(null, Date.now() + "_" + trimmedFileName);
  },
});

const videosFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Faqat video fayllariga ruxsat beriladi!"), false);
  }
};

const upload = multer({
  storage: storage,
  videosFilter: videosFilter,
}).single("videos");

const fileValidationSchema = Joi.object({
  name: Joi.string().required(),
  type_video: Joi.string(),
});

const createVideos = async (req, res) => {
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
        return res.status(400).json({ error: "Videos is required" });
      }

      const fileData = {
        name: req.body.name,
        videos: "/" + req.file.path,
        type_video: req.body.type_video,
      };

      const file = new Videos(fileData);

      try {
        const savedFile = await file.save();
        res.status(201).json(savedFile);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

const getAllVideos = async (req, res) => {
  try {
    const files = await Videos.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLastViewedVideo = async (req, res) => {
  try {
    const { userId, videoId } = req.body;

    const updatedVideo = await Videos.findOneAndUpdate(
      { _id: videoId },
      { $set: { lastViewedBy: userId } }
    ).populate("lastViewedBy");

    if (!updatedVideo) {
      res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const ArchiveStatusTrue = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedVideo = await Videos.findByIdAndUpdate(
      id,
      { $set: { archived: true } },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ArchiveStatusFalse = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedVideo = await Videos.findByIdAndUpdate(
      id,
      { $set: { archived: false } },
      { new: true }
    );

    if (!updatedVideo) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVideosByID = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await Videos.findById(id);
    if (!file) {
      return res.status(404).json({ error: "Videos not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatedVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFile = await Videos.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedFile) {
      return res.status(404).json({ error: "Videos not found" });
    }
    res.json(updatedFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Videos.findByIdAndDelete(id, {
      is_deleted: true,
    });
    if (!deletedVideo) {
      return res.status(404).json({ error: "Videos notfound" });
    }
    fs.unlinkSync(deletedVideo.videos);
    res.json({ message: "Videos deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVideos,
  getAllVideos,
  updateLastViewedVideo,
  ArchiveStatusTrue,
  ArchiveStatusFalse,
  getVideosByID,
  updatedVideo,
  deleteVideos,
};
