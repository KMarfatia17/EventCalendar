const express = require("express");
const calendarRoute = require("./holidays/holidayRoutes");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/", calendarRoute);

module.exports = app;
