/* eslint-disable */
const axios = require("axios");
// const { google } = require("googleapis");
const Holiday = require("./holidayModel");

exports.getAllHolidays = async (req, res, next) => {
	const url = `${process.env.BASE_CALENDAR_URL}/${process.env.CALENDAR_REGION}%23${process.env.BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${process.env.API_KEY}`;

	var config = {
		method: "get",
		url,
		headers: {},
	};

	await axios(config)
		.then((response) => {
			res.status(200).json({ status: "success", info: response.data.items });
			this.insertAllHolidays(response.data.items);
		})
		.catch((response) => {
			res.status(400).json({ status: "failure", info: response });
		});
};

exports.getHolidayStatus = async (req, res, next) => {
	try {
		const holidayDetails = await Holiday.findOne({
			"start.date": { $eq: req.params.date },
		});
		res.status(200).json({
			status: "success",
			data: holidayDetails,
		});
	} catch (error) {
		res.status(402).json({
			status: "failure",
			message: error.message,
		});
	}
};

exports.insertHoliday = async (req, res, next) => {
	try {
		console.log("controller called", req.body.date);
		req.body.date = req.body.date.replace(/\//g, "-");

		const holidayDetails = await Holiday.create(req.body);

		res.status(200).json({
			status: "success",
			data: holidayDetails,
		});
	} catch (error) {
		res.status(401).json({
			status: "failure",
			message: error.message,
		});
	}
};

exports.insertAllHolidays = (GCHolidays) => {
	let holidays = GCHolidays.map((holiday) => {
		let holidayObj = {
			holidayId: holiday.id,
			holidayName: holiday.summary,
			holidayDescription: holiday.description,
			holidayDate: holiday.start.date,
		};
		return holidayObj;
	});

	Holiday.bulkWrite(
		holidays.map((holiday) => ({
			updateOne: {
				filter: { holidayId: holiday.holidayId },
				update: { $set: holiday },
				upsert: true,
			},
		}))
	)
		.then((response) => {
			// console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.updateHolidayStatus = async (req, res, next) => {
	try {
		const holidayDetails = await Holiday.findByIdAndUpdate(
			req.params.id,
			req.body
		);

		res.status(200).json({
			status: "success",
			data: holidayDetails,
		});
	} catch (error) {
		res.status(401).json({
			status: "failure",
			message: error.message,
		});
	}
};

exports.deleteHoliday = async (req, res, next) => {
	try {
		const dayDetails = await Holiday.remove({ _id: req.params.id });
		res.status(200).json({
			status: "success",
		});
	} catch (error) {
		res.status(401).json({
			status: "failure",
			message: error.message,
		});
	}
};
