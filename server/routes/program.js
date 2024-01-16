const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// Create program
router.post("/new-program", async (req, res) => {
  try {
    const { name, owner, description, department } = req.body;

    const insertQuery =
      'INSERT INTO program (name, owner, description, department) VALUES ($1, $2, $3, $4) RETURNING *';

    const result = await pool.query(insertQuery, [name, owner, description, department]);

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting into the program table:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all programs
router.get("/all-programs", async (req, res) => {
  try {
    const selectQuery = 'SELECT * FROM program';
    const result = await pool.query(selectQuery);

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
