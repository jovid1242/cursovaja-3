const userService = require("../services/userService");

class UserController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Проверяем наличие обязательных полей
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Username, email and password are required",
        });
      }

      const result = await userService.register({ username, email, password });
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Проверяем наличие обязательных полей
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const result = await userService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
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
}

module.exports = new UserController();
