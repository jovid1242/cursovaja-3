const cartService = require("../services/cartService");

class CartController {
  async getCart(req, res) {
    try {
      const cartItems = await cartService.getCartItems(req.user.id);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addToCart(req, res) {
    try {
      const cartItem = await cartService.addToCart(req.user.id, req.body);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async removeFromCart(req, res) {
    try {
      const result = await cartService.removeFromCart(
        req.user.id,
        req.params.id
      );
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createOrder(req, res) {
    try {
      const orders = await cartService.createOrder(req.user.id);
      res.status(201).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrderHistory(req, res) {
    try {
      const orders = await cartService.getOrderHistory(req.user.id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CartController();
