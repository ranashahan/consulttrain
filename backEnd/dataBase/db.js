// const mysql = require("mysql2/promise");
// const process = require("process");

// const config = {
//   user: process.env.DB_USER || "angular",
//   password: process.env.DB_PASS || "password",
//   database: process.env.DB_NAME || "consulttrain",
//   socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// };

// // If in development and no Cloud SQL socket, fallback to TCP
// if (
//   process.env.NODE_ENV === "development" &&
//   !process.env.INSTANCE_CONNECTION_NAME
// ) {
//   config.host = "127.0.0.1";
//   delete config.socketPath;
//   console.log("Attempting local DB connection via TCP...");
// } else {
//   console.log("Attempting App Engine DB connection via Unix socket...");
// }

// // Create the pool once
// const pool = mysql.createPool(config);

// // Test the connection once on load
// (async () => {
//   try {
//     const [rows] = await pool.query("SELECT 1 + 1 AS solution");
//     console.log("Database connection pool created successfully!");
//     console.log("Database test query result:", rows[0].solution);
//   } catch (err) {
//     console.error("Failed to connect to database:", err);
//   }
// })();

// // Export pool directly so `require('./db.js')` works as expected
// module.exports = pool;

const sql = require("mysql2/promise");

const pool = sql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PWD,
});

const connectToDataBase = async () => {
  try {
    await pool.getConnection();
    console.log("connection successfully created");
  } catch (error) {
    console.log("Database connection error");
    console.log(error);
  }
};

module.exports = pool;
