var AWS = require('aws-sdk'); 
var request = require('request');
var https = require("https");
var s3 = new AWS.S3();
// var sns = new AWS.SNS();
var uriImage = '';
var keyImage = '';
    
exports.handler = (event, context, callback) => {

    //Pass API GET request to getImage function
    getImage("https://dynamic.xkcd.com/api-0/jsonp/comic/");
    //Uncomment to load all images
    // message = JSON.parse(event.Records[0].Sns.Message)
    // getImage("https://dynamic.xkcd.com/api-0/jsonp/comic/"+message, function() {
    //         if (message !== 1825) {
    //         message += 1;
    //         var params = {
    //             Message:  message.toString(),
    //             TopicArn: 'YOUR TOPIC ARN'
    //         };
    //         sns.publish(params, context.done);
    //     }
    // });

};



//Function retrieves the image url from the API and puts the image object in the specified S3 bucket
function getImage(dayUrl) {
        https.get(dayUrl, (response) => {
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
                        var imageObject = parsedData.img;
                        var day = parsedData.num;
                        keyImage = day + '.png';
                        var options = {
                            uri: imageObject,
                            encoding: null
                        };
                        request(options, function(error, response, body) {
                            if (error || response.statusCode !== 200) { 
                                console.log("failed to get image");
                                console.log(error);
                            } else {
                                s3.putObject({
                                    Body: body,
                                    Key: keyImage,
                                    Bucket: 'xkcdimages'
                                }, function(error, data) { 
                                    if (error) {
                                        console.log("error downloading image to s3");
                                        return;
                                    } else {
                                        console.log("success uploading to s3");
                                        return;
                                    }
                                }); 
                            }   
                        });
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
  };