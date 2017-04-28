/*
//Maddie Stigler
//Feb 15, 2017
//Developed for Alexa Skills
*/


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
    if ("AMAZON.YesIntent" === intentName) {
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
            handleGetHelpRequest(intent, session, callback);

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
var CARD_TITLE = "Blackjack"; // Be sure to change this for your skill.


function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Welcome to Blackjack.  I will be the dealer for this game.  First, I will deal us two cards each, then you will be given the option to hit or fold. ",
        shouldEndSession = false,
        repromptText = "",
        currentCardIndex = 4,
        conditionalString = " Hit or Fold?",
        gameDeck = shuffleDeck(),
        dcard1 = Object.keys(gameDeck[0])[0],
        hiddenCard = Object.keys(gameDeck[1])[0],
        pcard1 = Object.keys(gameDeck[2])[0],
        pcard2 = Object.keys(gameDeck[3])[0],
        dealerTotal = Number(gameDeck[0][dcard1]) + Number(gameDeck[1][hiddenCard]),
        playerTotal = Number(gameDeck[2][pcard1]) + Number(gameDeck[3][pcard2]),
        dealAgain = deal(dealerTotal);

        if (dcard1 === "Ace" && hiddenCard != "Ace"){
            dealerTotal = ace(Number(gameDeck[1][hiddenCard])) + Number(gameDeck[1][hiddenCard]);
        }
        else if (hiddenCard === "Ace" && dcard1 != "Ace"){
            dealerTotal = ace(Number(gameDeck[0][dcard1])) + Number(gameDeck[0][dcard1]);
        }

        if (pcard1 === "Ace" && pcard2 != "Ace"){
            playerTotal = ace(Number(gameDeck[3][pcard2])) + Number(gameDeck[3][pcard2]);
        }
        else if (pcard2 === "Ace" && pcard1 != "Ace"){
            playerTotal = ace(Number(gameDeck[2][pcard1])) + Number(gameDeck[2][pcard1]) ;
        }

        if(playerTotal === 21) {
            var hit = 0;
            var responseString = " I lost.  You win! Thanks for playing.  Say 'start' to start a new game or 'stop' to end the session.";
            while(dealAgain !== false){
                currentCardIndex+=1;
                var dealercard = Object.keys(gameDeck[currentCardIndex])[0];
                dealerTotal += Number(gameDeck[currentCardIndex][Object.keys(gameDeck[currentCardIndex])[0]]); 
                dealAgain = deal(dealerTotal);
                hit +=1;
            }
            if (dealerTotal === 21) {
                responseString = " It's a tie. Thanks for playing. Say 'start' to start a new game or 'stop' to end the session."
            }
            conditionalString = " You got a blackjack! My hidden card is a " + hiddenCard + ". I hit " + hit + " more times.  My total is " + dealerTotal + ". " + responseString;
        }
        
        repromptText += " I will show you one card and hide the other.  I drew a " + dcard1 + ". You were dealt a " + pcard1 + " and a " + pcard2 + ". Your total number of points is " + playerTotal + ". " + conditionalString;
        
        speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentCardIndex": currentCardIndex,
        "gameDeck": gameDeck,
        "dealerTotal": dealerTotal,
        "playerTotal": playerTotal,
        "hiddenCard" : hiddenCard
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}


/**
 * Used to shuffle the array of cards at the beginning of each new game
 */
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

/**
 * Determines whether an ace should count as 1 or 11 points
 */
function ace(total) {
    var aceCount = 1;
    if(total + 11 < 21 || total + 11 === 21) {
        aceCount = 11;
    }
    return aceCount;
}

/**
 * Determines whether or not the dealer hits again
 */
function deal(total) {
    var deal = true;
    if(total < 17 ){
        deal = true;
    }
    else {
        deal = false;
    }
    
    return deal;
}

/**
 * Determines if there is a bust
 */
function bust(total) {
    var bust = false
    if (total > 21) {
        bust = true;
    }
    return bust;
}

/**
 * determines if there is a blackjack
 */
function blackjack(total) {
    var win = false
    if (total === 21) {
        win = true;
    }
    return win;
}


/**
 * Handles the hit requests
 */
function handleHitRequest(intent, session, callback) {
     var sessionAttributes = {},
        speechOutput = "",
        shouldEndSession = false,
        repromptText = "",
        extraResponse = " Hit or Fold?",
        currentCardIndex = session.attributes.currentCardIndex + 1,
        gameDeck = session.attributes.gameDeck,
        card = Object.keys(gameDeck[currentCardIndex])[0],
        hiddenCard = session.attributes.hiddenCard,
        dealerTotal = session.attributes.dealerTotal,
        playerTotal = session.attributes.playerTotal, 
        dealAgain = deal(dealerTotal);
        
        if(card === "Ace") {
            var aceValue = ace(playerTotal);
            playerTotal += aceValue;
        }
        
        else{
            playerTotal += Number(gameDeck[currentCardIndex][Object.keys(gameDeck[currentCardIndex])[0]]);
        }
        
        if(bust(playerTotal) === true){
            extraResponse = " You bust! My total is " + dealerTotal + ". I win. Better luck next time!  Say 'start' to start a new game or 'stop' to end the session.";
        }
        else if (blackjack(playerTotal) === true){
            var hit = 0;
            var responseString = " I lost.  You win! Thanks for playing.  Say 'start' to start a new game or 'stop' to end the session.";
            while(dealAgain !== false){
                currentCardIndex+=1;
                var dealercard = Object.keys(gameDeck[currentCardIndex])[0];
                if (dealercard === "Ace") {
                    var aceValue = ace(dealerTotal);
                    dealerTotal+=aceValue;
                }
                else {
                    dealerTotal += Number(gameDeck[currentCardIndex][Object.keys(gameDeck[currentCardIndex])[0]]); 
                }
                dealAgain = deal(dealerTotal);
                hit +=1;
            }
            if (dealerTotal === 21) {
                responseString = " It's a tie. Thanks for playing.  Say 'start' to start a new game or 'stop' to end the session."
            }
            extraResponse = " You got a blackjack! My hidden card is a " + hiddenCard + ". I hit " + hit + " more times.  My total is " + dealerTotal + ". " + responseString;
        }

        repromptText += " You were dealt a " + card + ". Your total number of points is " + playerTotal + ". " + extraResponse;
        
        speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentCardIndex": currentCardIndex,
        "gameDeck" : gameDeck,
        "hiddenCard" : hiddenCard,
        "dealerTotal": dealerTotal,
        "playerTotal" : playerTotal
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

/**
 * Handles fold requests
 */
function handleFoldRequest(intent, session, callback) {
     var sessionAttributes = {},
        hiddenCard = session.attributes.hiddenCard,
        speechOutput = " You folded.  My hidden card is a " + hiddenCard + ". ",
        shouldEndSession = false,
        hit = 0,
        repromptText = "",
        responseString = " You win.  Thanks for playing!  Say 'start' to start a new game or 'stop' to end the session.",
        currentCardIndex = session.attributes.currentCardIndex + 1,
        gameDeck = session.attributes.gameDeck,
        dealerTotal = session.attributes.dealerTotal,
        playerTotal = session.attributes.playerTotal,
        dealAgain = deal(dealerTotal);
        
        while(dealAgain !== false){
            currentCardIndex+=1;
            var dealercard = Object.keys(gameDeck[currentCardIndex])[0];
            if (dealercard === "Ace") {
                    var aceValue = ace(dealerTotal);
                    dealerTotal+=aceValue;
                }
            else {
                    dealerTotal += Number(gameDeck[currentCardIndex][Object.keys(gameDeck[currentCardIndex])[0]]); 
                }
            dealAgain = deal(dealerTotal);
            hit +=1;
        }
        if(dealerTotal < 21 && dealerTotal < playerTotal) {
            hit += 1;
            currentCardIndex += 1;
            dealerTotal += Number(gameDeck[currentCardIndex][Object.keys(gameDeck[currentCardIndex])[0]]); 
        }
        if (dealerTotal < 21 && dealerTotal > playerTotal){
            responseString = " I win. Better luck next time, thanks for playing.  Say 'start' to start a new game or 'stop' to end the session.";
        }
        if(dealerTotal > 21) {
            responseString = " I bust.  You win.  Thanks for playing.  Say 'start' to start a new game or 'stop' to end the session.";
        }
        else if(dealerTotal === 21) {
            responseString = " Blackjack! I win.  Better luck next time. Say 'start' to start a new game or 'stop' to end the session.";
        }
        repromptText = " I hit " + hit + " more times.  My total is " + dealerTotal +". " + responseString;
        
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

    var speechOutput = "I will deal you a new card if you say hit, and will deal myself cards if you say fold. To start a new game at any time, say, start game. "
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
