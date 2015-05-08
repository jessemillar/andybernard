var config = require('./config.js'),
    slackbot = require('node-slackbot'),
    needle = require('needle');

var gifURL = 'http://www.jessemillar.com/andybernard/images/gifs/',
    gifs = [gifURL + 'awkward.gif', gifURL + 'dancing.gif', gifURL + 'flying.gif', gifURL + 'lachrymose.gif', gifURL + 'nailed.gif', gifURL + 'smug.gif'],
    closingTime = 'https://open.spotify.com/track/1A5V1sxyCLpKJezp75tUXn';

var andy = new slackbot(config.botToken);

// needle.get('https://slack.com/api/channels.list?token=' + config.apiToken, function(error, response) {
//     if (!error) {
//         for (var i = 0; i < response.body.channels.length; i++) {
//             if (response.body.channels[i].name == 'bottest') {
//                 console.log('Sending');
//                 andy.sendMessage(response.body.channels[i].id, 'Test');
//                 return;
//             }
//         }
//     }
// });

andy.use(function(message, callback) {
    if (message.type == 'message' && message.user) {
        needle.get('https://slack.com/api/users.info?token=' + config.apiToken + '&user=' + message.user, function(error, response) {
            if (!error) {
                if (!response.body.user.is_bot) { // Make sure we're not reading back one of our own messages
                    console.log(response.body.user.real_name + ' said, "' + message.text + '"');
                    andy.sendMessage(message.channel, gifs[Math.round(Math.random() * (gifs.length - 0))]); // The default response of a random GIF
                }
            }
        });
    }

    callback();
});

andy.connect();
