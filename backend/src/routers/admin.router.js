const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  getFindById,
  registerAdmin,
} = require("../controllers/admin.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const isMongoId = require("../shared/validator/isMongoId");

const mRegisterAdmin = [isLoggedIn, hasRole(["super_admin"])];
const mCreateAdmin = [isLoggedIn, hasRole(["super_admin"])];
const mGetAllAdmins = [isLoggedIn, hasRole(["admin", "super_admin"])];
const mGetByIdAdmin = [isLoggedIn, isMongoId, hasRole(["admin", "super_admin"])];
const mUpdateAdmin = [isLoggedIn, isMongoId, hasRole(["super_admin"])];
const mDeleteAdmin = [isLoggedIn, isMongoId, hasRole(["super_admin"])];

router.post("/admin/login", loginAdmin);
router.post("/admin/register", mRegisterAdmin, registerAdmin);
router.post("/admin", mCreateAdmin, createAdmin);
router.get("/admin", mGetAllAdmins, getAllAdmins);
router.get("/admin/:id", mGetByIdAdmin, getFindById);
router.put("/admin/:id", mUpdateAdmin, updateAdmin);
router.delete("/admin/:id", mDeleteAdmin, deleteAdmin);

module.exports = router;
