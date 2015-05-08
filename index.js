var currentGIF = 0, // Show the GIFs in order
    timeOffset = 2; // Add (or subtract) a time offset to compensate for the location of my server

var config = require('./config.js'),
    slackbot = require('node-slackbot'),
    needle = require('needle');

var gifURL = 'http://www.jessemillar.com/andybernard/images/gifs/',
    gifs = [gifURL + 'awkward.gif', gifURL + 'dancing.gif', gifURL + 'flying.gif', gifURL + 'lachrymose.gif', gifURL + 'nailed.gif', gifURL + 'smug.gif'],
    closingTime = 'https://open.spotify.com/track/1A5V1sxyCLpKJezp75tUXn';

var date = new Date();
console.log('The current time is ' + Number(date.getHours() - timeOffset) + ':' + date.getMinutes());

setInterval(function() { // Tell everyone when it's time to go home (at 5pm)
    if (new Date().getHours() == (17 + timeOffset) && new Date().getMinutes() == 59) {
        needle.get('https://slack.com/api/chat.postMessage?token=' + config.apiToken + "&channel=%23general&text=It's%20closing%20time%2C%20everybody!%20https%3A%2F%2Fopen.spotify.com%2Ftrack%2F1A5V1sxyCLpKJezp75tUXn");
    }
}, 1000 * 60); // Check the time every minute

var andy = new slackbot(config.botToken); // Respond to messages

andy.use(function(message, callback) {
    if (message.type == 'message' && message.user) {
        needle.get('https://slack.com/api/users.info?token=' + config.apiToken + '&user=' + message.user, function(error, response) {
            if (!error) {
                if (!response.body.user.is_bot) { // Make sure we're not reading back one of our own messages
                    console.log(response.body.user.real_name + ' said, "' + message.text + '"');

                    andy.sendMessage(message.channel, gifs[currentGIF]); // The default response of a random GIF

                    if (currentGIF < gifs.length - 1) { // Show the GIFs in order
                        currentGIF++;
                    } else {
                        currentGIF = 0;
                    }
                }
            }
        });
    }

    callback();
});

andy.connect();
