const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const {
  createFile,
  getAllFile,
  updateFile,
  deleteFile,
} = require("../controllers/file.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const isMongoId = require("../shared/validator/isMongoId");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

const mCreateVideo = [isLoggedIn, limiter, hasRole(["admin"])];
const mFindVideo = [isLoggedIn, limiter, hasRole(["student", "admin"])];
const mUpdateVideo = [isLoggedIn, limiter, isMongoId, hasRole(["admin"])];
const mDeleteVideo = [isLoggedIn, limiter, isMongoId, hasRole(["admin"])];

router.post("/videos", mCreateVideo, createFile);
router.get("/videos",mFindVideo,  getAllFile);
router.put("/videos/:id", mUpdateVideo, updateFile);
router.delete("/videos/:id", mDeleteVideo, deleteFile);

module.exports = router;
