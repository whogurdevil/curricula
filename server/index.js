// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const organizationRoutes = require("./routes/organization"); // Import organizationRoutes
const pool = require("./db/db");
const departmentRoutes = require("./routes/department");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/organization", organizationRoutes);
app.use("/department", departmentRoutes);



app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
