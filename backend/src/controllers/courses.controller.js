const Courses = require("../models/Courses");
const multer = require("multer");
const { User } = require("../models/User");

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

const MyCourses = async (req, res) => {
  try {
    const user = req.user;
    const courses = await Courses.find({
      _id: { $in: user.purchasedCourses },
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = req.user;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const paymentIntent = await createPaymentIntent({
      amount: course.price,
      currency: "usd",
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing purchase" });
  }
};

const updatePurchasedCourses = async (userId, courseId) => {
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $push: { purchasedCourses: courseId },
    });
    console.log("Course purchased successfully for user:", user.email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find({ is_deleted: false });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFilteredCourses = async (req, res) => {
  try {
    const category = req.query.category;
    const courses = await Courses.find({
      category: category,
      is_deleted: false,
    });
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
    const courses = await Courses.findById(id);
    if (!courses) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (req.file) {
      courses.images = req.file.path;
    }

    courses.courses_name = req.body.courses_name || courses.courses_name;
    courses.category = req.body.category || courses.category;
    courses.description = req.body.description || courses.description;
    courses.module = req.body.module || courses.module;
    courses.number_of_lessons =
      req.body.number_of_lessons || courses.number_of_lessons;

    const updatedCourse = await courses.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  MyCourses,
  purchaseCourse,
  updatePurchasedCourses,
  createCourse,
  getCourseById,
  getAllCourses,
  getFilteredCourses,
  updateCourseById,
  deleteCourseById,
  upload,
};
