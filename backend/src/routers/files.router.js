const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const fileController = require("../controllers/file.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

router.post("/videos",isLoggedIn, hasRole(["admin"]),  limiter, fileController.createFile);
router.get("/videos",isLoggedIn, hasRole(["admin", "students"]),  limiter, fileController.getAllFile);
router.put("/videos/:id",isLoggedIn, hasRole(["admin"]),  limiter, fileController.updateFile);
router.delete("/videos/:id",isLoggedIn, hasRole(["admin"]),  limiter, fileController.deleteFile);

module.exports = router;
