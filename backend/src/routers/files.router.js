const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const {
  createFile,
  getAllFile,
  updateFile,
  deleteFile,
  streamFile,
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

const mCreateVideo = [isLoggedIn, limiter, hasRole(["admin", "super_admin"])];
const mFindVideo = [isLoggedIn, limiter, hasRole(["student", "admin", "super_admin"])];
const mUpdateVideo = [isLoggedIn, limiter, isMongoId, hasRole(["admin", "super_admin"])];
const mDeleteVideo = [isLoggedIn, limiter, isMongoId, hasRole(["admin", "super_admin"])];

router.post("/videos", mCreateVideo, createFile);
router.get("/videos/:filename", streamFile);
router.get("/videos",mFindVideo,  getAllFile);
router.put("/videos/:id", mUpdateVideo, updateFile);
router.delete("/videos/:id", mDeleteVideo, deleteFile);

module.exports = router;
