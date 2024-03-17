const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const {

} = require("../controllers/file.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const isMongoId = require("../shared/validator/isMongoId");
const { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification } = require("../controllers/notification.controller.js");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

const mCreateNotification = [isLoggedIn, limiter, hasRole(["admin", "super_admin"])];
const mFindNotification = [isLoggedIn, limiter, hasRole(["student", "admin", "super_admin", "teacher"])];
const mFindByIdNotification = [isLoggedIn, limiter,isMongoId, hasRole(["student", "admin", "super_admin", "teacher"])];
const mUpdateNotification = [isLoggedIn, limiter, isMongoId, hasRole(["admin", "super_admin"])];
const mDeleteNotification = [isLoggedIn, limiter, isMongoId, hasRole(["admin", "super_admin"])];

router.post("/notification", mCreateNotification, createNotification);
router.get("/notification",mFindNotification,  getAllNotifications);
router.get("/notification/:id",mFindByIdNotification,  getNotificationById);
router.put("/notification/:id", mUpdateNotification, updateNotification);
router.delete("/notification/:id", mDeleteNotification, deleteNotification);

module.exports = router;
