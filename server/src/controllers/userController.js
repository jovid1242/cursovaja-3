const userService = require("../services/userService");

class UserController {
  async register(req, res) {
    try {
      const { username, email, password, name, phone, address } = req.body;

      // Проверяем наличие обязательных полей
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Username, email and password are required",
        });
      }

      const result = await userService.register({
        username,
        email,
        password,
        name,
        phone,
        address,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const result = await userService.login(email, password);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({
        success: false,
        message: error.message,
        error: {
          name: error.name,
          message: error.message,
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
      });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const user = await userService.updateUser(req.user.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getMe(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUserStatus(req, res) {
    try {
      const user = await userService.updateUserStatus(
        req.params.id,
        req.body.status
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
