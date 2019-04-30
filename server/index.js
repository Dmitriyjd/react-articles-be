const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const {
	APP_PORT, db_name, host, db_port, allowedOrigins
} = require('./config');

const app = express();

//cors middleware
app.use(cors({
	origin(origin, callback) {
		const even = allowedOrigins.some(element => element === origin);
		callback(null, even);
	},
	preflightContinue: true,
	optionsSuccessStatus: 200,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//start app, connect to db
mongoose.connect(`mongodb://${host}:${db_port}/${db_name}`)
	.then(() => {
		app.listen(APP_PORT, () => {
			console.info(`App listening on port ${APP_PORT}!`);
		});
	});

module.exports = app;
