const {
    RTMClient,
    WebClient
} = require('@slack/client');
require('dotenv').config();
var variables = require('./variables.json');
const fs = require('fs');

//* initialize rtm client
const rtm = new RTMClient(process.env.TOKEN);
rtm.start();

//* initialize web client
const web = new WebClient(process.env.TOKEN);

console.log('(╯°□°）╯︵ ┻━┻');

//* creates a /db/ folder in root if nonexistent
if (!fs.existsSync(__dirname + '/db')) {
    fs.mkdir(__dirname + '/db', (err) => {
        if (err) throw err;
    });
}

//TODO find some way to create a database of roles and add users to that databse so that they can all be @mentioned when a !role is called
// //* creates a /roles/ folder in /db/ if nonexistent
// if (!fs.existsSync(__dirname + '/db/roles/')) {
//     fs.mkdir(__dirname + '/db/roles/', (err) => {
//         if (err) throw err;
//     });
// }


// var rolenames = fs.readdirSync(__dirname + '/db/roles')

//* posts a greeting after being invited to a channel
rtm.on('channel_joined', (joinevent) => {
    console.log(joinevent);
    rtm.sendMessage('Hello! I am Cone Bot!', joinevent.channel.id);
});


rtm.on('message', (message) => {
    console.log(message);
    // ignores self messages
    if ((message.user === rtm.activeUserId && (!message.subtype || message.subtype === 'channel_join' || message.subtype === 'group_join'))) {
        return;
        // } else if (message.subtype && message.subtype === 'channel_join') {
        //     return;
    } else if ((message.subtype && (message.subtype === 'message_changed') || message.subtype === 'message_deleted' || message.subtype === 'message_replied' || message.subtype === 'thread_broadcast')) {
        // console.log('new message: ' + message.message.text + '\nfrom channel: ' + message.channel + '\nprevious message: ' + message.previous_message.text); // logs edited messages
        return; // ignores certain message subtypes
    } else if (message.text.toLowerCase().includes('\`')) {
        return;
    } else if (message.user === 'USLACKBOT' && (!message.is_ephemeral || message.is_ephemeral === false)) {
        getFirstName('USLACKBOT')
            .then(res => {
                var shutup = [`Shut up, ${res}.`, `${res}, you have no power here!`];
                var attack = shutup[Math.floor(Math.random() * shutup.length)];
                messageSend(attack, message.channel);
            }).catch(console.error);
    } else if (message.text.toLowerCase().includes('hello') && message.text.includes(`<@${rtm.activeUserId}>`)) { // replies to hello messagse
        pingReact(message.channel, message.ts);
        messageSend('...hey', message.channel);
    } else if (message.text.toLowerCase().includes('hello')) {
        messageSend('Hello! :blobwave:', message.channel);
    } else if (message.text.toLowerCase().includes('sticky liquid') || message.text.toLowerCase().includes('sticky juice')) { // adds a reaction to `sticky liquid`
        addReaction('sweat_drops', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('what') && message.text.toLowerCase().includes('do') && (message.text.toLowerCase().includes('cone') || message.text.toLowerCase().includes('bot'))) {
        messageSend('Type in `!help` to see what I can help you with.', message.channel);
    } else if (message.text.includes('!help')) { // responds to !help command
        messageSend(variables.sendHelp, message.channel);
    } else if (message.text.toLowerCase().includes('!drive') || message.text === '!googledrive') { // response for google drive link
        messageSend(variables.drive, message.channel);
    } else if (message.text.toLowerCase().includes('!stash')) { // response for vms stash
        messageSend(variables.stash, message.channel);
    } else if (message.text.toLowerCase().includes('!rule')) { // response for rulebook
        messageSend(variables.rules, message.channel);
    } else if (message.text === '!directory' || message.text === '!slackchannel' || message.text.toLowerCase().includes('!channels')) { // response for channel directory
        messageSend(variables.channels, message.channel);
    } else if (message.text.toLowerCase().includes('!minutes') || message.text === '!meetingminutes') { // response for meeting minutes
        messageSend(variables.minutes, message.channel);
    } else if (message.text.toLowerCase().includes('!buy') || message.text.toLowerCase().includes('!order')) { // response for ordering form
        messageSend(variables.orderform, message.channel);
    } else if (message.text === '!newb' || message.text === '!newmember' || message.text === '!welcome') { // response for new member form
        messageSend(variables.newb, message.channel);
    } else if (message.text.toLowerCase().includes('!reference') || message.text.toLowerCase().includes('!lightreading') || message.text.toLowerCase().includes('!read') || message.text.toLowerCase().includes('!documents')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    } else if (message.text.toLowerCase().includes('!gantt') || message.text.toLowerCase().includes('!timeline') || message.text.toLowerCase().includes('!projects')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    } else if (message.text.toLowerCase().includes('!currentcar') || message.text.toLowerCase().includes('!car')) { // response for car folder on google drive
        messageSend(variables.currentcar, message.channel);
    } else if (message.text.toLowerCase().includes('!affiliate') || message.text.toLowerCase().includes('!affiliation') || message.text.toLowerCase().includes('!register')) {
        messageSend(variables.affiliate, message.channel);
    } else if (message.text.toLowerCase().includes('!tutorial')) {
        messageSend(variables.tutorial, message.channel);
    } else if (message.text.includes('Important announcement to the people of nsfw: it is now beer time!')) { // response for car folder on google drive
        messageSend(':beers:', message.channel);
    } else if (message.text === '!tableflip' || message.text.toLowerCase().includes('!flip')) { // when you just can't handle it anymore
        messageSend('(╯°□°）╯︵ ┻━┻', message.channel);
    } else if (message.text === '!unflip') { // hey, rude
        messageSend('┬─┬ノ( º _ ºノ)', message.channel);
    } else if (message.text.includes('#PitP')) { // Pass it to Pawel
        messageSend('Heads up <@U7M5A125B>', message.channel);
    } else if (message.text === '!meme') { // gimme them dank memes
        randomMeme(message.channel);
    } else if (message.text.includes(`<@${rtm.activeUserId}>`) || message.text.includes('<!channel>') || message.text.includes('<!here>') || message.text.includes('<!everyone>')) { // Cone Bot doesn't like being pinged
        pingReact(message.channel, message.ts);
    } else if (message.user === 'U3ZPKC22V' && (message.text.toLowerCase().includes('vodka') || message.text.toLowerCase().includes('russian water') || message.text.toLowerCase().includes('slav'))) { // is super slav
        addReaction('beers', message.channel, message.ts);
        addReaction('blyat', message.channel, message.ts);
    } else if (message.text === '!updateusers') { // response to update user list
        updateUsers(message.channel);
    } else if (message.text.toLowerCase().includes('blyat')) { // cyka blyat
        addReaction('blyat', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('good night') || message.text.toLowerCase().includes('gnight')) { // wish someone good night
        goodnight(message.user, message.channel);
    } else if (message.text === '!getuserlist') { // send json file of user list to channel
        getUserList(message.channel);
    } else if (message.text === 'good morning') { // wish someone a good morning
        goodmorning(message.user, message.channel);
    } else if (message.text.toLowerCase().includes('help') && message.text.toLowerCase().includes('me') && (message.text.toLowerCase().includes('homework') || message.text.toLowerCase().includes('hw')) && (message.text.toLowerCase().includes('cone') || message.text.toLowerCase().includes('bot'))) {
        addReaction('drakeno', message.channel, message.ts);
        var halphw = ['Can\'t help you with that.', 'Sorry, no can do.', 'I am not programmed to do that.', 'You want _me_ to help you with your homework?', 'Do it yourself.'];
        let nohalp = halphw[Math.floor(Math.random() * halphw.length)];
        messageSend(nohalp, message.channel);
    } else if (message.text.toLowerCase().includes('help') && message.text.toLowerCase().includes('me') && (message.text.toLowerCase().includes('cone') || message.text.toLowerCase().includes('bot'))) {
        var plshelp = ['Type in `!help` for a list of what I can do.', 'Depends on what you need. Type `!help` to see what I can do.'];
        let nohelp = plshelp[Math.floor(Math.random() * plshelp.length)];
        messageSend(nohelp, message.channel);
    } else if (message.text.toLowerCase().includes('cone') && (message.text.toLowerCase().includes('avoid') || message.text.toLowerCase().includes('mind') || message.text.toLowerCase().includes('watch out'))) {
        addReaction('cone', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('ducttape') || message.text.toLowerCase().includes('duct tape')) {
        addReaction('ducttape', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('yeet')) {
        addReaction('yeet', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('send it') || message.text.toLowerCase().includes('sent it')) {
        addReaction('sendit', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('euro')) {
        addReaction('flag-eu', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('salt')) {
        addReaction('salt', message.channel, message.ts);
    } else if (message.text.toLowerCase().includes('post malone')) {
        addReaction('victor', message.channel, message.ts);
    } else if (message.text === '!d4' || message.text === '!d6' || message.text === '!d8' || message.text === '!d10' || message.text === '!d12' || message.text === '!d20') {
        rollDice(message.text, message.channel);
    }
});

//* function to automatically join a newly created channel
rtm.on('channel_created', (newchannel) => {
    console.log(newchannel.channel.id);
    var params = {
        token: process.env.UTOKEN,
        channel: newchannel.channel.id,
        users: rtm.activeUserId
    };
    web.conversations.invite(params)
        .then(console.log('Joined channel:', newchannel.channel.name))
        .catch(console.error);
});

//! Start of user defined functions

function messageSend(textsend, channelsend) { //* function for sending a message
    rtm.sendMessage(textsend, channelsend)
        .then((res) => {
            console.log('Message sent: \n' + res.text + '\n' + res.ts);
        }).catch(console.error);
}

function addReaction(emoji, channelreact, messagets) { //* function for adding a reaction to a message
    let params = {
        token: process.env.TOKEN,
        name: emoji,
        channel: channelreact,
        timestamp: messagets
    };
    web.reactions.add(params)
        .then(res => {
            console.log('Reaction added');
        }).catch(console.error);
}

function randomMeme(memechannel) { //* function to randomly send a meme image from image list in /memes folder
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

function getAllUsers() { //* function to obtain a list of all users in the workspace
    const param = {
        token: process.env.TOKEN,
        limit: 150
    };
    return web.users.list(param).then(results => {
        return results.members;
    });
}

function updateUsers(updatechannel) { //* function to update the database json file with the list of current users
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
                username: usersdata.name,
                firstName: usersdata.profile.first_name,
                lastName: usersdata.profile.last_name
            }));
            console.log(users);
            fs.writeFile(__dirname + '/db/users_simplified.json', JSON.stringify(users, null, 2), (err) => {
                if (err) throw err;
                console.log('Simplified data written');
            });
        });
    // getAllUsers()
    // .then(res => {
    //     if (res.deleted === true) 
    // })
    messageSend('User list updated', updatechannel);
}

function getUserList(updatechannel) { //* function to send the json of user list to called channel
    web.files.upload({
            token: process.env.TOKEN,
            file: fs.createReadStream(__dirname + '/db/users_simplified.json'),
            channels: updatechannel
        })
        .then((res) => {
            console.log('File sent:', res.file.name);
        }).catch(console.error);
}

function getFirstName(userid) { //* function to convert the user.id parameter into the user's full name
    const param = {
        token: process.env.TOKEN,
        user: userid
    };
    return web.users.info(param).then(results => {
        // return results.user.real_name;
        return results.user.profile.first_name;
    }).catch(console.error);
}

function goodmorning(msgauthor, gmchannel) { //* function to greet someone in the morning
    getFirstName(msgauthor)
        .then(res => {
            console.log(res);
            messageSend(`Good morning, ${res}!`, gmchannel);
        }).catch(console.error);
}

function goodnight(msgauthor, gnchannel) { //* function to wish someone a good night
    getFirstName(msgauthor)
        .then(res => {
            console.log('First name:', res);
            let gn = [`Good night, ${res}!`, `Sweet dreams, ${res}!`, `Have a good night, ${res}.`];
            let saygn = gn[Math.floor(Math.random() * gn.length)];
            messageSend(saygn, gnchannel);
        }).catch(console.error);
}

function pingReact(reactch, reactts) {
    var emojis = ['pingshake', 'pingsock', 'pingthink', 'pingwhat'];
    let sendmoji = emojis[Math.floor(Math.random() * emojis.length)];
    addReaction(sendmoji, reactch, reactts);
}

function rollDice(dx ,rollchannel) {
    if (dx.includes('d4')) {
        let num = Math.floor((Math.random() * 4) + 1);
        messageSend(num.toString(), rollchannel);
    } else if (dx.includes('d6')) {
        let num = Math.floor((Math.random() * 6) + 1);
        messageSend(num.toString(), rollchannel);
    } else if (dx.includes('d8')) {
        let num = Math.floor((Math.random() * 8) + 1);
        messageSend(num.toString(), rollchannel);
    } else if (dx.includes('d10')) {
        let num = Math.floor((Math.random() * 10) + 1);
        messageSend(num.toString(), rollchannel);
    } else if (dx.includes('d12')) {
        let num = Math.floor((Math.random() * 12) + 1);
        messageSend(num.toString(), rollchannel);
    } else if (dx.includes('d20')) {
        let num = Math.floor((Math.random() * 20) + 1);
        messageSend(num.toString(), rollchannel);
    }
}