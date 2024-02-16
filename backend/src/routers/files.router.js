const express = require("express");
const router = express.Router();
const {
  createFile,
  getFileByID,
  updateFile,
  deleteFile,
  getAllFile,
} = require("../controllers/file.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.post("/videos", limiter, createFile);
router.get("/videos", limiter, getAllFile);
router.get("/videos/:id", limiter, getFileByID);
router.put("/videos/:id", limiter, updateFile);
router.delete("/videos/:id", limiter, deleteFile);

module.exports = router;
