const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const isMongoId = require("../shared/validator/isMongoId");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const { hasRole } = require("../shared/auth");
const {
  getMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/message.controller");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

const MFindMessages = [isLoggedIn, limiter, isMongoId, hasRole(["student"])];
const MAddMessages = [isLoggedIn, limiter, hasRole(["student"])];
const MUpdateMessages = [isLoggedIn, limiter, isMongoId, hasRole(["student"])];
const MDeleteMessages = [isLoggedIn, limiter, isMongoId, hasRole(["student"])];

router.get("/message/:chatId", MFindMessages, getMessages);
router.post("/message", MAddMessages, sendMessage);
router.put("/message/:messageId", MUpdateMessages, updateMessage);
router.delete("/message/:messageId", MDeleteMessages, deleteMessage);

module.exports = router;
