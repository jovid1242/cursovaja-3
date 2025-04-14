const { Order, User, Product, Cart } = require("../models");

class OrderService {
  async createOrderFromCart(userId) {
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: "Product" }],
    });

    console.log("Cart items:", JSON.stringify(cartItems, null, 2));

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const orders = await Promise.all(
      cartItems.map(async (cartItem) => {
        console.log("Processing cart item:", {
          id: cartItem.id,
          productId: cartItem.ProductId,
          quantity: cartItem.quantity,
          product: cartItem.Product
            ? {
                id: cartItem.Product.id,
                price: cartItem.Product.price,
                stock: cartItem.Product.stock,
              }
            : null,
        });

        if (!cartItem.ProductId) {
          console.error("Missing productId in cart item:", cartItem);
          throw new Error("Missing productId in cart item");
        }
        if (!cartItem.quantity) {
          console.error("Missing quantity in cart item:", cartItem);
          throw new Error("Missing quantity in cart item");
        }
        if (!cartItem.Product) {
          console.error("Missing Product association in cart item:", cartItem);
          throw new Error("Missing Product association in cart item");
        }
        if (!cartItem.Product.price) {
          console.error("Missing price in Product:", cartItem.Product);
          throw new Error("Missing price in Product");
        }
        if (cartItem.Product.stock < cartItem.quantity) {
          throw new Error(
            `Not enough stock for product ${cartItem.Product.name}. Available: ${cartItem.Product.stock}, requested: ${cartItem.quantity}`
          );
        }

        const orderData = {
          userId: userId,
          productId: cartItem.ProductId,
          quantity: cartItem.quantity,
          totalPrice: cartItem.quantity * cartItem.Product.price,
          orderDate: new Date(),
        };

        console.log("Creating order with data:", orderData);

        // Update product stock
        await Product.update(
          { stock: cartItem.Product.stock - cartItem.quantity },
          { where: { id: cartItem.ProductId } }
        );

        const order = await Order.create(orderData);
        await cartItem.destroy();
        return order;
      })
    );

    return orders;
  }

  async getOrderById(id) {
    return await Order.findByPk(id, {
      include: [
        { model: User, as: "User" },
        { model: Product, as: "Product" },
      ],
    });
  }

  async getAllOrders() {
    return await Order.findAll({
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
