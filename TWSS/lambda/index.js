/*
//Maddie Stigler
//Feb 15, 2017
//Developed for Alexa Skills
*/

//Game Specific Variables
var games = [
 {
        "Hot Potato.  In this game, players must list items in the category I say.  Set a timer for one minute, whoever is caught when the timer goes off, loses and has to chug for five seconds. ": "1"
    },
    {
        "Women's Appreciation.  Girls Drink. " : "2"
    },
    {
        "Impish or Admirable.  You are Belschnikle.  You will decide on what is impish.  Also known as you're a bitch if you haven't.  Drink if you're impish, assign a drink if you're admirable. ":"3"
    },
    {
        "Dream Team.  Choose a mate to drink with you until told otherwise. ":"4"
    },
    {
        "Desert Island.  In this game, you decide on a desert island category, the other players must go around and list items in that category. First player to get stumped drinks for five seconds. ":"5"
    },
    {
        "Email Surveillance.  In this game, you are assigned the role of assassin.  If other players catch you winking at them, they have been assassinated and must drink their drink.  You are the assassin until another person is assigned. ":"6"
    },
    {
        "Casual Friday. You pick an article of clothing that the player to your right has to take off for an undetermined amount of time. ":"7"
    },
    {
        "Dinner Party. In this game, you are the host of a lovely dinner party.  The host makes up a rule that players must follow for the remainder of the dinner party. ":"8"
    },
    {
        "Threat Level Midnight.  Never have I ever.  You start. ":"9"
    },
    {
        "Free Family Portrait Studio.  Take a selfie with the person to your left and send via snapchat. ":"10"
    },
    {
        "Koi Pond. Waterfall.  You start. ":"11"
    },
    {
        "Trivia.  You must answer the question correctly, or drink. ":"12"
    },
    {
        "The Warehouse.  Men Drink. ":"13"
    },
    {
        "Gossip.  Most likely to.  Drink for number of fingers pointed your way. ":"14"
    },
    {
        "Booze Cruise.  You are Captain Jack.  You can assign life vests to all but one passenger on the ship.  All assigned life jackets, take a sip.  If you are not assigned a life jacket, take a shot. ":"15"
    },
];

var triviaQuestions = [
    "Who's the only character that shares his name with the exact name of the actor (full name)?",
    "What is Meredith's last name?",
    "Who does Michael impersonate that leads to the branch having a Diversity Day?",
    "Who is Michael's BFF?",
    "In Season 1, who ends up taking the Hot Girl home?",
    "What does Packer's license plate say?",
    "Who taught Michael the phrase 'dinkin flicka'?",
    "What is Roy's last name?",
    "When does Jim tell Michael that he likes Pam?",
    "Is it just Jim, or does this place smell like ______?",
    "Michael accidentally gets high at whose concert?",
    "At Casino Night, who beats Michael at poker after he went all in on the first hand?",
    "What does Jim send Dwight so he can identify the office gays?",
    "What movie does the office watch on Movie Monday?",
    "What was the name of Michael's old boss, whose 'capa was detated from his head?'",
    "Besides Jim, who is the only transfer from Stamford still working at Scranton?",
    "What a cappella group did Andy sing in?",
    "What is the name of Michael's realtor, and also his one time girlfriend?",
    "What was Kevin's nationality during Diversity Day?",
    "Instead of hiring a stripper, who does Jim get?",
    "What is the national sport of Icelandic paper companies?",
    "Who does Michael run over in his car?",
    "Karen becomes the Regional Manager at which branch?",
    "Who has a heart attack in the office?",
    "Name one of the two people that have been revealed to have committed suicide.",
    "Where do they take the work bus?",
    "Pam goes on a double date with Kelly and Ryan with a guy that has what occupation? ",
    "Through concentration, what can Dwight raise and lower?",
    "Who does Oscar have an affair with?",
    "What car does Dwight drive?",
    "What new employee is dubbed the 'New Dwight'?  ",
    "Who won an event at the World Series of Poker?",
    "Who does Michael take to Jamaica with him?",
    "Who replaces Michael as the manager of the Scranton branch?",
    "What religion are Darryl and Pam?",
    "What kind of company does Roy end up owning?",
    "What does Michael originally try to order at Hooters?",
    "What is Stanley's favorite day?",
    "What is Michael's middle name?",
    "Where did Andy graduate from? ",
    "What is the name of the children's TV show that Michael appeared in?",
    "What is the name of the security guard at the Scranton branch?",
    "What is the name of the Stamford branch's former Regional Manager?",
    "Michael went to the same high-school as who?",
    "Who does Michael hook up with at Jim and Pam's wedding?",
    "Where do Jim and Pam get married?",
    "Michael and Holly accidentally reveal which branch is closing at the Company Picnic?",
    "Where does Andy take Michael to cheer him up after Carol breaks up with him?",
    "Who is Michael's 'soup snake?'",
    "What restaurant does Michael call, thinking its a 'hot and juicy redhead?'"
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
    "Most likely to win a dance party",
    "Most likely to hit a coworker with their car",
    "Most likely to own a beet farm",
    "Most likely to be in an a capella group"
    ];

var hotpotato = [
    "List the Office Christmas episodes.  You start.",
    "List made up diseases created by Jim and Pam during Season 1 Episode 3 Health Care. You start.",
    "List the games that make up the Office Olympics. You start.",
    "List different Halloween costumes that have been worn in the Office. You start.",
    "List the cliches Phyllis says when it rains outside. You start.",
    "List the names of Michael's lovers. You start.",
    "List the names of Angela's cats. You start.",
    "List the different Dunder Mifflin branches. You start.",
    "List the names of the different bosses of Dunder Mifflin Scranton. You start."
    ];


exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

    if (event.session.application.applicationId !== "amzn1.ask.skill.60ec6516-3a24-4111-a41e-14ecb2d1c6f3") {
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
    if ("AMAZON.StartOverIntent" === intentName) {
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

var CARD_TITLE = "That's What She Said"; 


function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Welcome to That's What She Said. One player starts.  Say next to move on to the next player or stop to end the session.  Let's begin. " + " ",
        shouldEndSession = false,
        spokenQuestion = "",
        repromptText = "",
        gameIndex = populateGameIndex(),
        currentQuestionIndex = 0;

         if(games[gameIndex][Object.keys(games[gameIndex])[0]] == 1){
             spokenQuestion = Object.keys(games[gameIndex])[0] + populateHotPotato();
         }else if(games[gameIndex][Object.keys(games[gameIndex])[0]] == 12){
             spokenQuestion = Object.keys(games[gameIndex])[0] + " " + populateTrivia();
         }else if(games[gameIndex][Object.keys(games[gameIndex])[0]] == 14){
             spokenQuestion = Object.keys(games[gameIndex])[0] + " " + populateGossip();
         }else {
            spokenQuestion = Object.keys(games[gameIndex])[0];
         }
        repromptText = "Game 1: " + spokenQuestion;
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex
        };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}


function populateGameIndex() {
    var length = games.length;
    var game = Math.floor(Math.random()*length);
    return game;
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
    var index = triviaQuestions.length;
    var triviaQ = Math.floor(Math.random()*index);
    var triviaQuestion = triviaQuestions[triviaQ];
    return triviaQuestion;
}


function handleNextRequest(intent, session, callback) {
    var speechOutput = "",
        sessionAttributes = {},
        userGaveUp = intent.name === "DontKnowIntent",
        spokenQuestion = " ",
        gameIndex = populateGameIndex(),
        currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex);

        currentQuestionIndex += 1;
         if(games[gameIndex][Object.keys(games[gameIndex])[0]] == 1){
             spokenQuestion = Object.keys(games[gameIndex])[0] + populateHotPotato();
         }else if(games[gameIndex][Object.keys(games[gameIndex])[0]] == 12){
             spokenQuestion = Object.keys(games[gameIndex])[0] + " " + populateTrivia();
         }else if(games[gameIndex][Object.keys(games[gameIndex])[0]] == 14){
             spokenQuestion = Object.keys(games[gameIndex])[0] + " " + populateGossip();
         }else {
            spokenQuestion = Object.keys(games[gameIndex])[0];
         }
        var questionIndexForSpeech = currentQuestionIndex + 1,
            repromptText = "Game " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
        speechOutput += repromptText;

        sessionAttributes = {
            "speechOutput": repromptText,
            "repromptText": repromptText,
            "currentQuestionIndex": currentQuestionIndex
            };
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
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

    var speechOutput = "I will prompt you with a game.  To pass your turn to the next person or start your turn, say next. To start a new game at any time, say, start new game. To repeat the last game, say, repeat. To end the session, say stop. What would you like to do?",
        repromptText = "What would you like to do?";
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
