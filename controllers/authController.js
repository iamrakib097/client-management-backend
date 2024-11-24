const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.role === "Admin") {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
};
