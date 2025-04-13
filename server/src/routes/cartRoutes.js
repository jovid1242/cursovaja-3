const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { auth } = require("../middleware/auth");

// Cart routes
router.get("/", auth, cartController.getCart);
router.post("/", auth, cartController.addToCart);
router.delete("/:id", auth, cartController.removeFromCart);

// Order routes
router.post("/checkout", auth, cartController.createOrder);
router.get("/orders", auth, cartController.getOrderHistory);

module.exports = router;
