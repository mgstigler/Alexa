Getting Started with Alexa
==========================

Not long ago, smart assistants were thought of as fun, gimicky devices used to tell jokes and check the weather.  Since the increasing availability of developer kits and tools, these devices have grown in their capabilities and are supporting many more useful and powerful applications from banking support to smart home communication to integrated applications with mobile.  Alexa is one of the most popular smart assistants and offers over 25,000 skills to help make tasks simpler and engaging for users.  With this rise in natural language processing, it becomes increasingly more necessary for developers to know how to create and publish Alexa skills.  

In this tutorial, we are going to cover the basics of getting started with Alexa development and will create a simple skill that will recite available ice cream flavors for an ice cream truck.

Key Terms
---------

__Intents__

An *intent* represents an action that fulfills a user's spoken request. Intents can optionally have arguments called slots. (ex: ReadFlavors)

__Utterances__

*Utterances* area a set of likely spoken phrases mapped to the intents. This should include as many representative phrases as possible. (ex: "tell me my ice cream options")

__Custom slot types__

*Custome slot types* are a representative list of possible values for a slot. Custom slot types are used for lists of items that are not covered by one of Amazon's built-in slot types. Some built-in slot types include date, location, name...

**For more information, visit [Amazon's guide](https://developer.amazon.com/docs/custom-skills/use-the-skill-builder-beta-to-define-intents-slots-and-dialogs.html).**


Prequisites
-----------
1. Have an AWS account [Go here to create one](https://aws.amazon.com/)
2. IDE of choice.  I will be using Visual Studio Code
3. Installed Node.js. [More information on Node.js](https://nodejs.org/en/)
4. Have access to the Alexa Developer Portal [Click here to sign in](https://developer.amazon.com/)



Configure your Skill in the Developer Portal
--------------------------------------------
1. Sign in to the developer portal
2. Click "Alexa"
3. Click "Get Started" under the "Alexa Skills Kit" option.
4. Click "Create Skill"
5. Enter a name for your skill and select "Custom"

The left toolbar will walk you through everything you need to create your skill.  We will start with the *invocation name* which is used to invoke your skill through the device. I will call it "ice cream truck".

Next, we will configure the Intents.  I created one called "ReadFlavors" with sample utterances.  The full JSON file for my schema can be found [here]()



Create a Function in AWS
------------------------
When you log in to the AWS management console, select *Lambda* from the list of services.  Lambda is the serverless computing option that AWS provides and is what is used to run and communicate with your Alexa skill.  

__Note: Make sure your region in the top right of your console is set to US East (N. Virginia). This region supports lambda functions triggered by Alexa skills.__

From the lambda console, choose *Create function* and complete the following steps:
1. Select "Author from Scratch"
2. Name your function.  I named mine "Ice Cream Truck".
3. Select "Node.js 6.10" as the runtime
4. Select "Create a custom role" if you don't have one for lambda functions already.  Then select "Lambda basic execution".
5. When you are brought to your lambda function, copy the __ARN__.  This amazon resource name is what you will use to connect your skill's intents and utterances to your function.


Integrate with DynamoDB
-----------------------



Publishing Process
------------------



Next in Series
--------------

In the next blog post in this Alexa series, Nick Cipollina will walk us through accessing location with Alexa.