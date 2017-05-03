'use strict';
exports.__esModule = true;
var AWS = require("aws-sdk");
var fs = require("fs");
module.exports.SeedTable = function (event, context, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    var compliments = JSON.parse(fs.readFileSync('seedData.json', 'utf8'));
    compliments.forEach(function (compliment) {
        var params = {
            TableName: "Compliments",
            Item: {
                "Index": compliment.Index,
                "Quote": compliment.Quote
            }
        };
        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add compliment", compliment.Index, ". Error JSON:", JSON.stringify(err, null, 2));
            }
            else {
                console.log("PutItem succeeded:", compliment.Index);
            }
        });
    });
};
