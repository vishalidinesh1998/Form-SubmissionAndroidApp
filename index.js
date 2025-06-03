const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Render PostgreSQL database connection info
const pool = new Pool({
  user: "usersinfo_user",
  host: "dpg-d0v706q4d50c73e7rcug-a",
  database: "usersinfo",
  password: "ohEzwfDK5EhmbR2VXLCAcRhoRD2lZhAn",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ error: "Please provide name, email and message." });
  }

  try {
    const query = `INSERT INTO contact_data (name, email, message) VALUES ($1, $2, $3)`;
    await pool.query(query, [name, email, message]);
    res.send({ message: "Data Saved Successfully" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send({ error: "Error saving data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
