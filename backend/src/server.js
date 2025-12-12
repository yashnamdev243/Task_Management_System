import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import sequelize from "./db.js";
import "./models/User.js";
import "./models/Task.js";
import adminRoutes from "./routes/adminRoutes.js";
console.log("CLIENT_URL from .env:", process.env.CLIENT_URL);

dotenv.config();
const app = express();
console.log("CLIENT_URL from .env:", process.env.CLIENT_URL);


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
  
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});