const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  getFindById,
} = require("../controllers/admin.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
const isMongoId = require("../shared/validator/isMongoId");

const mGetAllAdmins = [isLoggedIn, hasRole(["admin"])];
const mGetByIdAdmin = [isLoggedIn, isMongoId, hasRole(["admin"])];
const mUpdateAdmin = [isLoggedIn, isMongoId, hasRole(["admin"])];
const mDeleteAdmin = [isLoggedIn, isMongoId, hasRole(["admin"])];

router.post("/admin/login", loginAdmin);
router.get("/admin", mGetAllAdmins, getAllAdmins);
router.get("/admin/:id", mGetByIdAdmin, getFindById);
router.put("/admin/:id", mUpdateAdmin, updateAdmin);
router.delete("/admin/:id", mDeleteAdmin, deleteAdmin);

module.exports = router;
