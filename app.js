const express = require("express");
const calendarRoute = require("./holidays/holidayRoutes");
const eventRoute = require("./events/eventRoutes");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/holiday", calendarRoute);
app.use("/events", eventRoute);

module.exports = app;
