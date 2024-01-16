const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// Create new curriculum
router.post("/new-curriculum", async (req, res) => {
  try {
    const { name, departmentId, programId, from, to } = req.body;

    // Check if the referenced department exists before inserting
    const departmentCheckQuery = 'SELECT * FROM department WHERE id = $1';
    const departmentCheckResult = await pool.query(departmentCheckQuery, [departmentId]);

    if (departmentCheckResult.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Referenced department does not exist.' });
    }

    // Check if the referenced program exists before inserting
    const programCheckQuery = 'SELECT * FROM program WHERE id = $1';
    const programCheckResult = await pool.query(programCheckQuery, [programId]);

    if (programCheckResult.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Referenced program does not exist.' });
    }

    const insertQuery =
      'INSERT INTO curriculum (name, departmentId, programId, from, to) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    const result = await pool.query(insertQuery, [name, departmentId, programId, from, to]);

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting into the curriculum table:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all curricula
router.get("/all-curriculums", async (req, res) => {
  try {
    const query = 'SELECT * FROM curriculum';
    const result = await pool.query(query);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error retrieving curriculum:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get curriculum by ID
router.get("/get-curriculum-by-id/:id", async (req, res) => {
  try {
    const curriculumId = req.params.id;
    const query = 'SELECT * FROM curriculum WHERE id = $1';
    const result = await pool.query(query, [curriculumId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Curriculum not found.' });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error retrieving curriculum by ID:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
