var fs = require("fs");
var dash_button = require('node-dash-button');
var nodemailer = require('nodemailer');
var request = require('request');


var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
var transporter;
var dash = dash_button(config.mac_address, null, null, 'udp');
var timeLastPressed = Math.floor(new Date().getTime() / 1000);

init();

/**
 * Initializes the program.
 */
 function init() {
 	dash.on("detected", function (){
 		var currentTime = Math.floor(new Date().getTime() / 1000);
 		log("Button pressed! Time since last press: " + (timeLastPressed - currentTime));
 		if (timeLastPressed === 0 || currentTime - timeLastPressed > config.cooldown) {
 			timeLastPressed = currentTime;
 			notify();
 		} else {
 			log("Cooldown period still active! Time remaining: " + (config.cooldown - (currentTime - timeLastPressed)));
 		}
 	});

 	transporter = nodemailer.createTransport({
 		host: 'smtp.gmail.com',
 		port: 465,
 		secure: true,
 		auth: {
 			user: config.gmail,
 			pass: config.gmail_password
 		}
 	});
 	console.log("Poof activated @ " + getTime());
 	notify();
 }

/**
 * Sends an email to the "email_to_notify" set in the config with the specified message and a random gif.
 */
 function notify() {
 	request("http://api.giphy.com/v1/gifs/random?api_key=" + config.giphy_key + "&tag=" + config.giphy_tag, function (error, response, body) {
 		var gif = "";
 		if (!error && response.statusCode == 200) {
 			gif = "\n" + JSON.parse(body).data.url;
 		}
 		var subject = config.message_subject.replace("[TIME]", getTime()).replace("[time]", getTime());
 		sendEmail(config.email_to_notify, subject, config.message + gif);
 	});
 }

/**
 * Sends an email with the given parameters.
 * @param  {String}  to           The email address of the person to send the email to
 * @param  {String}  subject      The subject of the email
 * @param  {String}  message      The body of the email in plain-text
 */
 function sendEmail(to, subject, message) {
 	var options = {
 		from: '"Poof" <' + config.gmail + '>',
 		to: to,
 		subject: subject,
 		text: message
 	};
 	transporter.sendMail(options, function(error, info) {
 		if(error){
 			log("Error sending email:", error);
 			return;
 		} else {
 			log("Email sent to " + to + ": [" + subject + "] " + options.text);
 		}
 	});
 }

/**
 * Prints output to console along with timestamp.
 * @param  {String} output The text to output
 */
 function log(output) {
 	console.log(getTime() + " " + output);
 }

/**
 * Returns the formatted time.
 * @return {String} The time, formatted to look all nice and pretty-like
 */
 function getTime() {
 	return "[" + new Date().toLocaleString().split(", ")[1] + "]";
 }