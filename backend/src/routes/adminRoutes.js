import express from "express";
import sequelize from "../db.js";
import { QueryTypes } from "sequelize";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// All below routes require admin access
router.use(authMiddleware, adminMiddleware);

/* ======================================================
   1️⃣  ADMIN DASHBOARD STATS
====================================================== */
router.get("/admin/stats", async (req, res) => {
  try {
    const usersCount = await sequelize.query(
      "SELECT COUNT(*) AS totalUsers FROM users",
      { type: QueryTypes.SELECT }
    );

    const tasksCount = await sequelize.query(
      "SELECT COUNT(*) AS totalTasks FROM tasks",
      { type: QueryTypes.SELECT }
    );

    const highPriorityCount = await sequelize.query(
      "SELECT COUNT(*) AS highPriority FROM tasks WHERE priority = 'high'",
      { type: QueryTypes.SELECT }
    );

    const overdueCount = await sequelize.query(
      `SELECT COUNT(*) AS overdue
       FROM tasks
       WHERE due_date IS NOT NULL
       AND due_date < CURDATE()
       AND status != 'completed'`,
      { type: QueryTypes.SELECT }
    );

    return res.json({
      totalUsers: usersCount?.[0]?.totalUsers ?? 0,
      totalTasks: tasksCount?.[0]?.totalTasks ?? 0,
      highPriority: highPriorityCount?.[0]?.highPriority ?? 0,
      overdue: overdueCount?.[0]?.overdue ?? 0
    });

  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


/* ======================================================
   2️⃣  RECENT USERS (5 latest)
====================================================== */
router.get("/admin/recent-users", async (req, res) => {
  try {
    const users = await sequelize.query(
      `SELECT id, name, email, role, created_at
       FROM users
       ORDER BY id DESC
       LIMIT 5`,
      { type: QueryTypes.SELECT }
    );

    res.json(users);
  } catch (err) {
    console.error("ADMIN RECENT USERS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


/* ======================================================
   3️⃣  RECENT TASKS
====================================================== */
router.get("/admin/recent-tasks", async (req, res) => {
  try {
    const tasks = await sequelize.query(
      `SELECT t.id, t.title, t.priority, t.status, t.due_date,
              u.name AS user_name
       FROM tasks t
       JOIN users u ON t.user_id = u.id
       ORDER BY t.id DESC
       LIMIT 5`,
      { type: QueryTypes.SELECT }
    );

    res.json(tasks);
  } catch (err) {
    console.error("ADMIN RECENT TASKS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


/* ======================================================
   4️⃣  USER MANAGEMENT
====================================================== */
router.get("/admin/users", async (req, res) => {
  try {
    const users = await sequelize.query(
      `SELECT id, name, email, role, created_at
       FROM users
       ORDER BY id DESC`,
      { type: QueryTypes.SELECT }
    );

    res.json(users);
  } catch (err) {
    console.error("ADMIN GET USERS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/admin/users/:id/role", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    await sequelize.query(
      "UPDATE users SET role = ? WHERE id = ?",
      {
        replacements: [role, id],
        type: QueryTypes.UPDATE
      }
    );

    return res.json({ message: "Role updated" });
  } catch (err) {
    console.error("ADMIN UPDATE ROLE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete tasks linked to user
    await sequelize.query(
      "DELETE FROM tasks WHERE user_id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE
      }
    );

    await sequelize.query(
      "DELETE FROM users WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE
      }
    );

    return res.json({ message: "User deleted" });

  } catch (err) {
    console.error("ADMIN DELETE USER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ========== ADD NEW USER ==========


router.post("/admin/users/add", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("ADD USER PAYLOAD:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, Email & Password required" });
    }

    const existingUser = await sequelize.query(
      "SELECT id FROM users WHERE email = ?",
      { replacements: [email], type: QueryTypes.SELECT }
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.default.hash(password, 10);

    await sequelize.query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      {
        replacements: [name, email, hashedPassword, role || "user"],
        type: QueryTypes.INSERT
      }
    );

    return res.json({ message: "User created successfully" });
  } catch (err) {
    console.error("ADMIN ADD USER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
});



// ========== EDIT USER ==========
// router.put("/admin/users/:id/edit", async (req, res) => {
//   try {
//     const { id } = req.params;
//     let { name, email, role, password } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({ message: "Name & email are required" });
//     }

//     // Update password only if provided
//     let query, params;

//     if (password) {
//       const hashed = await bcrypt.hash(password, 10);

//       query = `UPDATE users SET name = ?, email = ?, role = ?, password = ? WHERE id = ?`;
//       params = [name, email, role, hashed, id];
//     } else {
//       query = `UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?`;
//       params = [name, email, role, id];
//     }

//     await sequelize.query(query, {
//       replacements: params,
//       type: QueryTypes.UPDATE,
//     });

//     return res.json({ message: "User updated successfully" });
//   } catch (err) {
//     console.error("ADMIN EDIT USER ERROR:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// });

// UPDATE USER DETAILS
router.put("/admin/users/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    // Check if email is already used by another user
    const existingUser = await sequelize.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      {
        replacements: [email, id],
        type: QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let hashed = null;
    if (password && password.trim() !== "") {
      const bcrypt = await import("bcryptjs");
      hashed = await bcrypt.default.hash(password, 10);
    }

    if (hashed) {
      // Update with password
      await sequelize.query(
        `UPDATE users 
         SET name = ?, email = ?, role = ?, password = ?
         WHERE id = ?`,
        {
          replacements: [name, email, role, hashed, id],
          type: QueryTypes.UPDATE,
        }
      );
    } else {
      // Update without password
      await sequelize.query(
        `UPDATE users 
         SET name = ?, email = ?, role = ?
         WHERE id = ?`,
        {
          replacements: [name, email, role, id],
          type: QueryTypes.UPDATE,
        }
      );
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("ADMIN EDIT USER ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
});


/* ======================================================
   5️⃣  TASK MANAGEMENT
====================================================== */
// router.get("/admin/tasks", async (req, res) => {
//   try {
//     const { user_id, priority, status, overdue } = req.query;

//     let where = "WHERE 1=1";
//     const params = [];

//     if (user_id) { where += " AND t.user_id = ?"; params.push(user_id); }
//     if (priority) { where += " AND t.priority = ?"; params.push(priority); }
//     if (status) { where += " AND t.status = ?"; params.push(status); }

//     if (overdue === "true") {
//       where +=
//         " AND t.due_date IS NOT NULL AND t.due_date < CURDATE() AND t.status != 'completed'";
//     }

//     const tasks = await sequelize.query(
//       `SELECT t.id, t.title, t.description, t.priority, t.status, t.due_date,
//               u.name AS user_name, u.email AS user_email
//        FROM tasks t
//        JOIN users u ON t.user_id = u.id
//        ${where}
//        ORDER BY t.id DESC`,
//       {
//         replacements: params,
//         type: QueryTypes.SELECT
//       }
//     );

//     res.json(tasks);

//   } catch (err) {
//     console.error("ADMIN GET TASKS ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


router.get("/admin/tasks", async (req, res) => {
  try {
    const { user_id, priority, status, overdue } = req.query;

    let where = "WHERE 1=1";
    const params = [];

    if (user_id) {
      where += " AND t.user_id = ?";
      params.push(user_id);
    }

    if (priority) {
      where += " AND t.priority = ?";
      params.push(priority);
    }

    if (status) {
      where += " AND t.status = ?";
      params.push(status);
    }

    if (overdue === "true") {
      where +=
        " AND t.due_date IS NOT NULL AND t.due_date < CURDATE() AND t.status != 'completed'";
    }

    const tasks = await sequelize.query(
      `
      SELECT 
        t.id,
        t.title,
        t.description,
        t.priority,
        t.status,
        t.due_date,
        u.name AS user_name,
        u.email AS user_email
      FROM tasks t
      JOIN users u ON t.user_id = u.id
      ${where}
      ORDER BY t.id DESC
      `,
      {
        replacements: params,
        type: QueryTypes.SELECT
      }
    );

    return res.json(tasks);

  } catch (err) {
    console.error("ADMIN GET TASKS ERROR:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/admin/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, due_date } = req.body;

    await sequelize.query(
      `UPDATE tasks
       SET title = ?, description = ?, status = ?, priority = ?, due_date = ?
       WHERE id = ?`,
      {
        replacements: [
          title,
          description || "N/A",
          status || "pending",
          priority || "medium",
          due_date || null,
          id
        ],
        type: QueryTypes.UPDATE
      }
    );

    const updated = await sequelize.query(
      "SELECT * FROM tasks WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT
      }
    );

    res.json(updated[0]);

  } catch (err) {
    console.error("ADMIN UPDATE TASK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/admin/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await sequelize.query(
      "DELETE FROM tasks WHERE id = ?",
      {
        replacements: [id],
        type: QueryTypes.DELETE
      }
    );

    res.json({ message: "Task deleted" });

  } catch (err) {
    console.error("ADMIN DELETE TASK ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ======================================================
   6️⃣  ACTIVITY LOGS
====================================================== */
router.get("/admin/logs", async (req, res) => {
  try {
    const logs = await sequelize.query(
      `SELECT l.id, l.action, l.created_at,
              u.name AS user_name, u.email AS user_email
       FROM activity_logs l
       LEFT JOIN users u ON l.user_id = u.id
       ORDER BY l.id DESC
       LIMIT 100`,
      { type: QueryTypes.SELECT }
    );

    res.json(logs);

  } catch (err) {
    console.error("ADMIN LOGS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


