/* eslint-disable */
const axios = require("axios");
const { google } = require("googleapis");
const Event = require("./eventModel");
const Redis = require("redis");
// const { OAuth2 } = require("googleapis/build/src/apis/oauth2");
const REDIS_EXPIRATION = 3600;
const redisClient = Redis.createClient();

exports.getAllEvents = async (req, res, next) => {
	//  const url =
	// 	"https://api.predicthq.com/v1/events/?within=15mi@40.9513071,-75.9886561&active.gte=2022-10-01&active.lte=2022-12-31&sort=rank";
	const url = `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEW_BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events`;
	var config = {
		method: "get",
		url,
		// headers: { Authorization: `Bearer ${process.env.EVENT_API_KEY}` },
		headers: { key: `${process.env.API_KEY}` },
	};
	// await axios(config)
	// 	.then((response) => {
	// 		console.log(response);
	// 		res.status(200).json({
	// 			status: "success",
	// 			info: response.data.results,
	// 		});
	// 		console.log("hey");
	// 		// this.insertAllEvents(response.data.results);
	// 	})
	// 	.catch((error) => {
	// 		res.status(400).json({ status: "failure", info: error });
	// 	});
	console.log("ahinya sudhin ave che");
	// await redisClient.connect();
	redisClient.get("redis-events", async (error, results) => {
		if (error) console.error(error);
		if (results != null) {
			console.log("cache hit");
			return res.json(JSON.parse(results));
		} else {
			console.log("cache miss");
			const {
				response: {
					data: { results },
				},
			} = await axios(config);
			redisClient.setEx(
				"redis-events",
				REDIS_EXPIRATION,
				JSON.stringify(results)
			);
			res.json(results);
		}
	});

	// this.insertAllEvents(response.data.results);
};

exports.getEventStatus = async (req, res, next) => {
	try {
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
};

exports.insertEvent = async (req, res, next) => {
	try {
		console.log("controller called", req.body.date);
		req.body.date = req.body.date.replace(/\//g, "-");

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
};

exports.insertAllEvents = (predictHQEvents) => {
	let events = predictHQEvents.map((event) => {
		let eventObj = {
			eventId: event.id,
			eventName: event.title,
			eventDescription: event.description,
			eventCategory: event.category,
			eventDate: event.start,
			location: event.location,
		};
		return eventObj;
	});
	Event.bulkWrite(
		events.map((event) => ({
			updateOne: {
				filter: { eventId: event.eventId },
				update: { $set: event },
				upsert: true,
			},
		}))
	)
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.updateEventStatus = async (req, res, next) => {
	try {
		const eventDetails = await Event.findByIdAndUpdate(req.params.id, req.body);

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
};

exports.deleteEvent = async (req, res, next) => {
	try {
		const eventDetails = await Event.deleteOne({ _id: req.params.id });
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

exports.deleteAllEvents = async (req, res, next) => {
	try {
		const eventDetails = await Event.deleteMany({});
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
