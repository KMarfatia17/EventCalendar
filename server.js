const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		// useCreateIndex: true,
		// useFindAndModify: false
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("db connection is successful");
	})
	.catch((err) => console.log("see this is the error", err));

const port = 4000;

const server = app.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
