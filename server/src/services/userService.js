const jwt = require("jsonwebtoken");
const { User } = require("../models");

class UserService {
  async register(userData) {
    try {
      const { username, email, password, name, phone, address } = userData;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const user = await User.create({
        username,
        email,
        password,
        name,
        phone,
        address,
        role: "user",
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      console.log("User found:", user ? "yes" : "no");

      if (!user) {
        console.log("User not found for email:", email);
        throw new Error("User not found");
      }

      const isPasswordValid = await user.validatePassword(password);
      console.log(
        "Password validation:",
        isPasswordValid ? "valid" : "invalid"
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      console.error("Login service error:", error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        role: user.role,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      await user.update(userData);
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        role: user.role,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUserStatus(id, status) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      user.role = status;
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserService();
