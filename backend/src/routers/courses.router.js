const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getFilteredCourses,
} = require("../controllers/courses.controller");
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
const mCoursesCreate = [isLoggedIn, limiter, hasRole(["super_admin", "admin"])];
const mGetCourses = [isLoggedIn, limiter, hasRole(["student", "admin", "super_admin"])];
const mGetCoursesFilter = [isLoggedIn, limiter, hasRole(["student", "admin", "super_admin"])];
const mGetCorsesById = [isLoggedIn, limiter, isMongoId, hasRole(["admin", "super_admin"])];
const mUpdateCorsesById = [isLoggedIn, limiter, isMongoId, hasRole(["admin", "super_admin"])];
const mDeleteCorsesById = [isLoggedIn, limiter, isMongoId, hasRole(["admin", "super_admin"])];

router.post("/courses", mCoursesCreate, createCourse);
router.get("/courses", mGetCourses, getAllCourses);
router.get("/courses/filter", mGetCoursesFilter, getFilteredCourses); 
router.get("/courses/:id", mGetCorsesById, getCourseById);
router.put("/courses/:id", mUpdateCorsesById, updateCourseById);
router.delete("/courses/:id", mDeleteCorsesById, deleteCourseById);

module.exports = router;
