const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// Create organization
router.post("/new-organization", async (req, res) => {
    try {
        const data = req.body;
        const newOrganization = await pool.query(`
            INSERT INTO organization (name, vision, mission)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [data.name, data.vision, data.mission]);

        res.json(newOrganization.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get organization by name
router.get("/get-organization/:name", async (req, res) => {
    try {
        const { name } = req.params;
        const organization = await pool.query(`
            SELECT * FROM organization
            WHERE name = $1;
        `, [name]);

        if (organization.rows.length === 0) {
            return res.status(404).json({ message: "Organization not found" });
        }

        res.json(organization.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
