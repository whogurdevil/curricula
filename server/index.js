// app.js
const express = require("express");
const app = express();
const cors = require("cors");
const organizationRoutes = require("./routes/organization"); // Import organizationRoutes
const departmentRoutes = require("./routes/department");
const programRoutes = require("./routes/program")
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/organization", organizationRoutes);
app.use("/department", departmentRoutes);
app.use("/program", programRoutes);



app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
