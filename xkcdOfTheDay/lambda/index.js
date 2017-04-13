var Alexa = require('alexa-sdk');
var https = require("https");
const request = require('request');

var url =  'https://dynamic.xkcd.com/api-0/jsonp/comic/';
var cardTitle = '';
var cardContent = '';


exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to xkcd of the day! Say read to hear the comic of the day or say a number of a comic you want to hear.', 'Try saying hello!');
  },

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
						    smallImageUrl: parsedData.img,
						    largeImageUrl: parsedData.img
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
						    smallImageUrl: parsedData.img,
						    largeImageUrl: parsedData.img
						};
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
  }

};


    