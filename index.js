const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",       //  PGUSER
  host: "postgres.railway.internal",       //  PGHOST
  database:"railway", //  PGDATABASE
  password: "admin@1234", //  PGPASSWORD
  port: 5432,                 // usually 5432 or your PGPORT
  ssl: {
    rejectUnauthorized: false, // important for Railway
  },
});

app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.send({ message: "Data Saved Successfully" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send("Error saving data");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
