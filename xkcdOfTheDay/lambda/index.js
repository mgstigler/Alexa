var Alexa = require('alexa-sdk');
var https = require("https");
const request = require('request');

var url =  'https://dynamic.xkcd.com/api-0/jsonp/comic/';
var cardTitle = '';
var cardContent = '';
var totalComics = 1800;


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  //Handles the launch request
  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to xkcd of the day! Say read to hear the comic of the day or say a number of a comic you want to hear.', 'Try saying hello!');
  },


  //Reads the comic of the day out loud
  'ReadXkcd': function () {

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
                    	var imageObj = {
          						    smallImageUrl: 'https://s3.amazonaws.com/xkcdimages/' + parsedData.num + '.png',
          						    largeImageUrl: 'https://s3.amazonaws.com/xkcdimages/'+ parsedData.num + '.png'
          						};
                    	cardTitle = parsedData.title;
                    	cardContent = parsedData.alt;
                    	this.emit(':tellWithCard', 'X K C D comic of the day: ' + parsedData.title + ".  The caption is ' " + parsedData.alt + " ' ", cardTitle, cardContent, imageObj);
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

  //Reads specific comic out loud
  'ComicNumber': function() {
  	//Get comic number 
  	var comicId = this.event.request.intent.slots.xkcdNumber.value;
  	var num;
  	if(comicId) {
  		num = comicId;
  	}
  	else {
  		this.emit(':tell', "Sorry, I cannot find this comic.  Please try another one.  ");
  	}

  	var numUrl = "https://dynamic.xkcd.com/api-0/jsonp/comic/" + num;

  	https.get(numUrl, (response) => {
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
                    	var imageObj = {
          						    smallImageUrl: 'https://s3.amazonaws.com/xkcdimages/' + num + '.png',
          						    largeImageUrl: 'https://s3.amazonaws.com/xkcdimages/' + num + '.png'
          						};
						          console.log(parsedData.img);
                    	cardTitle = parsedData.title;
                    	cardContent = parsedData.alt;
                    	this.emit(':tellWithCard', parsedData.title + ".  The caption is ' " + parsedData.alt + " ' ", cardTitle, cardContent, imageObj);
                        return;
                    }
                }
                catch (e) {
                	this.emit(':tell', "Sorry, I cannot find this comic.  Please try another one.  ");
                    console.error(e);
                    return;
                }
            });
        }).on('error', (e) => {
        	this.emit(':tell', "Sorry, I cannot find this comic.  Please try another one.  ");
            console.error(e);
            return;
        });
  },

//Reads a random comic
'Random': function() {

    var num = Math.floor(Math.random()*totalComics);

    var numUrl = "https://dynamic.xkcd.com/api-0/jsonp/comic/" + num;

    https.get(numUrl, (response) => {
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
                      var imageObj = {
                          smallImageUrl: 'https://s3.amazonaws.com/xkcdimages/' + num + '.png',
                          largeImageUrl: 'https://s3.amazonaws.com/xkcdimages/' + num + '.png'
                      };
                      console.log(parsedData.img);
                      cardTitle = parsedData.title;
                      cardContent = parsedData.alt;
                      this.emit(':tellWithCard', parsedData.title + ".  The caption is ' " + parsedData.alt + " ' ", cardTitle, cardContent, imageObj);
                        return;
                    }
                }
                catch (e) {
                  this.emit(':tell', "Sorry, I cannot find this comic.  Please try another one.  ");
                    console.error(e);
                    return;
                }
            });
        }).on('error', (e) => {
          this.emit(':tell', "Sorry, I cannot find this comic.  Please try another one.  ");
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
  this.emit(':ask', `You can ask me to read the comic of the day, a specific comic by number or a random comic.  What would you like to do?`,  `What would you like to do?`);
  },

  'Unhandled' : function () {
  this.emit(':ask', `You can ask me to read the comic of the day, a specific comic by number or a random comic.  What would you like to do?`,  `What would you like to do?`);
  }

};


    