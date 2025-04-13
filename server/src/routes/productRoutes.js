const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { auth, isAdmin } = require("../middleware/auth");

// Public routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// Admin routes
router.post("/", auth, isAdmin, productController.createProduct);
router.put("/:id", auth, isAdmin, productController.updateProduct);
router.delete("/:id", auth, isAdmin, productController.deleteProduct);

module.exports = router;
