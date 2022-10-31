/* eslint-disable */
const axios = require("axios");
const { google } = require("googleapis");
const Holiday = require("./holidayModel");
// const { OAuth2 } = require("googleapis/build/src/apis/oauth2");

exports.getAllHolidays = async (req, res, next) => {
	// const { OAuth2 } = google.auth;

	// const oAuth2Client = new OAuth2(
	// 	"764877352420-cop1652kh47r26poesagm465mla9k8ui.apps.googleusercontent.com",
	// 	"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"
	// );

	// oAuth2Client.setCredentials({
	// 	refresh_token:
	// 		"1//04kZHH8oQGHcuCgYIARAAGAQSNwF-L9IrZUCW89nP2yWvrtss-Hmyg1G4XwCkVuukNZpdnKp7hAh_hQ66sfyAi0ul0tfrS9pbAZ",
	// });

	// const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

	// const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
	// const GOOGLE_PRIVATE_KEY = "<private-key>";
	// const GOOGLE_CLIENT_EMAIL = "<client-email>";
	// const GOOGLE_PROJECT_NUMBER = "<project-number>";
	// const GOOGLE_CALENDAR_ID = "<calendar-id>";

	// const jwtClient = new google.auth.JWT(
	// 	GOOGLE_CLIENT_EMAIL,
	// 	null,
	// 	GOOGLE_PRIVATE_KEY,
	// 	SCOPES
	// );

	const url = `${process.env.BASE_CALENDAR_URL}/${process.env.CALENDAR_REGION}%23${process.env.BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${process.env.API_KEY}`;
	// const url =
	// 	"https://calendar.google.com/calendar/embed?src=en.indian%23holiday%40group.v.calendar.google.com";
	// const url2 = "https://catfact.ninja/fact";
	// /events?key=${process.env.SECRET_KEY}

	// try {
	// 	const resp = await axios(url, {
	// 		headers: { "x-api-key": process.env.API_KEY },
	// 	});
	// 	// headers: {
	// 	// 	"x-api-key": process.env.API_KEY,
	// 	// },

	// 	// const response = await axios(url);
	// 	// response.data.entries.map((data) => {
	// 	// 	console.log(data);
	// 	// });
	// 	// console.log(response);
	// 	res.status(200).json({
	// 		response: resp,
	// 	});
	// } catch (error) {
	// 	console.log(error);
	// 	res.status(401).json({
	// 		message: error,
	// 	});
	// }

	// axios(
	// 	url2
	// 	// config: {
	// 	// 	headers: {
	// 	// 		Authorization: oAuth2Client,
	// 	// 	},
	// 	// },
	// )

	// await axios(url, {
	// 	headers: {
	// 		Authorization: oAuth2Client,
	// 	},
	// })
	var config = {
		method: "get",
		url,
		headers: {},
	};
	// await axios(url, {
	// 	headers: { "content-type": "application/x-www-form-urlencoded" },
	// })
	await axios(config)
		.then((response) => {
			// console.log("success response", response);
			res.status(200).json({ status: "success", info: response.data.items });
			this.insertAllHolidays(response.data.items);
		})
		.catch((response) => {
			// console.log("error response", response);
			res.status(400).json({ status: "failure", info: response });
		});

	// .then(function (response) {
	// 	//handle success
	// 	res.status(200).json({
	// 		response,
	// 	});
	// 	console.log(response);
	// })
	// .catch(function (response) {
	// 	//handle error
	// 	res.status(400).json({
	// 		response,
	// 	});
	// 	console.log(response);
	// });

	// console.log("hey", calendar.context.google);
	//console.log("fex value", fex.data);

	//1) code to keep
	// try {
	// 	// console.log("get status entered", req.params.date);
	// 	// const dayDetails = await Day.findOne({ _id: { $eq: req.params.id } });
	// 	const holidayDetails = await Holiday.find({});
	// 	res.status(200).json({
	// 		status: "success",
	// 		data: holidayDetails,
	// 	});
	// } catch (error) {
	// 	res.status(402).json({
	// 		status: "failure",
	// 		message: error.message,
	// 	});
	// }

	// next();
};

exports.getHolidayStatus = async (req, res, next) => {
	try {
		// console.log("get status entered", req.params.date);
		// const dayDetails = await Day.findOne({ _id: { $eq: req.params.id } });
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

	//next();
};

exports.insertHoliday = async (req, res, next) => {
	try {
		// req.body.date = new Date(req.body.date);
		console.log("controller called", req.body.date);
		req.body.date = req.body.date.replace(/\//g, "-");
		// Day.aggregate([
		// 	{
		// 		$date: {
		// 			dateOnly: {
		// 				$dateToString: { format: "YYYY-MM-DD", date: req.body.date },
		// 			},
		// 		},
		// 	},
		// ]);
		// req.body.date = new Date(req.body.date);
		// req.body.date = new Date(req.body.date);
		// console.log("again", req.body.date);
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

	// next();
};

exports.insertAllHolidays = (GCHolidays) => {
	let holidays = GCHolidays.map((holiday) => {
		let holidayObj = {
			holidayId: holiday.id,
			holidayName: holiday.summary,
			holidayDescription: holiday.description,
			// holidayCategory: holiday.category,
			holidayDate: holiday.start.date,
			// location: holiday.location,
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
		// console.log("holiday details ", holidayDetails);
		// holidayDetails.description = req.body.description;
		// holidayDetails.country = req.body.country;
		// holidayDetails.location = req.body.location;
		// holidayDetails.type = req.body.type;
		// holidayDetails.date = req.body.date;
		// holidayDetails.date_year = req.body.date_year;
		// holidayDetails.date_month = req.body.date_month;
		// holidayDetails.date_day = req.body.date_day;
		// holidayDetails.week_day = req.body.week_day;
		console.log("body", req.body);
		// find gives an array and array.save() does not work so used finOne => object
		// await holidayDetails.save();

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

	// next();
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

	// next();
};
