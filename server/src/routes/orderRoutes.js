const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { auth } = require("../middleware/auth");

router.use(auth);

// Create order from cart
router.post("/from-cart", orderController.createOrderFromCart);

// Get all orders
router.get("/", orderController.getAllOrders);

// Get orders by user ID
router.get("/user/:userId", orderController.getOrdersByUser);

// Get a single order by ID
router.get("/:id", orderController.getOrder);

// Update an order
router.put("/:id", orderController.updateOrder);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
