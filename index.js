var slackbot = require('node-slackbot');

var gifURL = 'http://www.jessemillar.com/andybernard/images/gifs/';
var gifs = [gifURL + 'awkward.gif', gifURL + 'dancing.gif', gifURL + 'flying.gif', gifURL + 'lachrymose.gif', gifURL + 'nailed it.gif', gifURL + 'smug.gif'];

var closingTime = 'https://open.spotify.com/track/1A5V1sxyCLpKJezp75tUXn';

var bot = new slackbot('xoxb-4783098406-oickxKu4Lh1AOphmqJUfK4C0');

bot.use(function(message, callback) {
    console.log(message);

    if ('message' == message.type) {
        // console.log(message.user + ' said: ' + message.text);

        bot.sendMessage(message.channel, gifs[Math.round(Math.random() * (gifs.length - 0))]); // The default response of a random GIF
    }

    callback();
});

bot.connect();
