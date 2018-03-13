var Alexa = require('alexa-sdk');
var https = require("https");
const request = require('request');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.9b1c7354-ee7a-46c5-a245-40ea0c9dd2db';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  //Handles the launch request
  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Ron Swanson Quotes! You can say read to hear a Ron Swanson quote, or say stop to end the session. What would you like to do?', 'Try saying read!');
  },


  //Reads a Ron quote
  'ReadFlavor': function () {

  	https.get(url, (response) => {
            console.info("Response is, Response Status Code: " + response.statusCode + ", Response Message: " + response.statusMessage);
            let rawData = "";
            response.on('data', (chunk) => rawData += chunk);
            response.on('end', () => {
                try {
                    let parsedData = JSON.parse(rawData);
                    if (parsedData.error) {
                        throw new Error(JSON.stringify(parsedData.error));
                    }
                    else {
                    	cardTitle = 'Ron Quote';
                    	cardContent = parsedData[0];
                    	this.emit(':tellWithCard', parsedData[0], cardTitle, cardContent);
                        return;
                    }
                }
                catch (e) {
                    console.error(e);
                    return;
                }
            });
        }).on('error', (e) => {
            console.error(e);
            return;
        });
  },

  'AMAZON.StopIntent': function () {
  // State Automatically Saved with :tell
  this.emit(':tell', `Goodbye.`);
  },

  'AMAZON.CancelIntent': function () {
  // State Automatically Saved with :tell
  this.emit(':tell', `Goodbye.`);
  },

  'SessionEndedRequest': function () {
  // Force State Save When User Times Out
  this.emit(':saveState', true);
  },

  'AMAZON.HelpIntent' : function () {
  this.emit(':ask', 'You can say read to hear a Ron Swanson quote, or say stop to end the session. What would you like to do?',  `What would you like to do?`);
  },

  'Unhandled' : function () {
  this.emit(':ask', `You can say read to hear a Ron Swanson quote, or say stop to end the session. What would you like to do?`,  `What would you like to do?`);
  }

};


    