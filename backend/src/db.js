// import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();

// export const Sequelize = mysql.createSequelize({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false // <-- disables createdAt & updatedAt
      
    }
    
  }
  
);
console.log("TIMESTAMPS:", sequelize.options.define);


sequelize.authenticate()
  .then(() => console.log("MySQL Connected!"))
  .catch(err => console.log("DB Error:", err));

export default sequelize;
