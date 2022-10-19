/* eslint-disable */
const axios = require("axios");
const { google } = require("googleapis");
const Event = require("./eventModel");
// const { OAuth2 } = require("googleapis/build/src/apis/oauth2");

exports.getAllEvents = async (req, res, next) => {
	// const { OAuth2 } = google.auth;

	// const oAuth2Client = new OAuth2(
	// 	"http://764877352420-qkr8q98b55gcol6tm6cmd2ci52b61pq9.apps.googleusercontent.com",
	// 	"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"
	// );

	// oAuth2Client.setCredentials({
	// 	refresh_token:
	// 		"1//04kZHH8oQGHcuCgYIARAAGAQSNwF-L9IrZUCW89nP2yWvrtss-Hmyg1G4XwCkVuukNZpdnKp7hAh_hQ66sfyAi0ul0tfrS9pbAZ",
	// });

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

	// const url = `${process.env.BASE_CALENDAR_URL}/${process.env.CALENDAR_REGION}#${process.env.BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}`;
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
	// 	.then((response) => {
	// 		console.log("see response".response.data);
	// 		res.status(200).json({ info: response.data });
	// 	})
	// 	.catch((response) => {
	// 		console.log("error response", response.data);
	// 		res.status(400).json({ info: response.data });
	// 	});

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

	// const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

	// console.log("hey", calendar.context.google);
	//console.log("fex value", fex.data);

	// console.log("get status entered", req.params.date);
	// const dayDetails = await Day.findOne({ _id: { $eq: req.params.id } });
	// const eventDetails = await Event.find({});
	// console.log("hi from all events");

	const url = "https://api.predicthq.com/v1/events/";
	// const url = "https://catfact.ninja/fact";
	// await axios(url, {
	// 	headers: {
	// 		Authorization: `Bearer ${process.env.EVENT_API_KEY}`,
	// 	},
	// })
	// 	.then((response) => {
	// 		res.status(200).json({ status: "success", data: response.data.results });
	// 	})
	// 	.catch((response) => {
	// 		res.status(400).json({ status: "failure" });
	// 	});

	var config = {
		method: "get",
		url,
		headers: { Authorization: `Bearer ${process.env.EVENT_API_KEY}` },
	};
	// await axios(url, {
	// 	headers: { "content-type": "application/x-www-form-urlencoded" },
	// })
	await axios(config)
		.then((response) => {
			// console.log("success response", response);
			res.status(200).json({ status: "success", info: response.data.results });
		})
		.catch((response) => {
			// console.log("error response", response);
			res.status(400).json({ status: "failure", info: response });
		});

	// const encodedParams = new URLSearchParams();
	// encodedParams.append("consumerKey", "<REQUIRED>");
	// encodedParams.append("consumerSecret", "<REQUIRED>");
	// encodedParams.append("appKey", "<REQUIRED>");

	// const options = {
	// 	method: "POST",
	// 	url: "https://eventfulvolodimir-kudriachenkov1.p.rapidapi.com/searchEvents",
	// 	headers: {
	// 		"content-type": "application/x-www-form-urlencoded",
	// 		"X-RapidAPI-Key": "6cc6969e35msh21cd15cff0c4d2fp1bae92jsnddd55824ef5a",
	// 		"X-RapidAPI-Host": "Eventfulvolodimir-kudriachenkoV1.p.rapidapi.com",
	// 	},
	// 	data: encodedParams,
	// };
	// console.log("no");
	// axios
	// 	.request(options)
	// 	.then(function (response) {
	// 		console.log("hey");
	// 		console.log(response.data);
	// 	})
	// 	.catch(function (error) {
	// 		console.log("hey error");
	// 		console.error(error);
	// 	});

	//next();
};

exports.getEventStatus = async (req, res, next) => {
	try {
		// console.log("get status entered", req.params.date);
		// const dayDetails = await Day.findOne({ _id: { $eq: req.params.id } });
		const eventDetails = await Event.findOne({
			start: { $eq: req.params.date },
		});
		res.status(200).json({
			status: "success",
			data: eventDetails,
		});
	} catch (error) {
		res.status(402).json({
			status: "failure",
			message: error.message,
		});
	}

	// next();
};

exports.insertEvent = async (req, res, next) => {
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
		const eventDetails = await Event.create(req.body);

		res.status(200).json({
			status: "success",
			data: eventDetails,
		});
	} catch (error) {
		res.status(401).json({
			status: "failure",
			message: error.message,
		});
	}

	// next();
};

exports.updateEventStatus = async (req, res, next) => {
	try {
		const eventDetails = await Event.findByIdAndUpdate(
			req.params.id,
			req.body
			// { upsert: true }
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

		// find gives an array and array.save() does not work so used finOne => object
		// await holidayDetails.save();

		res.status(200).json({
			status: "success",
			data: eventDetails,
		});
	} catch (error) {
		res.status(401).json({
			status: "failure",
			message: error.message,
		});
	}

	// next();
};

exports.deleteEvent = async (req, res, next) => {
	try {
		const eventDetails = await Event.remove({ _id: req.params.id });
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
