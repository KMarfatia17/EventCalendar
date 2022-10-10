const express = require("express");
const eventController = require("./eventController");

const router = express.Router();
console.log("entered event routes");
// const date = new Date();
// const today =
// 	date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

// console.log("todays date", today);

router
	.route("/")
	.get(eventController.getAllEvents)
	.post(eventController.insertEvent);

router
	.route("/:id")
	.patch(eventController.updateEventStatus)
	.delete(eventController.deleteEvent);

router.route("/:date").get(eventController.getEventStatus);

module.exports = router;
