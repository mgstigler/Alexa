Alexa Tutorial - Getting Started with Alexa
==========================

![alexa design](https://github.com/mgstigler/Alexa/blob/master/IceCream/images/alexa.png?raw=true)

Not long ago, smart assistants were thought of as fun, gimicky devices used to tell jokes and check the weather.  Since the increasing availability of developer kits and tools, these devices have grown in their capabilities and are supporting many more useful and powerful applications from banking support to smart home communication to integrated applications with mobile.  Alexa is one of the most popular smart assistants and offers over 25,000 skills to help make tasks simpler and engaging for users.  With this rise in natural language processing, it becomes increasingly more necessary for developers to know how to create and publish Alexa skills.  

In this tutorial, we are going to cover the basics of getting started with Alexa development and will create a simple skill that will recite available ice cream flavors for an ice cream truck.

Key Terms
---------

__Intents__

An *intent* represents an action that fulfills a user's spoken request. Intents can optionally have arguments called slots. (ex: ReadFlavors)

__Utterances__

*Utterances* are a set of likely spoken phrases mapped to the intents. This should include as many representative phrases as possible. (ex: "tell me my ice cream options")

__Custom slot types__

*Custom slot types* are a representative list of possible values for a slot. Custom slot types are used for lists of items that are not covered by one of Amazon's built-in slot types. Some built-in slot types include date, location, name...

**For more information, visit [Amazon's guide](https://developer.amazon.com/docs/custom-skills/use-the-skill-builder-beta-to-define-intents-slots-and-dialogs.html).**


Prequisites
-----------
1. Have an AWS account [Go here to create one](https://aws.amazon.com/)
2. IDE of choice.  I will be using Visual Studio Code
3. Installed Node.js. [More information on Node.js](https://nodejs.org/en/)
4. Have access to the Alexa Developer Portal [Click here to sign in](https://developer.amazon.com/)



Create a Function in AWS
------------------------
When you log in to the AWS management console, select *Lambda* from the list of services.  Lambda is the serverless computing option that AWS provides and is what is used to run and communicate with your Alexa skill.  

> __Note: Make sure your region in the top right of your console is set to US East (N. Virginia). This region supports lambda functions triggered by Alexa skills.__

From the lambda console, choose *Create function* and complete the following steps:
1. Select "Author from Scratch"
2. Name your function.  I named mine "Ice Cream Truck".
3. Select "Node.js 6.10" as the runtime
4. Select "Create a custom role" if you don't have one for lambda functions already.  Then select "Lambda basic execution".
5. When you are brought to your lambda function, copy the __ARN__.  This amazon resource name is what you will use to connect your skill's intents and utterances to your function.
6. Select "Alexa Skills Kit" from the list of triggers to trigger your function.  Then click "Add" in the bottom right and "Save" in the top right to save your function's configuration.

![function design](https://github.com/mgstigler/Alexa/blob/master/IceCream/images/lambda.png?raw=true)



Configure your Skill in the Developer Portal
--------------------------------------------
1. Sign in to the developer portal
2. Click "Alexa"
3. Click "Get Started" under the "Alexa Skills Kit" option.
4. Click "Create Skill"
5. Enter a name for your skill and select "Custom"

The left toolbar will walk you through everything you need to create your skill.  We will start with the *invocation name* which is used to invoke your skill through the device. I will call it "ice cream truck".

Next, we will configure the Intents.  I created one called "ReadFlavors" with sample utterances.  The full JSON file for my schema can be found [here](https://github.com/mgstigler/Alexa/blob/master/IceCream/speechAssets/IntentSchema.json)

![intent design](https://github.com/mgstigler/Alexa/blob/master/IceCream/images/intents.png?raw=true)

When you have configured your intents with utterances, click "Save model" and make sure there are no errors.  If all goes well, build your model by clicking "Build Model".

In the left sidebar under "Endpoints", paste the ARN you copied from AWS previously next to "Default Region" and click "Save Endpoints".


Write and Upload the Code
-------------------------

```javascript
var Alexa = require('alexa-sdk');

var flavors = ["strawberry", "chocolate", "vanilla", "mint chocolate chip"];

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = 'amzn1.ask.skill.41b68f8c-dc8c-48cd-b794-3ee33271749e';
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {

  //Handles the launch request
  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to the ice cream truck! Ask to hear the flavors', 'Try asking what the flavors are.');
  },


  //Reads the list of ice cream flavors
  'ReadFlavors': function () {
    this.emit(':tell', 'Our ice cream flavors are ' + flavors.join(", "));
  },

  'AMAZON.StopIntent': function () {
  // State Automatically Saved with :tell
  this.emit(':tell', `Goodbye.`);
  },

  'AMAZON.CancelIntent': function () {
  // State Automatically Saved with :tell
  this.emit(':tell', `Goodbye.`);
  },

  'SessionEndedRequest': function () {
  // Force State Save When User Times Out
  this.emit(':saveState', true);
  },

  // Provide help function
  'AMAZON.HelpIntent' : function () {
  this.emit(':ask', 'You can say tell me flavors to hear ice cream flavors. What would you like to do?',  `What would you like to do?`);
  },

  'Unhandled' : function () {
  this.emit(':ask', `You can say tell me flavors to hear ice cream flavors. What would you like to do?`,  `What would you like to do?`);
  }

};

```
Since we are using the Alexa SDK, we will need to make sure the node modules are included in our projects .zip file.  When you compress your project to upload it, include the node modules folder.  

After you have uploaded the project to your lambda project and have ensured that it can access the index file, we can test our skill in the Alexa developer portal and invoke it within the "Test" section of your skill builder.  This is shown below:


![finished model](https://github.com/mgstigler/Alexa/blob/master/IceCream/images/done.png?raw=true)


> __Note: If your Alexa device is connected to your developer account, you will actually be able to invoke your skill directly from your device.__


Congrats, you have finished your first skill!  Next, we will cover the publishing process for when you create your own unique skill.

Publishing Process
------------------

When your skill is ready for publication, you can submit it to Amazon for review. The Submit for Certification button becomes available once all required fields are completed.  These fields follow the testing portion of your Alexa development.

1. Log on to the Developer Portal.
Navigate to the Alexa section by clicking Apps & Services and then clicking Alexa in the top navigation. This displays a list of your existing Alexa skills.
Find the skill to submit in the list and choose Edit.

> __Note that there should be a green check mark next to each section. If any sections are missing the check mark, this means that at least one required field is not filled in. Review the section and complete all required fields.__

2. Click the Submit for Certification button. When prompted to confirm, click Yes.


3. After Amazon completes the review, you will receive an email at the address associated with your developer portal account:

*If the skill has been certified, the email will provide an estimate for when it will become available to end users.
If the skill could not be certified, the email provides information about the issues you need to correct. You can make any necessary changes and then re-submit.*


Conclusion
----------

After reading and working through this tutorial, you should have a basic understanding of how to create and publish an Alexa skill.  The source code for this can be located [here.](https://github.com/mgstigler/Alexa/tree/master/IceCream)

Next in Alexa Blog Series
-------------------------

In the next blog post in this Alexa series, Nick Cipollina will walk us through accessing location with Alexa.