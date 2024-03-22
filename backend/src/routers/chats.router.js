const express = require("express");
const {
  getAllChats,
  createChat,
  updateChat,
  deleteChat,
} = require("../controllers/chats.controller");
const isMongoId = require("../shared/validator/isMongoId");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const { hasRole } = require("../shared/auth");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 35,
  message: "Hajm limitiga erishildi. Iltimos, keyinroq urinib ko'ring.",
});

const MAllChats = [isLoggedIn, limiter, hasRole(["student"])];
const Monetoonechats = [isLoggedIn, limiter, hasRole(["student"])];
const MUpdateChats = [isLoggedIn, limiter,  hasRole(["student"])];
const MDeleteChats = [isLoggedIn, limiter, hasRole(["student"])];

router.get("/chats", MAllChats, getAllChats);
router.post("/chats", Monetoonechats, createChat);
router.put("/chats/:chatId", MUpdateChats, updateChat);
router.delete("/chats/:chatId", MDeleteChats, deleteChat);

module.exports = router;
