'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
var dynamoDb = new AWS.DynamoDB();

function GetCompliment() {
    var mydata = "";
    var params = {
        TableName: "Compliments"
    };

    dynamoDb.listTables(function(err, data) {
       console.log(data.TableNames);
    });

    dynamoDb.describeTable({"TableName":"Compliments"}, function (error, data) {
        if (error) {
            //error
        }
        else {
            var table = data.Table;
            console.log(table['ItemCount']);
        }
    });

};

exports.compliment = GetCompliment();
