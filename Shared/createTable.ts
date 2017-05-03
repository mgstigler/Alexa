'use strict';
import * as AWS from "aws-sdk";
import * as fs from "fs";

module.exports.CreateTable = (event, context, callback) => {
    let dynamodb = new AWS.DynamoDB();
    let docClient = new AWS.DynamoDB.DocumentClient();

    let params = {
        TableName : "Compliments",
        KeySchema: [       
            { AttributeName: "Index", KeyType: "HASH"} //Partition key
        ],
        AttributeDefinitions: [       
            { AttributeName: "Index", AttributeType: "N" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}
