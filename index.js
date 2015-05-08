var config = require('./config.js'),
    slackbot = require('node-slackbot'),
    needle = require('needle');

var gifURL = 'http://www.jessemillar.com/andybernard/images/gifs/',
    gifs = [gifURL + 'awkward.gif', gifURL + 'dancing.gif', gifURL + 'flying.gif', gifURL + 'lachrymose.gif', gifURL + 'nailed.gif', gifURL + 'smug.gif'],
    closingTime = 'https://open.spotify.com/track/1A5V1sxyCLpKJezp75tUXn';

var andy = new slackbot(config.apiToken);

andy.use(function(message, callback) {
    if (message.user && message.text) {
        console.log(message.user + ' said, "' + message.text + '"');
    }

    if (message.type == 'message' && message.user) {
        needle.get('https://slack.com/api/users.info?token=' + config.apiToken + '&user=' + message.user, function(error, response) {
            if (!error) {
                if (!response.body.user.is_bot) {
                    andy.sendMessage(message.channel, gifs[Math.round(Math.random() * (gifs.length - 0))]); // The default response of a random GIF
                }
            }
        });
    }

    callback();
});

andy.connect();
