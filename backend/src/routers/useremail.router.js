const express = require("express");
const router = express.Router();
const UserController = require("../controllers/useremail.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

// user authentication
router.post("/user/register/by-email", UserController.registerAndLoginUser);
router.get("/user/code/:code", UserController.getTokenByCode);

// userlar uchun router
router.get("/user/:id", isLoggedIn, limiter, UserController.getUserById);
router.put("/user/:id", isLoggedIn, limiter, UserController.updateUser);
router.delete("/user/:id", isLoggedIn, limiter, UserController.deleteUser);

module.exports = router;
