var fs = require("fs");
var dash_button = require('node-dash-button');
var nodemailer = require('nodemailer');


var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
var transporter;
var dash = dash_button(config.mac_address, null, null, 'udp');

init();

/**
 * Initializes the program.
 */
 function init() {
 	dash.on("detected", function (){
 		log("Button pressed!");
 		notify("Button pressed!");
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
 }

/**
 * Sends an email to the "email_to_notify" set in the config with the given message.
 * @param  {String} message The message to send
 */
 function notify(message) {
 	sendEmail(config.email_to_notify, "🛎 " + getTime(), message);
 }

/**
 * Sends an email with the given parameters.
 * @param  {String}  to      The email address of the person to send the email to
 * @param  {String}  subject The subject of the email
 * @param  {String}  message The body of the email in plain-text
 * @param  {Boolean} [mute]  Whether or not to mute the console output (Default is false)
 */
 function sendEmail(to, subject, message, mute) {
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
 		} else if ((mute !== undefined && !mute) || mute === undefined) {
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