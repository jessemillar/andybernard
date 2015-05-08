var slackbot = require('node-slackbot');

var bot = new slackbot('xoxb-4783098406-oickxKu4Lh1AOphmqJUfK4C0');

bot.use(function(message, callback) {
    if ('message' == message.type) {
        console.log(message.user + ' said: ' + message.text);

        bot.sendMessage(message.channel, 'Test');
    }

    callback();
});

bot.connect();
