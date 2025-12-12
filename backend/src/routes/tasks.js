
import express from "express";
import sequelize from "../db.js";
import { QueryTypes } from "sequelize";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// ================= GET TASKS ===================
router.get("/", async (req, res) => {
  try {
    const rows = await sequelize.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
      {
        replacements: [req.user.id],
        type: QueryTypes.SELECT
      }
    );

    return res.json(rows);
  } catch (err) {
    console.error("GET TASKS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// ================= CREATE TASK ===================
router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority , due_date} = req.body;
    console.log("REQ BODY:", req.body);
    console.log("REQ USER:", req.user);

    // if (!title) {
    //   return res.status(400).json({ message: "Title is required" });
    // }

    // const [result, metadata] = await sequelize.query(
    

    const metadata = await sequelize.query(
      "INSERT INTO tasks (user_id, title, description, status , priority, due_date) VALUES (?, ?, ?, ?, ?, ?)",
      {
        replacements: [
          req.user.id,
          title,
          description || "N/A",
          status || "pending",
          priority || "medium",
          due_date || null

        ],
        type: QueryTypes.INSERT
      }
    );
    //  const insertId = metadata?(req.user.id): null;
    const insertId = metadata[0];

    console.log(">>> INSERT METADATA:", metadata);


    console.log("Inserted ID:", insertId);

    if (!insertId) {
      console.error("INSERT FAILED: metadata =", metadata);
      return res.status(500).json({ message: "Insert failed" });
    }

    return res.status(201).json({
      id: insertId,
      user_id: req.user.id,
      title,
      description: description || "N/A",
      status: status || "pending",
      priority: priority || "medium",
      due_date: due_date || null

    });

  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// ================= UPDATE TASK ===================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority , due_date} = req.body;

    await sequelize.query(
      "UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE id = ? AND user_id = ?" ,
      {
        // replacements: [title, description, status, priority, id, req.user.id],
         replacements: [
          title,
          description || "N/A",
          status || "pending",
          priority || "medium",
          due_date || null,
          id,
          req.user.id
        ],
        type: QueryTypes.UPDATE
      }
    );

    const task = await sequelize.query(
      "SELECT * FROM tasks WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT
      }
    );

    return res.json(task[0]);

  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


// ================= DELETE TASK ===================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await sequelize.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      {
        replacements: [id, req.user.id],
        type: QueryTypes.DELETE
      }
    );

    return res.json({ message: "Task deleted" });

  } catch (err) {
    console.error("DELETE TASK ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
