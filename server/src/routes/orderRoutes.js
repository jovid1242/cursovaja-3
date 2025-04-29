const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { auth, isAdmin } = require("../middleware/auth");

// Создание заказа из корзины
router.post("/from-cart", auth, orderController.createOrderFromCart);

// Получение всех заказов (только для админа)
router.get("/", auth, isAdmin, orderController.getOrders);

// Получение заказа по ID
router.get("/:id", auth, orderController.getOrderById);

// Получение заказов пользователя
router.get("/user/:userId", auth, orderController.getOrdersByUser);

// Обновление заказа (только для админа)
router.put("/:id", auth, isAdmin, orderController.updateOrder);

// Удаление заказа (только для админа)
router.delete("/:id", auth, isAdmin, orderController.deleteOrder);

module.exports = router;
