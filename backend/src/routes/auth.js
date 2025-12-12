import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sequelize from "../db.js";

dotenv.config();
const router = express.Router();

// ===================== REGISTER =====================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password , role} = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user exists
    const [existing] = await sequelize.query(
      "SELECT id FROM users WHERE email = ?",
      { replacements: [email] }
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
     
    //  Insert user with role
    await sequelize.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      { replacements: [name, email, hashed, role || "user"] }
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ===================== LOGIN =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
       
    // Fetch user
    const [rows] = await sequelize.query(
      "SELECT * FROM users WHERE email = ?",  
       { replacements: [email] }
);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // CREATE TOKEN WITH ROLE
    const token = jwt.sign(
      { id: user.id,
        email: user.email, 
        name: user.name ,
        role: user.role, // 🚀 IMPORTANT: Role added to token!
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: { id: user.id, 
        email: user.email, 
        name: user.name ,
         role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;