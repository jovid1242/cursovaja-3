const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth } = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", auth, userController.getProfile);
router.put("/profile", auth, userController.updateProfile);
router.get("/me", auth, userController.getMe);
router.get("/", auth, userController.getUsers);
router.put("/:id/status", auth, userController.updateUserStatus);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
