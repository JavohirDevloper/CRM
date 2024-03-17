const express = require("express");
const router = express.Router();
const {
  createTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
  login,
  register,
  getTeacherById,
} = require("../controllers/teacher.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const isMongoId = require("../shared/validator/isMongoId");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

const mTeacherCreate = [isLoggedIn, limiter, hasRole(["admin", "super_admin"])];
const mFindTeacher = [isLoggedIn,limiter, hasRole(["admin","super_admin", "teacher"])]
const mFindByIdTeacher = [isLoggedIn,limiter, isMongoId, hasRole(["admin","super_admin", "teacher"])]
const mUpdateByIdTeacher = [isLoggedIn,limiter, isMongoId, hasRole(["admin", "super_admin", "teacher"])]
const mDeleteTeacher = [isLoggedIn, limiter, isMongoId, hasRole(["teacher", "admin", "super_admin"])]

router.post("/teacher/login", login);
router.post("/teacher", mTeacherCreate, createTeacher);
router.get("/teacher",mFindTeacher, getAllTeachers);
router.get("/teacher/:id", mFindByIdTeacher, getTeacherById)
router.put("/teacher/:id",mUpdateByIdTeacher, updateTeacher);
router.delete("/teacher/:id",mDeleteTeacher, deleteTeacher);

module.exports = router;
