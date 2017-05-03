'use strict';
exports.__esModule = true;
var AWS = require("aws-sdk");
module.exports.CreateTable = function (event, context, callback) {
    var dynamodb = new AWS.DynamoDB();
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: "Compliments",
        KeySchema: [
            { AttributeName: "Index", KeyType: "HASH" } //Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "Index", AttributeType: "N" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };
    dynamodb.createTable(params, function (err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
};
