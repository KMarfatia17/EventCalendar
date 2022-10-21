const mongoose = require("mongoose");
const moment = require("moment");

const eventSchema = mongoose.Schema({
	eventId: String,
	eventName: String,
	eventDescription: String,
	eventCategory: String,
	eventDate: Date,
	location: [[Number]],
});

// daySchema.pre("save", function (next) {
// 	console.log("pre entered");
// 	const iskatype = typeof this.date;

// 	// console.log("this.date type walu", this.date.toString());
// 	console.log("this.date", moment(this.date.toString()).format("DD-MM-YYYY"));
// 	this.date = moment(this.date.toString()).format("DD-MM-YYYY");
// 	next();
// });

// eventSchema.index(
// 	{ start: 1, end: 1, title: 1, description: 1 },
// 	{ unique: true }
// );

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
