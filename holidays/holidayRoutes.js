const express = require("express");
const holidayController = require("./holidayController");

const router = express.Router();
console.log("entered routes");
const date = new Date();
const today =
	date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

console.log("todays date", today);

router
	.route("/")
	.get(holidayController.getAllHolidays)
	.post(holidayController.insertHoliday);

router
	.route("/:id")
	.patch(holidayController.updateHolidayStatus)
	.delete(holidayController.deleteHoliday);

router.route("/:date").get(holidayController.getHolidayStatus);

module.exports = router;
