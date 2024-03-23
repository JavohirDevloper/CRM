const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const {
  getAllVideos,
  deleteVideos,
  createVideos,
  updatedVideo,
  ArchiveStatusTrue,
  ArchiveStatusFalse,
  updateLastViewedVideo,
} = require("../controllers/videos.controller");
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
const mFindVideo = [
  isLoggedIn,
  limiter,
  hasRole(["student", "admin", "super_admin", "teacher"]),
];
const mArchivesVideoTrue = [isLoggedIn, limiter, hasRole(["student"])];
const mArchivesVideoFalse = [isLoggedIn, limiter, hasRole(["student"])];
const mLastViewedVideo = [isLoggedIn, limiter, hasRole(["student"])];

const mUpdateVideo = [
  isLoggedIn,
  limiter,
  isMongoId,
  hasRole(["admin", "super_admin"]),
];
const mDeleteVideo = [
  isLoggedIn,
  limiter,
  isMongoId,
  hasRole(["admin", "super_admin"]),
];

router.post("/videos", mCreateVideo, createVideos);
router.get("/videos", mFindVideo, getAllVideos);
router.get("/videos/archive-true/:id", mArchivesVideoTrue, ArchiveStatusTrue);
router.get("/videos/archive-false/:id", mArchivesVideoFalse, ArchiveStatusFalse);
router.put("/videos/last-viewed", mLastViewedVideo, updateLastViewedVideo);
router.put("/videos/:id", mUpdateVideo, updatedVideo);
router.delete("/videos/:id", mDeleteVideo, deleteVideos);

module.exports = router;
