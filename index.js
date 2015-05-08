var config = require('./config.js');

Slack = require('node-slackr');

slack = new Slack(config.hookURI);

var message = {
    text: 'Hello!',
    channel: '#bottest',
    username: 'andybernard',
    icon_url: "http://www.jessemillar.com/andybernard/images/andy.png"
};
    
slack.notify(message);
