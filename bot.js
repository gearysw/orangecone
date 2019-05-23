const {
    WebClient
} = require('@slack/web-api');
const {
    RTMClient
} = require('@slack/rtm-api');
require('dotenv').config();
const fs = require('fs');

//* initiate rtm client
const rtm = new RTMClient(process.env.TOKEN);
(async () => {
    const {
        self,
        team
    } = await rtm.start();
    console.log('RTM connected');
})();

//* initiate web client
const web = new WebClient(process.env.TOKEN);

//* post greeting after being invited to a channel
rtm.on('channel_joined', async (event) => {
    try {
        const message = await rtm.sendMessage('Hello! I am Cone Bot!', event.channel.id);
        console.log('Message sent \n', message);
    } catch (error) {
        console.log('Error occured \n', error);
    }
});

//* greet new members by sending pm
rtm.on('team_join', async (joinedUser) => {
    console.log(joinedUser);
    try {
        const pmchannel = await web.im.open({
            token: process.env.TOKEN,
            user: joinedUser.user.id
        });
        let greeting = `Hello ${joinedUser.user.profile.real_name}! Welcome to Viking Motorsports. You can join channels related to your interest in the team. To get started, type in \`!channels\` in here to see the help file. You can also type in \`!help\` to see what I can help you with. If you have questions, feel free to ask in the <#C40D4TU3U> channel. Also, please set your avatar to a picture of yourself to make it easier for us to identify you.`;
        try {
            const pmmessage = await rtm.sendMessage(greeting, pmchannel.channel.id);
            console.log(pmmessage);
        } catch (err) {
            console.log(err);
        }
    } catch (error) {
        console.log(error);
    }
});

//* message commands
rtm.on('message', async (message) => {
    console.log(message);
    // message filters
    if (message.user === rtm.activeUserId && (!message.subtype || message.subtype === 'channel_join' || message.subtype === 'group_join')) { // ignores self messages
        return;
    }
    if (message.subtype && (message.subtype === 'message_changed' || message.subtype === 'message_deleted' || message.subtype === 'message_replied' || message.subtype === 'thread_broadcast')) { // ignores certain subtypes
        return;
    }
    if (message.text.toLowerCase().includes('\`')) { // ignores messages that contain markdown
        return;
    }
    // basic commands
    if (message.text.toLowerCase().includes('hello')) {
        messageSend('Hello! :blobwave:', message.channel);
    }
    if (message.text.toLowerCase().includes('bad bot')) {
        addReaction('middle_finger', message.channel, message.ts);
    }
});

//* function to automatically join a newly created channel
rtm.on('channel_created', async (newchannel) => {
    console.log(newchannel.channel.id);
    try {
        const res = await web.conversations.invite({
            token: process.env.UTOKEN,
            channel: newchannel.channel.id,
            users: rtm.activeUserId
        });
        console.log('Joined channel: ', newchannel.channel.name);
    } catch (error) {
        console.log(error);
    }
});

//? user defined functions
async function messageSend(message, channel) {
    try {
        const res = await rtm.sendMessage(message, channel);
        console.log('Message sent\ntext: ' + res.text + '\nts: ' + res.ts);
    } catch (error) {
        console.log(error);
    }
}

async function addReaction(emoji, channel, messagets) {
    try {
        const res = await web.reactions.add({
            token: process.env.TOKEN,
            name: emoji,
            channel: channel,
            timestamp: messagets
        });
        console.log('Reaction added');
    } catch (err) {
        console.log(err);
    }
}