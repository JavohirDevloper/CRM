const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teacher.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");

// teacher login
router.post("/teacher/login", TeacherController.TeacherLogin);

// teacher
router.post("/teacher",isLoggedIn, hasRole(["admin", "teacher"]),  TeacherController.createTeacher);
router.get("/teacher", isLoggedIn, hasRole(["admin", "teacher"]), TeacherController.getAllTeachers);
router.put("/teacher/:id",isLoggedIn, hasRole(["admin", "teacher"]),  TeacherController.updateTeacher);
router.delete("/teacher/:id",isLoggedIn, hasRole(["admin", "teacher"]),  TeacherController.deleteTeacher);

module.exports = router;
