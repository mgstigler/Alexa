'use strict';
import * as AWS from "aws-sdk";
import * as fs from "fs";

module.exports.SeedTable = (event, context, callback) => {
    let docClient = new AWS.DynamoDB.DocumentClient();
    let compliments = JSON.parse(fs.readFileSync('seedData.json', 'utf8'));
    compliments.forEach(function(compliment) {
        var params = {
            TableName: "Compliments",
            Item: {
                "Index":  compliment.Index,
                "Quote": compliment.Quote
            }
        };

        docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add compliment", compliment.Index, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", compliment.Index);
        }
        });
    });

}