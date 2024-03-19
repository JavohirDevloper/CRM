const express = require("express");
const {} = require("../controllers/chats.controller");
const isMongoId = require("../shared/validator/isMongoId");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const { hasRole } = require("../shared/auth");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

const MAllChats = [isLoggedIn, limiter, hasRole(["student"])];
const Monetoonechats = [isLoggedIn, limiter, hasRole(["student"])];
const MUpdateChats = [isLoggedIn, limiter, isMongoId, hasRole(["student"])];
const MDeleteChats = [isLoggedIn, limiter, isMongoId, hasRole(["student"])];

router.get("/chat", MAllChats);
router.post("/chat", Monetoonechats);
router.put("/chat/:chatId", MUpdateChats);
router.delete("/chat/:chatId", MDeleteChats);

module.exports = router;
