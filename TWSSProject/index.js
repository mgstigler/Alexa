/*
//Maddie Stigler
//Feb 15, 2017
//Developed for Alexa Skills
*/

//list any dependencies here


//Game Specific Variables
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

var triviaQuestions = [
    "Question 1",
    "Question 2",
    "Question 3"
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


var index = 0;


exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

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
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);
}


// ------- Skill specific logic -------

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
    var triviaQuestion = triviaQuestions[triviaQ];
    return triviaQuestion;
}


function handleNextRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
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
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex);


        var speechOutputAnalysis = "";

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
                spokenQuestion = Object.keys(games[gameQuestions[currentQuestionIndex]])[0] + player + " gets to assign a rule to " + player2;
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
                "questions": gameQuestions
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
