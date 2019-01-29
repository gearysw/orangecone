const {
    RTMClient,
    WebClient
} = require('@slack/client');
require('dotenv').config();
var variables = require('./variables.json');
// const token = process.env.BOTTOKEN;

// initialize rtm client
const rtm = new RTMClient(process.env.TOKEN);
rtm.start();

// initialize web client to find channels
const web = new WebClient(process.env.TOKEN);

console.log('(╯°□°）╯︵ ┻━┻');
// load channel list asynchronously
// web.channels.list()
//     .then((res) => {
//         //take any channel the bot is member of
//         const channel = res.channels.find(c => c.is_member);

//         if (channel) {
//             // channel ID get!
//             // use `sendMessage()` method to send string to channel


//             rtm.sendMessage('I have been given life by Lord Geary.',channel.id)
//                 // return promise that resolves when message is sent
//                 .then((msg) => console.log(`Message sent to channel ${channel.name} with ts:${msg.ts}`))
//                 .catch(console.error);

//         } else {
//             console.log('Bot does not belong in a channel, invite to a channel');
//         }
//     });

// variacbles for !command responses
// var sendHelp = '!drive: Google Drive folder. \n!stash: VMS stash directory. \n!newb: new member packet. \n!rules: FSAE rulebook link. \n!reference: reference documents folder. \n!timeline: view the current timeline of projects. \n!currentcar: folder of the current car. \n!channels: Slack channel tutorial. \n!minutes: general meeting minutes. \n!order: ordereing form. \n!tableflip: flip a table.';

// var drive = 'https://drive.google.com/drive/folders/0B5z09FdfsPYJUjB2bG5qNFNwTzA?usp=sharing';

// var stash = 'Connecting to stash from Windows: `https://cat.pdx.edu/platforms/windows/remote-access/windows-to-stash/` \nConnecting to stash from Mac: `https://cat.pdx.edu/platforms/mac/remote-access/stash/` \nConnecting to stash from Linux: `https://cat.pdx.edu/platforms/linux/remote-access/connect-stash/` \nConnecting to VPN: `https://cat.pdx.edu/services/network/vpn-services/` \nVMS stash name: `vms`';

// var rulebook = 


rtm.on('channel_joined', (joinevent) => {
    console.log(joinevent);
    rtm.sendMessage('Hello! I am Cone Bot!', joinevent.channel.id);
});


// TODO Change all this shit to `messageSend` and `addReaction` function
rtm.on('message', (message) => {
    console.log(message);
    // ignores bot and self messages
    // if ( (message.subtype && message.subtype === 'bot_message') || (!message.subtype && message.user === rtm.activeUserId)){
    //     return;
    // } else 
    if (message.text.includes('hello')) { // replies to hello messagse
        rtm.sendMessage('Hello!', message.channel)
            .then((res) => {
                console.log('Message sent:', res.text, res.ts);
            }).catch(console.error);
    } else if (message.text.includes('sticky liquid')) { // adds a reaction to `sticky liquid`
        web.apiCall('https://slack.com/api/reactions.add', {
                token: process.env.TOKEN,
                name: 'sweat_drops',
                channel: message.channel,
                timestamp: message.ts,
            })
            .then((res) => {
                console.log('Reaction added');
            }).catch(console.error);
    } else if (message.text === '!help') { // responds to !help command
        rtm.sendMessage(variables.sendHelp, message.channel)
            .then((res) => {
                console.log('Message sent: \n' + res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!drive')) { // response for google drive link
        rtm.sendMessage(variables.drive, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!googledrive') { // response for google drive link
        rtm.sendMessage(variables.drive, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!stash')) { // response for vms stash
        rtm.sendMessage(variables.stash, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!rules')) { // response for rulebook
        rtm.sendMessage(variables.rules, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!rulebook') { // response for rulebook
        rtm.sendMessage(variables.rules, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!rule') { // response for rulebook
        rtm.sendMessage(variables.rules, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!directory') { // response for channel directory
        rtm.sendMessage(variables.channels, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!slackchannel') { // response for channel directory
        rtm.sendMessage(variables.channels, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!channels') { // response for channel directory
        rtm.sendMessage(variables.channels, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!minutes') { // response for meeting minutes
        rtm.sendMessage(variables.minutes, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!meetingminutes') { // response for meeting minutes
        rtm.sendMessage(variables.minutes, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!buy')) { // response for ordering form
        rtm.sendMessage(variables.orderform, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!order')) { // response for ordering form
        rtm.sendMessage(variables.orderform, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!newb') { // response for new member form
        rtm.sendMessage(variables.newb, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!newmember') { // response for new member form
        rtm.sendMessage(variables.newb, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!welcome') { // response for new member form
        rtm.sendMessage(variables.newb, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!reference')) { // response for reference documents
        rtm.sendMessage(variables.reference, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!references')) { // response for reference documents
        rtm.sendMessage(variables.reference, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!lightreading')) { // response for reference documents
        rtm.sendMessage(variables.reference, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!reading')) { // response for reference documents
        rtm.sendMessage(variables.reference, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!read')) { // response for reference documents
        rtm.sendMessage(variables.reference, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!documents')) { // response for reference documents
        rtm.sendMessage(variables.reference, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!gantt')) { // response for gantt chart
        rtm.sendMessage(variables.timeline, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!timeline')) { // response for gantt chart
        rtm.sendMessage(variables.timeline, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!projects')) { // response for gantt chart
        rtm.sendMessage(variables.timeline, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!ganttchart')) { // response for gantt chart
        rtm.sendMessage(variables.timeline, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!currentcar')) { // response for car folder on google drive
        rtm.sendMessage(variables.currentcar, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!car')) { // response for car folder on google drive
        rtm.sendMessage(variables.currentcar, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text.includes('!carfiles')) { // response for car folder on google drive
        rtm.sendMessage(variables.currentcar, message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === 'Important announcement to the people of nsfw: it is now beer time!') { // response for car folder on google drive
        rtm.sendMessage(':beers:', message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            }).catch(console.error);
    } else if (message.text === '!tableflip') {
        rtm.sendMessage('(╯°□°）╯︵ ┻━┻', message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            });
    } else if (message.text === '!unflip') {
        rtm.sendMessage('┬─┬ノ( º _ ºノ)', message.channel)
            .then((res) => {
                console.log('Message sent:', res.text + '\n' + res.ts);
            });
    }
});

function messageSend(textsend) {
    rtm.sendMessage(textsend, message.channel)
        .then((res) => {
            console.log('Message sent: \n' + res.text + '\n' + res.ts);
        }).catch(console.error);
}

function addReaction(emoji) {
    web.apiCall('https://slack.com/api/reactions.add', {
        token: process.env.TOKEN,
        name: emoji,
        channel: message.channel,
        timestamp: message.ts,
    });
}

rtm.on('reaction_event', (reactionevent) => {
    console.log(reactionevent);
});