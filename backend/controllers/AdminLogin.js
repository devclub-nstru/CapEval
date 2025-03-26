const jwt = require("jsonwebtoken");

const ADMIN_EMAIL = "admin@newtonschool.com";
const ADMIN_PASSWORD = "admin123456";

module.exports = {
  getLogin: (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "Email and password are required",
        });
      }

      // Check against hardcoded credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Generate admin token
        const token = jwt.sign(
          { role: "admin", email: ADMIN_EMAIL },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );

        return res.status(200).json({
          status: true,
          message: "Admin login successful",
          token,
        });
      }

      return res.status(401).json({
        status: false,
        message: "Invalid admin credentials",
      });
    } catch (error) {
      console.error("Admin login error:", error);
      return res.status(500).json({
        status: false,
        message: "Server error",
      });
    }
  },
};
