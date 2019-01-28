const {
    WebClient
} = require('@slack/client');
require('dotenv').config();

const bot = new WebClient(process.env.BOTTOKEN);

function getAllChannels() {
    const param = {
        exclude_archived: true,
        types: 'public_channel',
        limit: 100
    };
    return bot.conversations.list(param).then(results => {
        return results.channels
    });
}

var channels = getAllChannels();
console.log(channels);