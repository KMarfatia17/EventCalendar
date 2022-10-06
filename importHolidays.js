const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

const Holiday = require("./holidays/holidayModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("db connection is successful");
	});

const holidays = JSON.parse(
	fs.readFileSync(`${__dirname}/holidays.json`, "utf-8")
);

const importData = async () => {
	try {
		await Holiday.create(holidays);
		console.log("data is successfully loaded!");
	} catch (error) {
		console.log(error);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Holiday.deleteMany();

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
