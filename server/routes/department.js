const express = require("express");
const router = express.Router();
const pool = require("../db/db"); // Assuming you have a PostgreSQL connection pool

// Create department
router.post("/new-department", async (req, res) => {
  try {
    const { name, vision, mision, organization, head } = req.body;

    // Check if the referenced organization exists before inserting
    const organizationCheckQuery = 'SELECT * FROM organization WHERE name = $1';
    const organizationCheckResult = await pool.query(organizationCheckQuery, [organization]);

    if (organizationCheckResult.rows.length === 0) {
      return res.status(400).json({ success: false, error: 'Referenced organization does not exist.' });
    }

    // Assuming 'department' is your table name
    const insertQuery =
      'INSERT INTO department (name, vision, mision, organization, head) VALUES ($1, $2, $3, $4, $5) RETURNING *';

    const result = await pool.query(insertQuery, [name, vision, mision, organization, head]);

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting into the department table:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all departments
router.get("/all-departments", async (req, res) => {
  try {
    const query = 'SELECT * FROM department';
    const result = await pool.query(query);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error retrieving departments:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get department by name
router.get("/get-department/:name", async (req, res) => {
  try {
    const departmentName = req.params.name;
    const query = 'SELECT * FROM department WHERE name = $1';
    const result = await pool.query(query, [departmentName]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Department not found.' });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error retrieving department by name:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

