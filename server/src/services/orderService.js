const { Order, User, Product, Cart } = require("../models");
const { Op } = require("sequelize");

class OrderService {
  async createOrderFromCart(userId, paymentInfo) {
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: "Product" }],
      attributes: [
        "id",
        "userId",
        "productId",
        "quantity",
        "createdAt",
        "updatedAt",
      ],
    });

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const orders = await Promise.all(
      cartItems.map(async (cartItem) => {
        const cartItemData = cartItem.get({ plain: true });
        console.log("Processing cart item:", {
          id: cartItemData.id,
          productId: cartItemData.productId,
          quantity: cartItemData.quantity,
          product: cartItemData.Product
            ? {
                id: cartItemData.Product.id,
                price: cartItemData.Product.price,
                stock: cartItemData.Product.stock,
              }
            : null,
        });

        if (!cartItemData.productId) {
          console.error("Missing productId in cart item:", cartItemData);
          throw new Error("Missing productId in cart item");
        }
        if (!cartItemData.quantity) {
          console.error("Missing quantity in cart item:", cartItemData);
          throw new Error("Missing quantity in cart item");
        }
        if (!cartItemData.Product) {
          console.error(
            "Missing Product association in cart item:",
            cartItemData
          );
          throw new Error("Missing Product association in cart item");
        }
        if (!cartItemData.Product.price) {
          console.error("Missing price in Product:", cartItemData.Product);
          throw new Error("Missing price in Product");
        }
        if (cartItemData.Product.stock < cartItemData.quantity) {
          throw new Error(
            `Not enough stock for product ${cartItemData.Product.name}. Available: ${cartItemData.Product.stock}, requested: ${cartItemData.quantity}`
          );
        }

        const orderData = {
          userId: userId,
          productId: cartItemData.productId,
          quantity: cartItemData.quantity,
          totalPrice: cartItemData.quantity * cartItemData.Product.price,
          orderDate: new Date(),
          status: "pending",
          cardNumber: paymentInfo.cardNumber,
          cardHolder: paymentInfo.cardHolder,
          cardExpiry: paymentInfo.cardExpiry,
          shippingAddress: paymentInfo.shippingAddress,
        };

        await Product.update(
          { stock: cartItemData.Product.stock - cartItemData.quantity },
          { where: { id: cartItemData.productId } }
        );

        const order = await Order.create(orderData);
        await cartItem.destroy();
        return order;
      })
    );

    return orders;
  }

  async getOrders({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    return await Order.findAndCountAll({
      limit,
      offset,
      include: [
        { model: User, as: "User" },
        { model: Product, as: "Product" },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async getOrderById(id) {
    return await Order.findByPk(id, {
      include: [
        { model: User, as: "User" },
        { model: Product, as: "Product" },
      ],
    });
  }

  async getOrdersByUserId(userId) {
    return await Order.findAll({
      where: { userId },
      include: [
        { model: User, as: "User" },
        { model: Product, as: "Product" },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async updateOrder(id, orderData) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return await order.update(orderData);
  }

  async deleteOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }
    await order.destroy();
    return { message: "Order deleted successfully" };
  }
}

module.exports = new OrderService();
