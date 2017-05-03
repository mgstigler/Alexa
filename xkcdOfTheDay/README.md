# xkcd Getting Started

## About xkcd

xkcd is a A webcomic of romance, sarcasm, math, and language created by Randall Munroe.


## Skill Objective

The Alexa skill utilizes the public xkcd api: https://xkcd.com/json.html

- API Use
	This skill uses the API to gather the current comic as well as a specific comic (by number).  Another lambda function is used to fill an S3 library of images to provide images for the Skill cards.  The images are grabbed by a comic number and the img source provided in the JSON response.  For more information on the S3 upload process, look at the ImageUploader project ([ImageUploader](./imageUploader/))

- Skill Cards

	The skill cards are created using the information gathered from the API (title, caption, image url).  This skill demonstrates building these cards dynamically and returning them to the user.



## Alexa Specific Rules
	
	To hear the comic of the day: 'Read'.

	To hear a specific comic: 'Read ' + number of comic 

	To quit: 'Stop'
