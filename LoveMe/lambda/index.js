var Alexa = require('alexa-sdk');

// Data
var compliments = require('./data/compliments');
var categories = require('./data/categories');

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
  	var index = Math.floor(Math.random()*compliments.compliments.length);
  	var subIndex = Math.floor(Math.random()*compliments.compliments[index][Object.keys(compliments.compliments[index])[0]].length);
    this.emit(':tell', JSON.stringify(compliments.compliments[index][Object.keys(compliments.compliments[index])[0]][subIndex]));
  },


  'ListCategories': function () {
  	this.emit(':tell', JSON.stringify(categories));
  },

  'Shakespearean': function () {
  	var index = Math.floor(Math.random()*compliments.compliments[0][Object.keys(compliments.compliments[0])[0]].length);
  	this.emit(':tell', JSON.stringify(compliments.compliments[0][Object.keys(compliments.compliments[0])[0]][index]));
  },

  'Odd': function () {
  	var index = Math.floor(Math.random()*compliments.compliments[1][Object.keys(compliments.compliments[1])[0]].length);
  	this.emit(':tell', JSON.stringify(compliments.compliments[1][Object.keys(compliments.compliments[1])[0]][index]));
  },

  'Backhanded': function () {
  	var index = Math.floor(Math.random()*compliments.compliments[2][Object.keys(compliments.compliments[2])[0]].length);
  	this.emit(':tell', JSON.stringify(compliments.compliments[2][Object.keys(compliments.compliments[2])[0]][index]));
  },

  'FromAlexa': function () {
  	var index = Math.floor(Math.random()*compliments.compliments[3][Object.keys(compliments.compliments[3])[0]].length);
  	this.emit(':tell', JSON.stringify(compliments.compliments[3][Object.keys(compliments.compliments[3])[0]][index]));
  },

  'AMAZON.StopIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye, darling.`);
  },
  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.emit(':tell', `Goodbye, darling.`);
  },
  'SessionEndedRequest': function () {
    // Force State Save When User Times Out
    this.emit(':saveState', true);
  },

  'AMAZON.HelpIntent' : function () {
    this.emit(':ask', `You can ask me to give you love and I will shower you with it. Or you can ask for a specific category.  To hear the categories, just ask me what are the categories.`,  `What would you like to do?`);
  },
  'Unhandled' : function () {
    this.emit(':ask', `You can ask me to give you love and I will shower you with it. Or you can ask for a specific category.  To hear the categories, just ask me what are the categories.`,  `What would you like to do?`);
  }

};