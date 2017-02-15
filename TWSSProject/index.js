/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 http://aws.amazon.com/apache2.0/
 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';
var games = [
 {
        "Hot Potato.  In this game, set an alexa timer for one minute, whoever is caught when the timer goes off, loses and has to chug for five seconds": "1"
    },
    {
        "Women's Appreciation.  Girls Drink" : "2"
    },
    {
        "Impish or Admirable.  One player decides what is impish (eg: you're a bitch if you haven't).  Drink if you're impish, assign a drink if you're admirable":"3"
    },
    {
        "Dream Team.  Choose a mate to drink with you until told otherwise":"4"
    },
    {
        "Desert Island.  In this game, one player decides a desert island category, the other players must go around and list items in that category. First player to be stumped drinks for five seconds":"5"
    },
    {
        "Email Surveillance.  In this game, one player is assigned the role of assassin, if they wink at you, you have been assassinated and must drink your drink, you then become the assassin until Alexa tells you otherwise":"6"
    },
    {
        "Casual Friday. One player picks an article of clothing that another player has to take off for an undetermined amount of time":"7"
    },
    {
        "Dinner Party. In this game, one person is named as the host.  The host makes up a rule that players must follow for the remainder of the dinner party":"8"
    },
    {
        "Threat Level Midnight.  Never have I ever":"9"
    },
    {
        "Free Family Portrait Studio.  Alexa lists people to take a selfie together and send via snapchat":"10"
    },
    {
        "Koi Pond. Waterfall":"11"
    },
    {
        "Trivia.  Trivia competition, last team to answer drinks. ":"12"
    },
    {
        "The Warehouse.  Men Drink":"13"
    },
    {
        "Gossip.  Most likely to.  Drink for number of fingers pointed your way":"14"
    },
    {
        "Booze Cruise.  A person is named Captain.  They can assign life vests to all but one passenger on the ship.  All assigned life jackets, take a sip, the one without takes a shot":"15"
    },
];
/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "Reindeer have very thick coats, how many hairs per square inch do they have?": [
            "13,000",
            "1,200",
            "5,000",
            "700",
            "1,000",
            "120,000"
        ]
    },
    {
        "The 1964 classic Rudolph The Red Nosed Reindeer was filmed in:": [
            "Japan",
            "United States",
            "Finland",
            "Germany"
        ]
    },
    {
        "Santas reindeer are cared for by one of the Christmas elves, what is his name?": [
            "Wunorse Openslae",
            "Alabaster Snowball",
            "Bushy Evergreen",
            "Pepper Minstix"
        ]
    },
    {
        "If all of Santas reindeer had antlers while pulling his Christmas sleigh, they would all be:": [
            "Girls",
            "Boys",
            "Girls and boys",
            "No way to tell"
        ]
    },
    {
        "What do Reindeer eat?": [
            "Lichen",
            "Grasses",
            "Leaves",
            "Berries"
        ]
    },
    {
        "What of the following is not true?": [
            "Caribou live on all continents",
            "Both reindeer and Caribou are the same species",
            "Caribou are bigger than reindeer",
            "Reindeer live in Scandinavia and Russia"
        ]
    },
    {
        "In what year did Rudolph make his television debut?": [
            "1964",
            "1979",
            "2000",
            "1956"
        ]
    },
    {
        "Who was the voice of Rudolph in the 1964 classic?": [
            "Billie Mae Richards",
            "Burl Ives",
            "Paul Soles",
            "Lady Gaga"
        ]
    },
    {
        "In 1939 what retailer used the story of Rudolph the Red Nose Reindeer?": [
            "Montgomery Ward",
            "Sears",
            "Macys",
            "Kmart"
        ]
    },
    {
        "Santa's reindeer named Donner was originally named what?": [
            "Dunder",
            "Donny",
            "Dweedle",
            "Dreamy"
        ]
    },
    {
        "Who invented the story of Rudolph?": [
            "Robert May",
            "Johnny Marks",
            "Santa",
            "J.K. Rowling"
        ]
    },
    {
        "In what location will you not find reindeer?": [
            "North Pole",
            "Lapland",
            "Korvatunturi mountain",
            "Finland"
        ]
    },
    {
        "What Makes Santa's Reindeer Fly?": [
            "Magical Reindeer Dust",
            "Fusion",
            "Amanita muscaria",
            "Elves"
        ]
    },
    {
        "Including Rudolph, how many reindeer hooves are there?": [
            "36",
            "24",
            "16",
            "8"
        ]
    },
    {
        "Santa only has one female reindeer. Which one is it?": [
            "Vixen",
            "Clarice",
            "Cupid",
            "Cupid"
        ]
    },
    {
        "In the 1964 classic Rudolph The Red Nosed Reindeer, what was the snowman narrators name?": [
            "Sam",
            "Frosty",
            "Burl",
            "Snowy"
        ]
    },
    {
        "What was Rudolph's father's name?": [
            "Donner",
            "Dasher",
            "Blixen",
            "Comet"
        ]
    },
    {
        "In the 1964 movie, What was the name of the coach of the Reindeer Games?": [
            "Comet",
            "Blixen",
            "Donner",
            "Dasher"
        ]
    },
    {
        "In the 1964 movie, what is the name of the deer that Rudolph befriends at the reindeer games?": [
            "Fireball",
            "Clarice",
            "Jumper",
            "Vixen"
        ]
    },
    {
        "In the 1964 movie, How did Donner, Rudolph's father, try to hide Rudolph's nose?": [
            "Black mud",
            "Bag",
            "Pillow case",
            "Sock"
        ]
    },
    {
        "In the 1964 movie, what does the Misfit Elf want to be instead of a Santa Elf?": [
            "Dentist",
            "Reindeer",
            "Toy maker",
            "Candlestick maker"
        ]
    },
    {
        "In the 1964 movie,what was the Bumble's one weakness?": [
            "Could not swim",
            "Always hungry",
            "Candy canes",
            "Cross eyed"
        ]
    },
    {
        "In the 1964 movie, what is Yukon Cornelius really in search of?": [
            "Peppermint",
            "Gold",
            "India",
            "Polar Bears"
        ]
    },
    {
        "In the 1964 movie, why is the train on the Island of Misfit Toys?": [
            "Square wheels",
            "No Engine",
            "Paint does not match",
            "It does not toot"
        ]
    },
    {
        "In the 1964 movie, what is the name of the Jack in the Box?": [
            "Charlie",
            "Sam",
            "Billy",
            "Jack"
        ]
    },
    {
        "In the 1964 movie, why did Santa Claus almost cancel Christmas?": [
            "Storm",
            "No snow",
            "No toys",
            "The Reindeer were sick"
        ]
    },
    {
        "In the 1964 movie, what animal noise did the elf make to distract the Bumble?": [
            "Oink",
            "Growl",
            "Bark",
            "Meow"
        ]
    },
    {
        "In the 1964 movie, what is the name of the prospector?": [
            "Yukon Cornelius",
            "Slider Sam",
            "Bumble",
            "Jack"
        ]
    },
    {
        "How far do reindeer travel when they migrate?": [
            "3000 miles",
            "700 miles",
            "500 miles",
            "0 miles"
        ]
    },
    {
        "How fast can a reindeer run?": [
            "48 miles per hour",
            "17 miles per hour",
            "19 miles per hour",
            "14 miles per hour"
        ]
    }
];

var gossip = [
    "Most likely to set a fire while cooking a cheese pita",
    "Most likely to get beat up by a 13-year-old girl",
    "Most likely to set one's hair on fire in a drunken state of being",
    "Most likely to have a nanny cam set up to monitor their household of cats while at work",
    "Most likely to sleep with a friend's mom",
    "Most likely to get naked at a boss's pool party",
    "Most likely to skip out on a double date valentine's lunch to have sex in the bathroom",
    "Most likely to hire a hitman to knock out kneecaps with a lead pipe",
    "Most likely to own the nickname boner champ",
    "Most likely to win a dance party"
    ];

var hotpotato = [
    "Players must go around and list the Office Christmas episodes",
    "Players must go around and list made up diseases created by Jim and Pam during Season 1 Episode 3 Health Care",
    "Players must go around and list the games that make up the Office Olympics",
    "Players must go around and list different Halloween costumes that have been worn in the Office",
    "Players must go around and list the cliches Phyllis says when it rains outside"
    ];

var players = [
    "Maddie", "Morgan", "Ram", "Molly"
];

var DreamTeamEnds = "Dream Team has ended";

var CasualFridayEnds = "Casual Friday is over.  Please cover yourself";

var index = 0;
// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

    if (event.session.application.applicationId !== "amzn1.ask.skill.3084befa-1536-4582-9887-edd7dc83478a") {
        context.fail("Invalid Application ID");
     }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } 
    if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if("AMAZON.NextIntent" === intentName) {
        handleNextRequest(intent, session, callback);
    }
        else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 15;
var CARD_TITLE = "That's What She Said"; // Be sure to change this for your skill.


function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Welcome to That's What She Said. Let's begin" + " ",
        shouldEndSession = false,
        spokenQuestion = "",
        repromptText = "",
        player = populatePlayer(),
        player2 = populatePlayer(),
        
        gameQuestions = populateGameList(),
        currentQuestionIndex = 0;
        while (player == player2) {
            player2 = populatePlayer();
        }
        
         if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 1){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " will start." + populateHotPotato();
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 3){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " will be Belsnickel for this game.";
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 4){
             spokenQuestion = player + " " + Object.keys(games[gameQuestions[currentQuestionIndex]])[0];
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 5){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " starts.";
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 6){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " starts.";
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 7){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " gets to choose what article of clothing " + player2 + " will remove";
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 8){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " is the host.";
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 9){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " starts.";
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 10){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " and " + player2 + " are chosen.";
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 11){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " starts.";
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 12){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + " " + populateTrivia();
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 14){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + " " + populateGossip();
         }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 15){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " is the captain";
         }else {
            spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0];
         }
        repromptText = "Game 1: " + spokenQuestion;
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "questions": gameQuestions
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < index; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateGameList() {
    var gameList = [];
    var indexList = [];
    var index = games.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < games.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameList.push(indexList[index]);
    }

    return gameList;
}

//Function to populate a chosen player
function populatePlayer() {

    var index = players.length;

    var playerNumber = Math.floor(Math.random()*index);
    var player = players[playerNumber];

    return player;
}

function populateGossip() {
    var index = gossip.length;
    var gossipNumber = Math.floor(Math.random()*index);
    var g = gossip[gossipNumber];
    return g;
}

function populateHotPotato() {
    var index = hotpotato.length;
    var potato = Math.floor(Math.random()*index);
    var hot = hotpotato[potato];
    return hot;
}

function populateTrivia() {
    var index = questions.length;
    var triviaQ = Math.floor(Math.random()*index);
    var triviaQuestion = Object.keys(questions[index]);
    return triviaQuestion;
}

// function handleStartTriviaRequest(intent,session,callback){
//     index +=1;
//     var sessionAttributes = {},
//         speechOutput = "",
//         shouldEndSession = false,
//         spokenQuestion = Object.keys(questions[index]),
//         repromptText = "";
//         repromptText = "Question: " + spokenQuestion;
//         speechOutput += repromptText;
//         sessionAttributes = {
//             "speechOutput": repromptText,
//             "repromptText": repromptText
//         };
//     callback(sessionAttributes,
//         buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
// }

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleNextRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";
    var player = populatePlayer();
    var player2 = populatePlayer();
    var spokenQuestion = " ";

    while (player == player2) {
        player2 = populatePlayer();
    }

    
    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = "Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 1){
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " will start." + populateHotPotato();
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 3){
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " will be Belsnickel for this game.";
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 4){
                spokenQuestion = player + " " + Object.keys(games[gameQuestions[currentQuestionIndex]])[0];
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 5){
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " starts.";
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 6){
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " starts.";
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 7){
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " gets to choose what article of clothing " + player2 + " will remove";
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 8){
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " is the host.";
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 9){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " starts.";
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 10){
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " " + player2 + " are chosen.";
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 11){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " starts.";
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 12){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + " " + populateTrivia();
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 14){
             spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + " " + populateGossip();
            }else if(games[gameQuestions[currentQuestionIndex]][Object.keys(games[gameQuestions[currentQuestionIndex]])[0]] == 15){
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " is the captain";
            }else {
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0];
            }
            // Generate a random index for the correct answer, from 0 to 3
            var questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Game " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            speechOutput += repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}


function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.
    
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
