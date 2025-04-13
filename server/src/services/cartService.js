const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

class CartService {
  async getCartItems(userId) {
    return await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
  }

  async addToCart(userId, { productId, quantity }) {
    return await Cart.create({
      userId,
      productId,
      quantity,
    });
  }

  async removeFromCart(userId, cartItemId) {
    const cartItem = await Cart.findOne({
      where: { id: cartItemId, userId },
    });
    if (!cartItem) throw new Error("Cart item not found");
    await cartItem.destroy();
    return { message: "Item removed from cart" };
  }

  async createOrder(userId) {
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const orders = await Promise.all(
      cartItems.map(async (item) => {
        const order = await Order.create({
          userId,
          productId: item.productId,
          quantity: item.quantity,
          totalPrice: item.quantity * item.Product.price,
        });
        await item.destroy();
        return order;
      })
    );

    return orders;
  }

  async getOrderHistory(userId) {
    return await Order.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
  }
}

module.exports = new CartService();
