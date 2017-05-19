var fs = require("fs");
var dash_button = require('node-dash-button');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
var dash = dash_button(config.mac_address, null, null, 'udp');

console.log("Poof activated @ " + getTime());
dash.on("detected", function (){
	log("Button pressed!");
});

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