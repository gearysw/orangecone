const {
    RTMClient,
    WebClient
} = require('@slack/client');
require('dotenv').config();
var variables = require('./variables.json');
const fs = require('fs');

// initialize rtm client
const rtm = new RTMClient(process.env.TOKEN);
rtm.start();

// initialize web client
const web = new WebClient(process.env.TOKEN);

console.log('(╯°□°）╯︵ ┻━┻');

if (!fs.existsSync(__dirname + '/db')) {
    fs.mkdir(__dirname + '/db', (err) => {
        if (err) throw err;
    });
}

rtm.on('channel_joined', (joinevent) => {
    console.log(joinevent);
    rtm.sendMessage('Hello! I am Cone Bot!', joinevent.channel.id);
});


rtm.on('message', (message) => {
    console.log(message);
    // ignores self messages
    if ((!message.subtype && message.user === rtm.activeUserId)) {
        return;
    } else if ((message.subtype && message.subtype === 'message_changed')) {
        console.log('new message: ' + message.message.text + '\nfrom channel: ' + message.channel + '\nprevious message: ' + message.previous_message.text); // logs edited messages
    } else if (message.text.toLowerCase().includes('\`')) {
        return;
    } else if (message.user === 'USLACKBOT' && !message.is_ephemeral) {
        messageSend('Shut up, <@USLACKBOT>.', message.channel);
    } else if (message.text.toLowerCase().includes('hello') && message.text.includes(`<@${rtm.activeUserId}>`)) { // replies to hello messagse
        addReaction('pingshake', message.channel, message.ts);
        messageSend('Hello!', message.channel);
    } else if (message.text.toLowerCase().includes('hello')) {
        messageSend('Hello!', message.channel);
    } else if (message.text.toLowerCase().includes('sticky liquid')) { // adds a reaction to `sticky liquid`
        addReaction('sweat_drops', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('sticky juice')) { // adds a reaction to `sticky liquid`
        addReaction('sweat_drops', message.channel, message.ts);
    } else if (message.text === '!help') { // responds to !help command
        messageSend(variables.sendHelp, message.channel);
    } else if (message.text.toLowerCase().includes('!drive')) { // response for google drive link
        messageSend(variables.drive, message.channel);
    } else if (message.text === '!googledrive') { // response for google drive link
        messageSend(variables.drive, message.channel);
    } else if (message.text.toLowerCase().includes('!stash')) { // response for vms stash
        messageSend(variables.stash, message.channel);
    } else if (message.text.toLowerCase().includes('!rules')) { // response for rulebook
        messageSend(variables.rules, message.channel);
    } else if (message.text === '!rulebook') { // response for rulebook
        messageSend(variables.rules, message.channel);
    } else if (message.text.toLowerCase().includes('!rule')) { // response for rulebook
        messageSend(variables.rules, message.channel);
    } else if (message.text === '!directory') { // response for channel directory
        messageSend(variables.channels, message.channel);
    } else if (message.text === '!slackchannel') { // response for channel directory
        messageSend(variables.channels, message.channel);
    } else if (message.text.toLowerCase().includes('!channels')) { // response for channel directory
        messageSend(variables.channels, message.channel);
    } else if (message.text.toLowerCase().includes('!minutes')) { // response for meeting minutes
        messageSend(variables.minutes, message.channel);
    } else if (message.text === '!meetingminutes') { // response for meeting minutes
        messageSend(variables.minutes, message.channel);
    } else if (message.text.toLowerCase().includes('!buy')) { // response for ordering form
        messageSend(variables.orderform, message.channel);
    } else if (message.text.toLowerCase().includes('!order')) { // response for ordering form
        messageSend(variables.orderform, message.channel);
    } else if (message.text === '!newb') { // response for new member form
        messageSend(variables.newb, message.channel);
    } else if (message.text === '!newmember') { // response for new member form
        messageSend(variables.newb, message.channel);
    } else if (message.text === '!welcome') { // response for new member form
        messageSend(variables.newb, message.channel);
    } else if (message.text.toLowerCase().includes('!reference')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.toLowerCase().includes('!references')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.toLowerCase().includes('!lightreading')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.toLowerCase().includes('!reading')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.toLowerCase().includes('!read')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.toLowerCase().includes('!documents')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.toLowerCase().includes('!gantt')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.toLowerCase().includes('!timeline')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.toLowerCase().includes('!projects')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.toLowerCase().includes('!ganttchart')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.toLowerCase().includes('!currentcar')) { // response for car folder on google drive
        messageSend(variables.currentcar, message.channel);
    } else if (message.text.toLowerCase().includes('!car')) { // response for car folder on google drive
        messageSend(variables.currentcar, message.channel);
    } else if (message.text.toLowerCase().includes('!carfiles')) { // response for car folder on google drive
        messageSend(variables.currentcar, message.channel);
    } else if (message.text === 'Important announcement to the people of nsfw: it is now beer time!') { // response for car folder on google drive
        messageSend(':beers:', message.channel);
    } else if (message.text === '!tableflip') {
        messageSend('(╯°□°）╯︵ ┻━┻', message.channel);
    } else if (message.text === '!unflip') {
        messageSend('┬─┬ノ( º _ ºノ)', message.channel);
    } else if (message.text.includes('#PitP')) {
        messageSend('Heads up <@U7M5A125B>', message.channel);
    } else if (message.text === '!meme') {
        randomMeme(message.channel);
    } else if (message.text.includes(`<@${rtm.activeUserId}>`)) {
        addReaction('pingshake', message.channel, message.ts);
    } else if (message.text === '!updateusers') {
        updateUsers(message.channel);
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

function getAllUsers() {
    const param = {
        token: process.env.TOKEN
    };
    return web.users.list(param).then(results => {
        return results.members;
    });
}


function updateUsers(updatechannel) {
    getAllUsers()
        .then(res => {
            // console.log(res);
            fs.writeFile(__dirname + '/db/users.json', JSON.stringify(res, null, 2), (err) => {
                if (err) throw err;
                console.log('Data written');
            });
        })
        .catch(console.error);

    getAllUsers()
        .then(res => {
            var users = res.map(usersdata => ({
                id: usersdata.id,
                name: usersdata.name
            }));
            console.log(users);
            fs.writeFile(__dirname + '/db/users_simplified.json', JSON.stringify(users, null, 2), (err) => {
                if (err) throw err;
                console.log('Simplified data written');
            });
        });

    messageSend('User list updated', updatechannel);

    web.files.upload({
            token: process.env.TOKEN,
            file: fs.createReadStream(__dirname + '/db/users_simplified.json'),
            channels: updatechannel
        })
        .then((res) => {
            console.log('File sent:', res.file.name);
        }).catch(console.error);
}