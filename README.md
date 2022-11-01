# Predict HQ API for events and stuff like holidays, places, Broadcasts, Features API, Account:

=> https://www.predicthq.com/ - hub of upcoming events and holidays (Paid service and 14 day trial after making an account).

=> https://docs.predicthq.com/ - to read the documentation.

=> https://www.predicthq.com/support/how-to-create-an-api-token - to get access token for sending requests to predict hq APIs.

=> https://docs.predicthq.com/start/locations - documents to refer locations

=> GET https://api.predicthq.com/v1/events/?within=15mi@40.9513071,-75.9886561&active.gte=2022-10-01&active.lte=2022-12-31&sort=rank HTTP/1.1 - to get the events near by the radial distance in miles from the given co-ordinates and other filters.

=> GET v1/events/?country=US&category=public-holidays,school-holidays&active.gte=2018-01-01&active.lte=2018-12-31 HTTP/1.1 - to get country specific public holidays and school holidays within a date range.

=> https://control.predicthq.com/explorer/events - after login you can refer to this link and filter the data available.

## sample data for urls

GET "https://api.predicthq.com/v1/places/?q=Nottingham,England" \

Response of above url :

```json
{
	"id": "2641170",
	"type": "locality",
	"name": "Nottingham",
	"county": "Nottingham",
	"region": "England",
	"country": "United Kingdom",
	"country_alpha2": "GB",
	"country_alpha3": "GBR",
	"location": [-1.15047, 52.9536]
}
```

GET https://api.predicthq.com/v1/events/?within=15mi@40.9513071,-75.9886561&active.gte=2022-10-01&active.lte=2022-12-31&sort=rank

Response of above url :

```json
{
	"relevance": null,
	"id": "FA6FzfY5zzaa9eTzye",
	"title": "Election for US House of Representatives",
	"description": "This election will determine the 435 seats of the House of Representatives of the United States of America. This election is expected to be held by 8 November 2022.",
	"category": "politics",
	"labels": ["election", "parliament", "politics"],
	"rank": 94,
	"local_rank": null,
	"aviation_rank": null,
	"phq_attendance": null,
	"entities": [
		{
			"entity_id": "BzeEvuZAgevFWN2dgAky5r",
			"name": "Election for US House of Representatives",
			"type": "event-group",
			"category": "politics",
			"labels": ["event-group"]
		}
	],
	"duration": 86399,
	"start": "2022-11-08T00:00:00Z",
	"end": "2022-11-08T23:59:59Z",
	"updated": "2022-10-04T14:32:56Z",
	"first_seen": "2021-08-31T06:57:26Z",
	"timezone": null,
	"location": [-95.712891, 37.09024],
	"geo": {
		"geometry": {
			"type": "Point",
			"coordinates": [-95.712891, 37.09024]
		}
	}
}
```

# Code snippets:

//https://stackoverflow.com/questions/54714148/mongoose-update-or-insert-many-documents

req.body.date = req.body.date.replace(/\//g, "-");
const eventDetails = await Event.create(req.body);

    	res.status(200).json({
    		status: "success",
    		data: eventDetails,
    	});

## removed commented code :

    // Day.aggregate([
    	// 	{
    	// 		$date: {
    	// 			dateOnly: {
    	// 				$dateToString: { format: "YYYY-MM-DD", date: req.body.date },
    	// 			},
    	// 		},
    	// 	},
    	// ]); (imp)
    	// req.body.date = new Date(req.body.date);
    	// req.body.date = new Date(req.body.date);
    	// console.log("again", req.body.date);

        // const dayDetails = await Day.findOne({ \_id: { $eq: req.params.id } }); (imp)

        // await holidayDetails.save(); (imp)

        // find gives an array and array.save() does not work so used finOne => object (imp)

---

# Google calendar API:

https://console.cloud.google.com/ - to create google project on the cloud select google calendar API to be enabled.

https://developers.google.com/calendar/api/guides/overview?hl=en_US - to read the documents about the google calendar.

https://console.cloud.google.com/apis/credentials - to setup credentials for API like api key, client id, secret key Oauht client while logged in to your google account.

https://calendar.google.com/ - clicking on the options of the selected calendar and get the calendar ID from the calendar settings and sharing

https://developers.google.com/oauthplayground/ - playground to enable calendar services for the oAuth authentication if you choose.

url to get public holidays region specific - ${process.env.BASE_CALENDAR_URL}/${process.env.CALENDAR_REGION}%23${process.env.BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${process.env.API_KEY}
