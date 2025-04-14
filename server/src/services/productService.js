const { Op } = require("sequelize");
const { Product, Category } = require("../models");

class ProductService {
  async getProducts({
    page = 1,
    limit = 10,
    categoryId,
    name,
    minPrice,
    maxPrice,
  }) {
    const offset = (page - 1) * limit;
    const where = {};

    if (categoryId) where.categoryId = categoryId;
    if (name) where.name = { [Op.like]: `%${name}%` };

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price[Op.gte] = minPrice;
      if (maxPrice !== undefined) where.price[Op.lte] = maxPrice;
    }

    return await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: [{ model: Category }],
      order: [["createdAt", "DESC"]],
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
    const { name, description, price, categoryId, image, stock } = productData;
    if (!name || !description || !price || !categoryId) {
      throw new Error("Missing required fields");
    }
    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
      image,
      stock,
    });
    return product;
  }

  async updateProduct(id, productData) {
    const { name, description, price, categoryId, image, stock } = productData;
    if (!name || !description || !price || !categoryId) {
      throw new Error("Missing required fields");
    }
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    return await product.update(
      {
        name,
        description,
        price,
        categoryId,
        image,
        stock,
      },
      {
        where: { id },
      }
    );
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    await product.destroy();
    return { message: "Product deleted successfully" };
  }
}

module.exports = new ProductService();
