const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

// Enabling CORS for all routes
app.use(cors());
app.use(router)

module.exports = app;
