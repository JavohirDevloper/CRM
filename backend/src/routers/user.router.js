const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
  getUserMe,
  getAllUser,
  createUser,
  updateUserMe,
  deleteUserMe,
} = require("../controllers/user.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const isMongoId = require("../shared/validator/isMongoId");

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message:
    "Foydalanuvchi hajmi limitga yetdi. Iltimos, keyinroq harakat qiling.",
});

const mCreateUserAdmin = [isLoggedIn, limiter, hasRole(["admin","super_admin"])];
const mUserAdminFind = [isLoggedIn, limiter, hasRole(["admin", "super_admin"])];
const mUserAdminFindById = [isLoggedIn, limiter, hasRole(["admin", "super_admin"])];
const mUserGetMe = [isLoggedIn, limiter, hasRole(["student"])];
const mUserUpdateAdmin = [isLoggedIn, isMongoId, limiter, hasRole(["admin","super_admin"])];
const mUserUpdateMe = [isLoggedIn, limiter, hasRole(["student"])];
const mUserAdminDelete = [isLoggedIn, isMongoId, limiter, hasRole(["admin","super_admin"])];
const mDeleteMe = [isLoggedIn, limiter, hasRole(["student"])];

router.post("/user/register", register);
router.post("/user/login", login);
router.post("/user",mCreateUserAdmin, createUser );
router.get("/user", mUserAdminFind, getAllUser);
router.get("/user/:id", mUserAdminFindById, getUserById);
router.get("/user/me",mUserGetMe, getUserMe);
router.put("/user/:id", mUserUpdateAdmin, updateUser);
router.put("/user/me", mUserUpdateMe, updateUserMe);
router.delete("/user/:id", mUserAdminDelete, deleteUser);
router.delete("/user/me", mDeleteMe, deleteUserMe);
module.exports = router;
