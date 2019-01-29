const {
    RTMClient,
    WebClient
} = require('@slack/client');
require('dotenv').config();
var variables = require('./variables.json');
const fs = require('fs');
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

// function getChannels() {
//     const param = {
//         exclude_archived: true,
//         types: 'public_channel',
//         limit: 100
//     };
//     return web.conversations.list(param).then(results => {
//         return results.channels
//     });
// }

// var memes = [
//     "https://i.redd.it/15t618wal8v01.jpg",
//     "https://i.redd.it/6gnov60azdq01.png",
//     "https://i.redd.it/6bzk6633pip01.png",
//     "https://i.imgur.com/b9Xwb7U.jpg",
//     "https://i.redd.it/zqnc0ajt50m01.png",
//     "https://i.redd.it/q8d763j1jl401.jpg",
//     "https://i.redd.it/kt8gjgv7o6jz.png",
//     "https://i.imgur.com/e3QPay7.jpg",
//     "https://i.imgur.com/AE6VOqv.jpg"
// ];



rtm.on('channel_joined', (joinevent) => {
    console.log(joinevent);
    rtm.sendMessage('Hello! I am Cone Bot!', joinevent.channel.id);
});


// TODO Change all this shit to `messageSend` and `addReaction` function
rtm.on('message', (message) => {
    console.log(message);
    // ignores bot and self messages
    if ((!message.subtype && message.user === rtm.activeUserId)) {
        return;
    } else if ((message.subtype && message.subtype === 'message_changed')) {
        console.log('new message: ' + message.message.text + '\nfrom channel: ' + message.channel + '\nprevious message: ' + message.previous_message.text);
        if (message.message.text.includes('hullo')) {
            messageSend('Hello!', message.channel);
        }
    } else if (message.text.includes('hello')) { // replies to hello messagse
        messageSend('Hello!', message.channel);
    } else if (message.text.includes('sticky liquid')) { // adds a reaction to `sticky liquid`
        addReaction('sweat_drops', message.channel, message.ts);
    } else if (message.text === '!help') { // responds to !help command
        messageSend(variables.sendHelp, message.channel);
    } else if (message.text.includes('!drive')) { // response for google drive link
        messageSend(variables.drive, message.channel);
    } else if (message.text === '!googledrive') { // response for google drive link
        messageSend(variables.drive, message.channel);
    } else if (message.text.includes('!stash')) { // response for vms stash
        messageSend(variables.stash, message.channel);
    } else if (message.text.includes('!rules')) { // response for rulebook
        messageSend(variables.rules, message.channel);
    } else if (message.text === '!rulebook') { // response for rulebook
        messageSend(variables.rules, message.channel);
    } else if (message.text === '!rule') { // response for rulebook
        messageSend(variables.rules, message.channel);
    } else if (message.text === '!directory') { // response for channel directory
        messageSend(variables.channels, message.channel);
    } else if (message.text === '!slackchannel') { // response for channel directory
        messageSend(variables.channels, message.channel);
    } else if (message.text === '!channels') { // response for channel directory
        messageSend(variables.channels, message.channel);
    } else if (message.text === '!minutes') { // response for meeting minutes
        messageSend(variables.minutes, message.channel);
    } else if (message.text === '!meetingminutes') { // response for meeting minutes
        messageSend(variables.minutes, message.channel);
    } else if (message.text.includes('!buy')) { // response for ordering form
        messageSend(variables.orderform, message.channel);
    } else if (message.text.includes('!order')) { // response for ordering form
        messageSend(variables.orderform, message.channel);
    } else if (message.text === '!newb') { // response for new member form
        messageSend(variables.newb, message.channel);
    } else if (message.text === '!newmember') { // response for new member form
        messageSend(variables.newb, message.channel);
    } else if (message.text === '!welcome') { // response for new member form
        messageSend(variables.newb, message.channel);
    } else if (message.text.includes('!reference')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.includes('!references')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.includes('!lightreading')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.includes('!reading')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.includes('!read')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.includes('!documents')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.includes('!gantt')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.includes('!timeline')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.includes('!projects')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.includes('!ganttchart')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.includes('!currentcar')) { // response for car folder on google drive
        messageSend(variables.currentcar, message.channel);
    } else if (message.text.includes('!car')) { // response for car folder on google drive
        messageSend(variables.currentcar, message.channel);
    } else if (message.text.includes('!carfiles')) { // response for car folder on google drive
        messageSend(variables.currentcar, message.channel);
    } else if (message.text === 'Important announcement to the people of nsfw: it is now beer time!') { // response for car folder on google drive
        messageSend(':beers:', message.channel);
    } else if (message.text === '!tableflip') {
        messageSend('(╯°□°）╯︵ ┻━┻', message.channel);
    } else if (message.text === '!unflip') {
        messageSend('┬─┬ノ( º _ ºノ)', message.channel);
    } else if (message.text === '#PitG') {
        messageSend('Heads up <@UFHQT0UMQ>', message.channel);
    } else if (message.text === '!meme') {
        randomMeme(message.channel);
    }
});


function messageSend(textsend, channelsend) {
    rtm.sendMessage(textsend, channelsend)
        .then((res) => {
            console.log(`Message sent: \n` + res.text + '\n' + res.ts);
        }).catch(console.error);
}

function addReaction(emoji, channelreact, messagets) {
    web.apiCall('https://slack.com/api/reactions.add', {
            token: process.env.TOKEN,
            name: emoji,
            channel: channelreact,
            timestamp: messagets,
        })
        .then((res) => {
            console.log('Reaction added');
        }).catch(console.error);
}

function randomMeme(memechannel) {
    var memes = fs.readdirSync(__dirname + '/memes/');
    let memesend = memes[Math.floor(Math.random() * memes.length)];
    console.log('File to be sent:', memesend);
    web.files.upload({
            token: process.env.TOKEN,
            file: fs.createReadStream(__dirname + '/memes/' + memesend),
            channels: memechannel
        })
        .then((res) => {
            console.log('File sent:', res.file.name);
        }).catch(console.error);
}

// async function getChannels() {
//     web.apiCall('https://slack.com/api/conversations.list', {
//         token: process.env.TOKEN,
//         exclude_archived: true,
//         types: 'public_channel',
//     });
// }

rtm.on('reaction_event', (reactionevent) => {
    console.log(reactionevent);
});