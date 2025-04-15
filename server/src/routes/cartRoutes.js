const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { auth } = require("../middleware/auth");

router.get("/", auth, cartController.getCart);
router.post("/", auth, cartController.addToCart);
router.delete("/:id", auth, cartController.removeFromCart);

router.post("/checkout", auth, cartController.createOrder);
router.get("/orders", auth, cartController.getOrderHistory);

module.exports = router;
