const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

const Event = require("./events/eventModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("db connection is successful");
	});

const events = JSON.parse(
	fs.readFileSync(`${__dirname}/events.json`, "utf-8")
);

const importData = async () => {
	try {
		await Event.create(events);
		console.log("data is successfully loaded!");
	} catch (error) {
		console.log(error);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Event.deleteMany();

		console.log("data is successfully deleted!");
	} catch (error) {
		console.log(error);
	}
	process.exit();
};

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}
