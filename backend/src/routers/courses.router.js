const express = require("express");
const coursesController = require("../controllers/courses.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const router = express.Router();

router.post("/courses",isLoggedIn, hasRole(["admin"]), coursesController.createCourse);
router.get("/courses",isLoggedIn, hasRole(["admin", "teacher", "students"]),coursesController.getAllCourses);
router.get("/courses/:id",isLoggedIn, hasRole(["admin", "teacher", "students"]),coursesController.getCourseById);
router.put("/courses/:id",isLoggedIn, hasRole(["admin"]), coursesController.updateCourseById);
router.delete("/courses/:id",isLoggedIn, hasRole(["admin"]),coursesController.deleteCourseById);

module.exports = router;
