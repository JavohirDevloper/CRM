const express = require("express");
const coursesController = require("../controllers/courses.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const router = express.Router();

router.post("/courses", hasRole(["admin"]), coursesController.createCourse);
router.get("/courses", hasRole(["admin", "teacher", "students"]),coursesController.getAllCourses);
router.get("/courses/:id", hasRole(["admin", "teacher", "students"]),coursesController.getCourseById);
router.put("/courses/:id",hasRole(["admin"]), coursesController.updateCourseById);
router.delete("/courses/:id", hasRole(["admin"]),coursesController.deleteCourseById);

module.exports = router;
