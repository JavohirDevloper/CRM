const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");
const hasRole = require("../shared/auth/hasRole");
// admin login
router.post("/admin/login", AdminController.AdminLogin);

// Admin
router.post("/admin",isLoggedIn, hasRole(["admin"]), AdminController.createAdmin);
router.get("/admin",isLoggedIn, hasRole(["admin"]),  AdminController.getAllAdmins);
router.put("/admin/:id",isLoggedIn, hasRole(["admin"]),  AdminController.updateAdmin);
router.delete("/admin/:id",isLoggedIn, hasRole(["admin"]),  AdminController.deleteAdmin);

module.exports = router;
