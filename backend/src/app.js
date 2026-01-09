const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const customerRoutes = require("./routes/CustomerRoutes");
const authRoutes = require("./routes/AuthRoutes");
const authJwt = require("./middlewares/AuthJwt");
const loanRoutes = require("./routes/LoanRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authJwt.verifyToken, userRoutes);
app.use("/api/customers", authJwt.verifyToken, customerRoutes);
app.use("/api/loans", authJwt.verifyToken, loanRoutes);

module.exports = app;
