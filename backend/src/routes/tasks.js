import express from "express";
import { pool } from "../db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const [result] = await pool.query(
      "INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)",
      [req.user.id, title, description || "", status || "pending"]
    );
    const [taskRows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    return res.status(201).json(taskRows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    await pool.query(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
      [title, description, status, id, req.user.id]
    );
    const [taskRows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return res.json(taskRows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = ? AND user_id = ?", [id, req.user.id]);
    return res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;