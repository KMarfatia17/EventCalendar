const mongoose = require("mongoose");
const moment = require("moment");

const eventSchema = mongoose.Schema({
	name: String,
	description: String,
	country: String,
	location: String,
	type: String,
	date: String,
	date_year: Number,
	date_month: Number,
	date_day: Number,
	week_day: String,
});

// daySchema.pre("save", function (next) {
// 	console.log("pre entered");
// 	const iskatype = typeof this.date;

// 	// console.log("this.date type walu", this.date.toString());
// 	console.log("this.date", moment(this.date.toString()).format("DD-MM-YYYY"));
// 	this.date = moment(this.date.toString()).format("DD-MM-YYYY");
// 	next();
// });

eventSchema.index(
	{ date_day: 1, date_month: 1, date_year: 1, name: 1 },
	{ unique: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
