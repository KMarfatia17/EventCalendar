const mongoose = require("mongoose");
const moment = require("moment");

const holidaySchema = mongoose.Schema({
	// kind: String,
	// etag: String,
	// id: String,
	// Status: String,
	// htmlLink: String,
	// created: Date,
	// updated: Date,
	// summary: String,
	// description: String,
	// creator: {
	// 	email: String,
	// 	displayName: String,
	// 	self: Boolean,
	// },
	// organizer: {
	// 	email: String,
	// 	displayName: String,
	// 	self: Boolean,
	// },
	// start: {
	// 	date: String,
	// },
	// end: {
	// 	date: String,
	// },
	// transparency: String,
	// visibility: String,
	// iCalUID: String,
	// sequence: Number,
	// eventType: String,
	holidayId: String,
	holidayName: String,
	holidayDescription: String,
	// holidayCategory: String,
	holidayDate: Date,
	// location: [[Number]],
});

// daySchema.pre("save", function (next) {
// 	console.log("pre entered");
// 	const iskatype = typeof this.date;

// 	// console.log("this.date type walu", this.date.toString());
// 	console.log("this.date", moment(this.date.toString()).format("DD-MM-YYYY"));
// 	this.date = moment(this.date.toString()).format("DD-MM-YYYY");
// 	next();
// });

// holidaySchema.index({ start: 1, end: 1, summary: 1 }, { unique: true });
// holidaySchema.index({ holidayId: 1 }, { unique: true });

const Holiday = mongoose.model("Holiday", holidaySchema);

module.exports = Holiday;
