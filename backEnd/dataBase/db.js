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

module.exports = { pool, connectToDataBase };
