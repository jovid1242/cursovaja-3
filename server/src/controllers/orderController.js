const orderService = require("../services/orderService");

class OrderController {
  async createOrderFromCart(req, res) {
    try {
      const userId = req.user.id;
      const { cardNumber, cardHolder, cardExpiry, shippingAddress } = req.body;

      if (!cardNumber || !cardHolder || !cardExpiry || !shippingAddress) {
        return res
          .status(400)
          .json({ error: "Missing payment or shipping information" });
      }

      const paymentInfo = {
        cardNumber,
        cardHolder,
        cardExpiry,
        shippingAddress,
      };

      const orders = await orderService.createOrderFromCart(
        userId,
        paymentInfo
      );
      res.status(201).json(orders);
    } catch (error) {
      if (error.message === "Cart is empty") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getOrders(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const orders = await orderService.getOrders({ page, limit });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOrdersByUser(req, res) {
    try {
      const orders = await orderService.getOrdersByUserId(req.params.userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOrder(req, res) {
    try {
      const order = await orderService.updateOrder(req.params.id, req.body);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteOrder(req, res) {
    try {
      const result = await orderService.deleteOrder(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();
