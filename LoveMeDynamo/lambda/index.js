var Alexa = require('alexa-sdk');

// Data
var compliment = require('compliment');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Hi there beautiful.  Say give me love or categories to get started.', 'Try saying give me love so I can compliment you.');
  },

  'GiveLove': function () {
  	let items = compliment;
    this.emit(':ask', compliment + " Would you like to hear another?");
  },

  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye, beautiful.`);
  },
  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye, beautiful.`);
  },
  'SessionEndedRequest': function () {
    // Force State Save When User Times Out
    this.emit(':saveState', true);
  },
  'AMAZON.HelpIntent' : function () {
    this.emit(':ask', `You can ask me to give you love and I will shower you with it. Or you can say stop to end our session.  What would you like to do?`,  `What would you like to do?`);
  },
  'Unhandled' : function () {
    this.emit(':ask', `You can ask me to give you love and I will shower you with it. Or you can say stop to end our session.  What would you like to do?`,  `What would you like to do?`);
  }

};