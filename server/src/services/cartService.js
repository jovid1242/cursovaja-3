const { Cart, Order, Product } = require("../models");

class CartService {
  async getCartItems(userId) {
    return await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: "Product" }],
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
      include: [{ model: Product, as: "Product" }],
    });

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    const orders = await Promise.all(
      cartItems.map(async (item) => {
        if (
          !item.productId ||
          !item.quantity ||
          !item.Product ||
          !item.Product.price
        ) {
          console.error("Invalid cart item data:", item);
          throw new Error("Invalid cart item data");
        }

        const order = await Order.create({
          userId,
          productId: item.productId,
          quantity: item.quantity,
          totalPrice: item.quantity * item.Product.price,
          orderDate: new Date(),
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
      include: [{ model: Product, as: "Product" }],
    });
  }
}

module.exports = new CartService();
