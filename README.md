# Poof.js - Combining Amazon Dash with the power of GIFs
Poof turns your Amazon Dash button into a button that sends a message and a random GIF every time it is pressed!

![](https://media.giphy.com/media/gAu1HzySQ6dqM/giphy.gif?response_id=591f725cfb2bf791ad7a045d)

### How it Works
Each time the configured Amazon Dash button is pressed, Poof sends an email containing a custom message and a link to a random gif from GIPHY relating to certain keywords. For example, it can be used as a doorbell, with each press sending an email with a message like "Ding dong!" and a gif of a door to your phone's MMS gateway. Or you can use it as an emergency happiness button, with each press emailing you a gif of puppies and kittens!

### Requirements
- An Amazon Dash device, connected to the internet but WITHOUT any products linked to it
- The MAC address of the Amazon Dash device (if you have trouble finding it, install [this](https://github.com/hortinstein/node-dash-button) node package and use the test program to find your address)
- A computer to run the program on, with Node.js installed
- A gmail account to send the emails from (with access enabled for "Less Secure Applications")
- The following node.js packages are required: [NodeMailer](https://nodemailer.com/about/) and [Node-Dash-Button](https://github.com/hortinstein/node-dash-button)
I recommend using learning your MMS gateway email, so that Poof can send emails directly to your texts (standard messaging rates apply). If you don't know what an MMS gateway is, [click here](https://www.digitaltrends.com/mobile/how-to-send-e-mail-to-sms-text/) for more information!

### How to Use
Create a file named "config.json" that follows the same pattern given in the example_config, but with the blanks filled in. Here is a breakdown of the config:
```javascript
{
	"mac_address": "...", //The MAC address of the Dash button (if you have trouble finding it, install [this](https://github.com/hortinstein/node-dash-button) node package and use the test program to find your address). Please make sure you have not set any products to be bought when the button is pressed, or you will have a bad time.
	"gmail": "...", //The Gmail to send the emails from (I recommend a custom account is made). This account must have access from Less Secure Apps enabled to work properly
	"gmail_password": "...", //The password to the Gmail account
	"email_to_notify": "...", //The email address of the person to notify. I recommend using a MMS gateway email so that you can be texted notifications (Standard messaging rates apply)
	"message_subject": "🛎 [TIME]", //The subject of the email to send. The program automatically replaces "[TIME]" with a timestamp
	"message": "Ding dong!", //The message of the email to send
	"giphy_key": "dc6zaTOxFJmzC", //Your API key for GIPHY. Default is the public key for GIPHY, though API limits can apply
	"giphy_tag": "hello", //The tag that will be used to search for GIF's to send
	"cooldown": 60 //The amount of time (in seconds) that must pass before pressing the button will send another message (this is to limit spamming)
}
```
Place the config.json file in the same directory as the program, and you should be all set! Just run the program from Node.js and you should be good to go. Make sure you have installed the Node.js dependencies required first, which include [NodeMailer](https://nodemailer.com/about/) and [Node-Dash-Button](https://github.com/hortinstein/node-dash-button).
Special thanks to the [Node-Dash-Button](https://github.com/hortinstein/node-dash-button) module for creating the API that interacts with the Amazon Dash button!
