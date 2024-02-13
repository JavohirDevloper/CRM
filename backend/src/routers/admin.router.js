const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin.controller");
const isLoggedIn = require("../shared/auth/isLoggedIn");

// admin login
router.post("/admin/login", AdminController.AdminLogin);

// Admin
router.post("/admin",  AdminController.createAdmin);
router.get("/admin",  AdminController.getAllAdmins);
router.put("/admin/:id",  AdminController.updateAdmin);
router.delete("/admin/:id",  AdminController.deleteAdmin);

module.exports = router;
