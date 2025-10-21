const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const customerRoutes = require("./routes/CustomerRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("api/customers", customerRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
