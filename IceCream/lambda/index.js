var Alexa = require('alexa-sdk');

var flavors = ["strawberry", "chocolate", "vanilla", "mint chocolate chip"];

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.41b68f8c-dc8c-48cd-b794-3ee33271749e';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  //Handles the launch request
  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to the ice cream truck! Ask to hear the flavors', 'Try asking what the flavors are.');
  },


  //Reads the list of ice cream flavors
  'ReadFlavors': function () {
    this.emit(':tell', 'Our ice cream flavors are ' + flavors.join(", "));
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

  // Provide help function
  'AMAZON.HelpIntent' : function () {
  this.emit(':ask', 'You can say tell me flavors to hear ice cream flavors. What would you like to do?',  `What would you like to do?`);
  },

  'Unhandled' : function () {
  this.emit(':ask', `You can say tell me flavors to hear ice cream flavors. What would you like to do?`,  `What would you like to do?`);
  }

};


    