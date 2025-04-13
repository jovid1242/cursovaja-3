const { Op } = require("sequelize");
const { Product, Category } = require("../models");

class ProductService {
  async getProducts({ page = 1, limit = 10, category, search }) {
    const offset = (page - 1) * limit;
    const where = {};

    if (category) where.categoryId = category;
    if (search) where.name = { [Op.like]: `%${search}%` };

    return await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: [{ model: Category }],
    });
  }

  async getProductById(id) {
    const product = await Product.findByPk(id, {
      include: [{ model: Category }],
    });
    if (!product) throw new Error("Product not found");
    return product;
  }

  async createProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, productData) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    return await product.update(productData);
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    await product.destroy();
    return { message: "Product deleted successfully" };
  }
}

module.exports = new ProductService();
