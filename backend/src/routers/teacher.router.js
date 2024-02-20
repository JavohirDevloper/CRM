const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teacher.controller");
// const isLoggedIn = require("../shared/auth/isLoggedIn");

// Teacher login
router.post("/teacher/login", TeacherController.TeacherLogin);

// Teacher
router.post("/teacher", TeacherController.createTeacher);
router.get("/teacher", TeacherController.getAllTeachers);
router.put("/teacher/:id", TeacherController.updateTeacher);
router.delete("/teacher/:id", TeacherController.deleteTeacher);

module.exports = router;
