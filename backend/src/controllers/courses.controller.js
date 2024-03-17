const Courses = require("../models/Courses");
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

const upload = multer({
  storage: storage,
}).single("images");

const createCourse = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ error: "File is required" });
      }
      console.log(req.file);
      const coursesData = {
        images: req.file.path,
        courses_name: req.body.courses_name,
        category: req.body.category,
        description: req.body.description,
        module: req.body.module,
        number_of_lessons: req.body.number_of_lessons,
      };

      const courses = new Courses(coursesData);

      try {
        const savedCourses = await courses.save();
        res.status(201).json(savedCourses);
      } catch (error) {
        res.status(500).json({ error });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourses = await Courses.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCourses) {
      return res.status(404).json({ error: "Courses not found" });
    }
    res.json(updatedCourses);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourses = await Courses.findByIdAndDelete(id, {
      is_deleted: true,
    });
    if (!deletedCourses) {
      return res.status(404).json({ error: "Courses not found" });
    }
    res
      .status(200)
      .json({ message: "Courses deleted successfully", deletedCourses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createCourse,
  getCourseById,
  getAllCourses,
  updateCourseById,
  deleteCourseById,
  upload,
};
