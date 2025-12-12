import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

const Task = sequelize.define("Task", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  status: { 
    type: DataTypes.ENUM("pending", "in_progress", "completed"),
    defaultValue: "pending"
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    defaultValue: "medium"
  }
}, {
  tableName: "tasks",
  timestamps: true
});

// Relationship
User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });

export default Task;
