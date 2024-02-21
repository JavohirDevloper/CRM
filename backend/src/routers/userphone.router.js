const express = require("express");
const rateLimit = require("express-rate-limit");
const UserController = require("../controllers/userphone.controller.js");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");

const router = express.Router();
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

// user authentication
router.post("/user/register", UserController.registerAndLoginUser);
router.get("/user/code/:code", UserController);

// userlar uchun router
router.get(
  "/user/:id",
  isLoggedIn,
  hasRole(["admin", "students"]),
  limiter,
  UserController.getUserById
);
router.put(
  "/user/:id",
  isLoggedIn,
  hasRole(["admin", "students"]),
  limiter,
  UserController.updateUser
);
router.delete(
  "/user/:id",
  isLoggedIn,
  hasRole(["admin", "students"]),
  limiter,
  UserController.deleteUser
);

module.exports = router;
