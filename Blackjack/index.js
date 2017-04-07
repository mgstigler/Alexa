/*
//Maddie Stigler
//Apr 7, 2017
//Developed for Alexa Skills
*/

//list any dependencies here


//Game Specific Variables
var cards = [
        {
        "Ace" : "1"
    },
    {
        "2" : "2"
    },
        {
        "3" : "3"
    },
        {
        "4" : "4"
    },
        {
        "5" : "5"
    },
        {
        "6" : "6"
    },
        {
        "7" : "7"
    },
        {
        "8" : "8"
    },
        {
        "9" : "9"
    },
        {
        "King" : "10"
    },
    {
        "Queen" : "10"
    },
        {
        "Jack" : "10"
    },
    {
        "Ace" : "1"
    },
    {
        "2" : "2"
    },
        {
        "3" : "3"
    },
        {
        "4" : "4"
    },
        {
        "5" : "5"
    },
        {
        "6" : "6"
    },
        {
        "7" : "7"
    },
        {
        "8" : "8"
    },
        {
        "9" : "9"
    },
        {
        "King" : "10"
    },
    {
        "Queen" : "10"
    },
        {
        "Jack" : "10"
    },
    {
        "Ace" : "1"
    },
    {
        "2" : "2"
    },
        {
        "3" : "3"
    },
        {
        "4" : "4"
    },
        {
        "5" : "5"
    },
        {
        "6" : "6"
    },
        {
        "7" : "7"
    },
        {
        "8" : "8"
    },
        {
        "9" : "9"
    },
        {
        "King" : "10"
    },
    {
        "Queen" : "10"
    },
        {
        "Jack" : "10"
    },
    {
        "Ace" : "1"
    },
    {
        "2" : "2"
    },
        {
        "3" : "3"
    },
        {
        "4" : "4"
    },
        {
        "5" : "5"
    },
        {
        "6" : "6"
    },
        {
        "7" : "7"
    },
        {
        "8" : "8"
    },
        {
        "9" : "9"
    },
        {
        "King" : "10"
    },
    {
        "Queen" : "10"
    },
        {
        "Jack" : "10"
    }
];


var index = 0;


exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

    if (event.session.application.applicationId !== "amzn1.ask.skill.30053abf-1aa9-444f-8d15-ee1b7fba637e") {
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
    } else if("HitIntent" === intentName) {
        handleHitRequest(intent, session, callback);
    } else if("FoldIntent" === intentName) {
        handleFoldRequest(intent, session, callback);
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
var USER_FOLD = false;
var DEALER_FOLD = false;
var CARD_TITLE = "Blackjack"; // Be sure to change this for your skill.


function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Welcome to Blackjack.  I will be the dealer for this game.  First, I will deal us two cards each, then you will be given the option to hit or fold ",
        shouldEndSession = false,
        repromptText = "",
        currentCardIndex = 4,
        gameDeck = shuffleDeck(),
        dcard1 = Object.keys(gameDeck[0])[0],
        dcard2 = Object.keys(gameDeck[1])[0],
        pcard1 = Object.keys(gameDeck[2])[0],
        pcard2 = Object.keys(gameDeck[3])[0],
        dealerTotal = Number(gameDeck[0][Object.keys(gameDeck[0])[0]]) + Number(gameDeck[1][Object.keys(gameDeck[1])[0]]),
        playerTotal = Number(gameDeck[2][Object.keys(gameDeck[2])[0]]) + Number(gameDeck[3][Object.keys(gameDeck[3])[0]]);
        
        repromptText += "I drew a " + dcard1 + " and a " + dcard2 + " My total number of points is:  " + dealerTotal + " You were dealt a: " + pcard1 + " and a: " + pcard2 + " Your total number of points is: " + playerTotal + " Hit or fold?";
        
        speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentCardIndex": currentCardIndex,
        "gameDeck": gameDeck,
        "dealerTotal": dealerTotal,
        "playerTotal": playerTotal
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}



function shuffleDeck() {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}


function handleHitRequest(intent, session, callback) {
     var sessionAttributes = {},
        speechOutput = "Welcome to Blackjack.  I will be the dealer for this game.  First, I will deal us two cards each, then you will be given the option to hit or fold ",
        shouldEndSession = false,
        repromptText = "",
        dealerResponse = "",
        extraResponse = "",
        currentCardIndex = session.attributes.currentCardIndex + 1,
        gameDeck = session.attributes.gameDeck,
        card = Object.keys(gameDeck[currentCardIndex])[0],
        dealerTotal = session.attributes.dealerTotal,
        playerTotal = session.attributes.playerTotal + Number(gameDeck[currentCardIndex][Object.keys(gameDeck[currentCardIndex])[0]]);
        
        if(bust(playerTotal) === true){
            extraResponse = " You bust! I win.";
        }
        else if (blackjack(playerTotal) === true){
            extraResponse = " Blackjack! You win.  Good game";
        }
        repromptText += " You were dealt a " + card + " Your total number of points is" + playerTotal + extraResponse;

        var dealerChoice = "";
        var dealCards = deal(dealerTotal);
        if(dealCards === true && DEALER_FOLD !== true) {
            currentCardIndex+=1;
            var dealercard = Object.keys(gameDeck[currentCardIndex])[0];
            dealerTotal += Number(gameDeck[currentCardIndex][Object.keys(gameDeck[currentCardIndex])[0]]);
            dealerResponse = "I was dealt a " + dealercard + " My total number of points is : " + dealerTotal + " Hit or fold?";
        }
        else if (dealCards === false) {
            dealerResponse = "I folded " + " My total number of points is : " + dealerTotal + " Hit or fold?";
            DEALER_FOLD = true;
        }
        
        speechOutput += repromptText + dealerResponse;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentCardIndex": currentCardIndex,
        "gameDeck" : gameDeck,
        "dealerTotal": dealerTotal,
        "playerTotal" : playerTotal
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function deal(total) {
    var deal = true;
    if(total < 10 ){
        deal = true;
    }
    if (total >= 18) {
        deal = false;
    }
    else {
        deal = Math.random() >= 0.5;
    }
    
    return deal;
}

function bust(total) {
    var bust = false
    if (total > 21) {
        bust = true;
    }
    return bust;
}

function blackjack(total) {
    var win = false
    if (total === 21) {
        win = true;
    }
    return win;
}

function handleFoldRequest(intent, session, callback) {
     var sessionAttributes = {},
        speechOutput = "Welcome to Blackjack.  I will be the dealer for this game.  First, I will deal us two cards each, then you will be given the option to hit or fold ",
        shouldEndSession = false,
        repromptText = "",
        
        currentCardIndex = session.attributes.currentCardIndex + 1,
        gameDeck = session.attributes.gameDeck,
        card = Object.keys(gameDeck[currentCardIndex])[0],
        dealerTotal = session.attributes.dealerTotal,
        playerTotal = session.attributes.playerTotal + Number(gameDeck[currentCardIndex][Object.keys(gameDeck[currentCardIndex])[0]]);
        
        repromptText += " You were dealt a " + card + " Your total number of points is" + playerTotal + " Hit or fold?";
        
        speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentCardIndex": currentCardIndex,
        "gameDeck" : gameDeck,
        "dealerTotal": dealerTotal,
        "playerTotal" : playerTotal
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
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
