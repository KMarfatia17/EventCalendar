const mongoose = require("mongoose");
const moment = require("moment");

const eventSchema = mongoose.Schema({
	relevance: Number,
	id: String,
	title: String,
	description: String,
	category: String,
	labels: [[String]],
	rank: Number,
	local_rank: Number,
	aviation_rank: String,
	phq_attendance: Number,
	entities: [
		{
			formatted_address: String,
			type: { type: String },
			name: String,
			entity_id: String,
		},
	],
	duration: Number,
	start: Date,
	end: Date,
	updated: Date,
	first_seen: Date,
	timezone: String,
	location: [[Number]],
	geo: {
		geometry: {
			type: { type: String },
			coordinates: [[Number]],
		},
	},
	scope: String,
	country: String,
	place_hierarchies: [[String]],
	state: String,
	brand_safe: Boolean,
	private: Boolean,
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
	{ start: 1, end: 1, title: 1, description: 1 },
	{ unique: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
