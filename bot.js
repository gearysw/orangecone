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

//* posts a greeting after being invited to a channel
rtm.on('channel_joined', (joinevent) => {
    console.log(joinevent);
    rtm.sendMessage('Hello! I am Cone Bot!', joinevent.channel.id);
});

//* message commands
rtm.on('message', (message) => {
    console.log(message);
    // message filters
    if ((message.user === rtm.activeUserId && (!message.subtype || message.subtype === 'channel_join' || message.subtype === 'group_join'))) { // ignores self messages
        return;
    }
    if ((message.subtype && (message.subtype === 'message_changed') || message.subtype === 'message_deleted' || message.subtype === 'message_replied' || message.subtype === 'thread_broadcast')) { // ignores certain message subtypes
        return;
    }
    if (message.text.toLowerCase().includes('\`')) { // ignores messages that contain `backtick` texts
        return;
    }
    if (message.user === 'USLACKBOT' && (!message.is_ephemeral || message.is_ephemeral === false)) { // f u slackbot
        getFirstName('USLACKBOT')
            .then(res => {
                var shutup = [`Shut up, ${res}.`, `${res}, you have no power here!`];
                var attack = shutup[Math.floor(Math.random() * shutup.length)];
                messageSend(attack, message.channel);
            }).catch(console.error);
    }
    // basic commands
    if (message.text.toLowerCase().includes('hello')) {
        if (message.text.includes(`<@${rtm.activeUserId}>`)) {
            messageSend('...hey', message.channel);
        } else {
            messageSend('Hello! :blobwave:', message.channel);
        }
    }
    if (message.text.toLowerCase().includes('what') && message.text.toLowerCase().includes('do') && (message.text.toLowerCase().includes('cone') || message.text.toLowerCase().includes('bot'))) {
        messageSend('Type in `!help` to see what I can help you with.', message.channel);
    }
    if (message.text.includes('!help')) { // responds to !help command
        messageSend(variables.sendHelp, message.channel);
    }
    if (message.text.toLowerCase().includes('!drive') || message.text === '!googledrive') { // response for google drive link
        messageSend(variables.drive, message.channel);
    }
    if (message.text.toLowerCase().includes('!stash')) { // response for vms stash
        messageSend(variables.stash, message.channel);
    }
    if (message.text.toLowerCase().includes('!rule')) { // response for rulebook
        messageSend(variables.rules, message.channel);
    }
    if (message.text === '!directory' || message.text === '!slackchannel' || message.text.toLowerCase().includes('!channels')) { // response for channel directory
        messageSend(variables.channels, message.channel);
    }
    if (message.text.toLowerCase().includes('!minutes') || message.text === '!meetingminutes') { // response for meeting minutes
        messageSend(variables.minutes, message.channel);
    }
    if (message.text.toLowerCase().includes('!buy') || message.text.toLowerCase().includes('!order')) { // response for ordering form
        messageSend(variables.orderform, message.channel);
    }
    if (message.text === '!newb' || message.text === '!newmember' || message.text === '!welcome') { // response for new member form
        messageSend(variables.newb, message.channel);
    }
    if (message.text.toLowerCase().includes('!reference') || message.text.toLowerCase().includes('!lightreading') || message.text.toLowerCase().includes('!read') || message.text.toLowerCase().includes('!documents')) { // response for reference documents
        messageSend(variables.reference, message.channel);
    }
    if (message.text.toLowerCase().includes('!gantt') || message.text.toLowerCase().includes('!timeline') || message.text.toLowerCase().includes('!projects')) { // response for gantt chart
        messageSend(variables.timeline, message.channel);
    }
    if (message.text.toLowerCase().includes('!currentcar') || message.text.toLowerCase().includes('!car')) { // resposne for car folder on google drive
        messageSend(variables.currentcar, message.channel);
    }
    if (message.text.toLowerCase().includes('!affiliate') || message.text.toLowerCase().includes('!affiliation') || message.text.toLowerCase().includes('!register')) {
        messageSend(variables.affiliate, message.channel);
    }
    if (message.text.toLowerCase().includes('!tutorial')) {
        messageSend(variables.tutorial, message.channel);
    }
    if (message.text.toLowerCase().includes('!rolehelp')) {
        messageSend(variables.rolehelp, message.channel);
    }
    if (message.text.includes('Important announcement to the people of nsfw: it is now beer time!')) { // response for car folder on google drive
        messageSend(':beers:', message.channel);
    }
    if (message.text === '!tableflip' || message.text.toLowerCase().includes('!flip')) { // when you just can't handle it anymore
        messageSend('(╯°□°）╯︵ ┻━┻', message.channel);
    }
    if (message.text === '!unflip') { // hey, rude
        messageSend('┬─┬ノ( º _ ºノ)', message.channel);
    }
    if (message.text.includes('#PitP')) { // Pass it to Pawel
        messageSend('Heads up <@U7M5A125B>', message.channel);
    }
    if (message.text.toLowerCase().includes('shopmanager') || message.text.toLowerCase().includes('shop manager')) {
        messageSend('Heads up <@U7QUF4J22>', message.channel);
    }
    if (message.text.toLowerCase().includes('!meme')) { // gimme them dank memes
        randomMeme(message.channel);
    }
    // easter eggs
    if (message.text.toLowerCase().includes('sticky liquid') || message.text.toLowerCase().includes('sticky juice')) { // adds a reaction to `sticky liquid`
        addReaction('sweat_drops', message.channel, message.ts);
    }
    if (message.user === 'U3ZPKC22V' && (message.text.toLowerCase().includes('vodka') || message.text.toLowerCase().includes('russian water') || message.text.toLowerCase().includes('slav'))) { // is super slav
        addReaction('tumbler_glass', message.channel, message.ts);
        addReaction('blyat', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('blyat')) { // cyka blyat
        addReaction('blyat', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('good night') || message.text.toLowerCase().includes('gnight')) { // wish someone good night
        goodnight(message.user, message.channel);
    }
    if (message.text.toLowerCase().includes('good morning')) { // wish someone a good morning
        goodmorning(message.user, message.channel);
    }
    if (message.text.toLowerCase().includes('good afternoon')) {
        goodafternoon(message.user, message.channel);
    }
    if (message.text.toLowerCase().includes('good bot')) {
        addReaction('hugging_face', message.channel, message.ts);
        getFirstName(message.user)
            .then(res => {
                messageSend(`Thank you, ${res}!`, message.channel);
            }).catch(console.error);
    }
    if (message.text.toLowerCase().includes('bad bot')) {
        addReaction('middle_finger', message.channel, message.ts);
        badbot(message.channel);
    }
    if (message.text.toLowerCase().includes('thanks') || message.text.toLowerCase().includes('thank you')) {
        if (message.text.includes(`<@${rtm.activeUserId}>`)) {
            messageSend('...sure', message.channel);
        } else if (message.text.toLowerCase().includes('bot') || message.text.toLowerCase().includes('cone bot')) {
            getFirstName(message.user)
                .then(res => {
                    messageSend(`You're welcome, ${res}!`, message.channel);
                }).catch(console.error);
        }
    }
    if (message.text.toLowerCase().includes('help') && message.text.toLowerCase().includes('me') && (message.text.toLowerCase().includes('cone') || message.text.toLowerCase().includes('bot'))) {
        if (message.text.toLowerCase().includes('help') && message.text.toLowerCase().includes('me') && (message.text.toLowerCase().includes('homework') || message.text.toLowerCase().includes('hw')) && (message.text.toLowerCase().includes('cone') || message.text.toLowerCase().includes('bot'))) {
            addReaction('drakeno', message.channel, message.ts);
            var halphw = ['Can\'t help you with that.', 'Sorry, no can do.', 'I am not programmed to do that.', 'You want _me_ to help you with your homework?', 'Do it yourself.'];
            let nohalp = halphw[Math.floor(Math.random() * halphw.length)];
            messageSend(nohalp, message.channel);
        } else if (message.text.toLowerCase().includes('help') && message.text.toLowerCase().includes('me') && (message.text.toLowerCase().includes('cone') || message.text.toLowerCase().includes('bot'))) {
            var plshelp = ['Type in `!help` for a list of what I can do.', 'Depends on what you need. Type `!help` to see what I can do.'];
            let nohelp = plshelp[Math.floor(Math.random() * plshelp.length)];
            messageSend(nohelp, message.channel);
        }
    }
    if (message.text.toLowerCase().includes('cone') && (message.text.toLowerCase().includes('avoid') || message.text.toLowerCase().includes('mind') || message.text.toLowerCase().includes('watch out'))) {
        addReaction('cone', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('ducttape') || message.text.toLowerCase().includes('duct tape')) {
        addReaction('ducttape', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('yeet')) {
        addReaction('yeet', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('send it') || message.text.toLowerCase().includes('sent it')) {
        addReaction('sendit', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('euro')) {
        addReaction('flag-eu', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('salt')) {
        addReaction('salt', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('post malone')) {
        addReaction('victor', message.channel, message.ts);
    }
    if (message.user === 'U7M5A125B' && message.text.toLowerCase().includes('poland')) {
        addReaction('flag-pl', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('died') || message.text.toLowerCase().includes('dead')) {
        addReaction('f', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('doubt')) {
        addReaction('doubt', message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('that\'s more like it') || message.text.toLowerCase().includes('thats more like it')) {
        addReaction('drakeyes', message.channel, message.ts);
    }
    if (message.user === 'U3ZPKC22V' && message.text.toLowerCase().includes('user error')) {
        messageSend('https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif', message.channel);
    }
    if (message.text.toLowerCase().includes('unbelievable')) {
        messageSend('http://gfycat.com/MadUnfinishedDarklingbeetle', message.channel);
    }
    if (message.text.toLowerCase().includes('sentient')) {
        addReaction('eyes', message.channel, message.ts);
        messageSend('https://media.giphy.com/media/3ohs7KViF6rA4aan5u/giphy.gif', message.channel);
    }
    if (message.text.toLowerCase().includes('shoey')) {
        messageSend('https://tenor.com/view/daniel-ricciardo-honey-badger-dr3-shoey-f1-gif-12688182', message.channel);
    }
    if (message.text.toLowerCase().includes(' ass ') && (message.text.toLowerCase().includes('wrc') || message.text.toLowerCase().includes('rally') || message.text.toLowerCase().includes('timo'))) {
        messageSend('https://youtu.be/JleS4BdTGlo?t=17', message.channel);
    }
    if (message.text.toLowerCase().includes('!salty')) {
        messageSend('https://streamable.com/6t08o', message.channel);
    }
    if (message.text.toLowerCase().includes('they had us')) {
        messageSend('https://i.imgur.com/QpnBp7G.jpg', message.channel);
    }
    if (message.text.toLowerCase().includes('shitshow') || message.text.toLowerCase().includes('shit show')) {
        messageSend('https://streamable.com/ppgom', message.channel);
    }
    if (message.text.toLowerCase().includes('developers')) {
        messageSend('https://youtu.be/Vhh_GeBPOhs', message.channel);
    }
    if (message.text.toLowerCase().includes('fucking idiot')) {
        messageSend('https://www.youtube.com/watch?v=stb0sqtwAZA', message.channel);
    }
    if (message.text.toLowerCase().includes('monza') || message.text.toLowerCase().includes('orgasm')) {
        messageSend('https://www.youtube.com/watch?v=DJ1EZOvLJcI', message.channel);
    }
    // custom commands
    if (message.text.includes('!d4') || message.text.includes('!d6') || message.text.includes('!d8') || message.text.includes('!d10') || message.text.includes('!d12') || message.text.includes('!d20')) {
        rollDice(message.text, message.channel);
    }
    if (message.text.includes('!roll')) { // .match(/\!\dd\d/)
        advrollDice(message.text, message.channel);
    }
    if (message.text.toLowerCase().includes('heads or tails')) {
        let chance = Math.ceil(Math.random() * 2);
        if (chance == 1) {
            messageSend('Heads', message.channel);
        } else if (chance == 2) {
            messageSend('Tails', message.channel);
        }
    }
    if (message.text.includes(`<@${rtm.activeUserId}>`) || message.text.includes('<!channel>') || message.text.includes('<!here>') || message.text.includes('<!everyone>')) { // Cone Bot doesn't like being pinged
        pingReact(message.channel, message.ts);
    }
    if (message.text.includes('!adminhelp') || message.text.includes('!updateusers') || message.text.includes('!getactiveusers') || message.text.includes('!getuserlist')) {
        if (message.user !== 'U7M5A125B' && message.user !== 'U3ZPKC22V' && message.user !== 'U40D692P4' && message.user !== 'U7QUF4J22') { //  && message.user !== 'UFHQT0UMQ'
            messageSend('You are not an admin.', message.channel);
        } else if (message.text === '!updateusers') {
            updateUsers(message.channel);
        } else if (message.text === '!adminhelp') {
            messageSend(variables.adminhelp, message.channel);
        } else if (message.text === '!getactiveusers') {
            getActiveUsers(message.channel);
        } else if (message.text === '!getuserlist') {
            getUserList(message.channel);
        }
    }
    if (message.text.includes('!addrole')) {
        if (!message.text.toLowerCase().includes('aero') && !message.text.toLowerCase().includes('chassis') && !message.text.toLowerCase().includes('electronics') && !message.text.toLowerCase().includes('leaddesigners') && !message.text.toLowerCase().includes('leadership') && !message.text.toLowerCase().includes('lowvoltage') && !message.text.toLowerCase().includes('power') && !message.text.toLowerCase().includes('suspension') && !message.text.toLowerCase().includes('business')) {
            messageSend('That is not a valid command. Type `!rolehelp` to see all role commands', message.channel);
        } else {
            addRole(message.text, message.channel);
        }
    }
    if (message.text.includes('!removerole')) {
        removeRole(message.text, message.channel);
    }
    if (message.text.includes('@aero') || message.text.includes('@chassis') || message.text.includes('@electronics') || message.text.includes('@leaddesigners') || message.text.includes('@leadership') || message.text.includes('@lowvoltage') || message.text.includes('@power') || message.text.includes('@suspension') || message.text.includes('@business')) {
        callRole(message.text, message.channel);
    }
    if (message.text.includes('!viewroles')) {
        viewRoles(message.channel);
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
    var msgts;
    let memesend = memes[Math.floor(Math.random() * memes.length)];
    console.log('File to be sent:', memesend);

    rtm.sendMessage('Uploading...', memechannel)
        .then(res => {
            msgts = res.ts;
        }).catch(console.error);

    web.files.upload({
            token: process.env.TOKEN,
            file: fs.createReadStream(__dirname + '/memes/' + memesend),
            channels: memechannel
        })
        .then(res => {
            console.log('File sent:', res.file.name);
            web.chat.delete({
                token: process.env.TOKEN,
                channel: memechannel,
                ts: msgts
            }).then(console.log('upload msg deleted'));
        });
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
            fs.writeFile(__dirname + '/db/users.json', JSON.stringify(res, null, 2), (err) => {
                if (err) throw err;
                console.log('Data written');
            });
            var users = res.map(usersdata => ({
                id: usersdata.id,
                username: usersdata.name,
                firstName: usersdata.profile.first_name,
                lastName: usersdata.profile.last_name,
                deleted: usersdata.deleted
            }));
            console.log(users);
            fs.writeFile(__dirname + '/db/users_simplified.json', JSON.stringify(users, null, 2), (err) => {
                if (err) throw err;
                console.log('Simplified data written');
            });

            //* attempt to splice users that are deleted
            var activeusers, i, usr;
            activeusers = users;
            for (i = 0; i < activeusers.length; i++) {
                usr = users[i];
                if (usr.deleted === true) {
                    activeusers.splice(i, 1);
                }
            }
            console.log(activeusers);
            //* end of splice code
            fs.writeFile(__dirname + '/db/users_active.json', JSON.stringify(activeusers, null, 2), (err) => {
                if (err) throw err;
                console.log('Active user list updated');
            });
        })
        .catch(console.error);
    messageSend('User list updated. Type in `!adminhelp` to see other commands.', updatechannel);
}

function getUserList(updatechannel) { //* function to send the json of user list to called channel
    if (fs.existsSync(__dirname + '/db/users_simplified.json')) {
        web.files.upload({
                token: process.env.TOKEN,
                file: fs.createReadStream(__dirname + '/db/users_simplified.json'),
                channels: updatechannel
            })
            .then((res) => {
                console.log('File sent:', res.file.name);
            }).catch(console.error);
    } else {
        messageSend('Please update the users list first.', updatechannel);
    }
}

function getActiveUsers(userschannel) {
    if (fs.existsSync(__dirname + '/db/users_active.json')) {
        web.files.upload({
                token: process.env.TOKEN,
                file: fs.createReadStream(__dirname + '/db/users_active.json'),
                channels: userschannel
            })
            .then((res) => {
                console.log('File sent:', res.file.name);
            });
    } else {
        messageSend('Please update the users list first.', userschannel);
    }
}

function getFirstName(userid) { //* function to convert the user.id parameter into the user's full name
    const param = {
        token: process.env.TOKEN,
        user: userid
    };
    return web.users.info(param).then(results => {
        return results.user.profile.first_name;
    }).catch(console.error);
}

function getLastName(userid) {
    const param = {
        token: process.env.TOKEN,
        user: userid
    };
    return web.users.info(param).then(results => {
        return results.user.profile.last_name;
    });
}

function goodmorning(msgauthor, gmchannel) { //* function to greet someone in the morning
    getFirstName(msgauthor)
        .then(res => {
            console.log(res);
            messageSend(`Good morning, ${res}!`, gmchannel);
        }).catch(console.error);
}

function goodafternoon(msgauth, gachann) {
    getFirstName(msgauth)
        .then(res => {
            messageSend(`Good afternoon, ${res}!`, gachann);
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

function badbot(msgchannel) {
    let diss = ['no u :angry:', ':triumph:', 'fite me irl', ':cry:'];
    let saydiss = diss[Math.floor(Math.random() * diss.length)];
    messageSend(saydiss, msgchannel);
}

function pingReact(reactch, reactts) {
    var emojis = ['pingshake', 'pingsock', 'pingthink', 'pingwhat'];
    let sendmoji = emojis[Math.floor(Math.random() * emojis.length)];
    addReaction(sendmoji, reactch, reactts);
}

function rollDice(dx, rollchannel) {
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

function advrollDice(dx, rollchannel) {
    var str = dx.split(' ');
    var i, val, dice;
    for (i = 0; i < str.length; i++) {
        val = str[i];
        if (val.substring(0).match(/\dd\d/)) {
            dice = val;
            break;
        }
    }
    if (dice === undefined) {
        messageSend('Please follow the actual syntax.', rollchannel);
        return;
    }

    if (!dice.includes('4') && !dice.includes('6') && !dice.includes('8') && !dice.includes('10') && !dice.includes('12') && !dice.includes('20')) {
        messageSend('That is not a standard die.', rollchannel);
    } else if (dice[3]) {
        let min = Math.ceil(parseInt(dice[0]));
        let max = Math.floor(parseInt((dice[2] + dice[3]) * min));
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        console.log('Rolled:', num);
        messageSend(num.toString(), rollchannel);
    } else {
        let min = Math.ceil(parseInt(dice[0]));
        let max = Math.floor(parseInt(dice[2] * min));
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        console.log('Rolled:', num);
        messageSend(num.toString(), rollchannel);
    }
}

function addRole(roletext, rolechannel) {
    var args = roletext.split(' ');
    var useradd = args[1];
    if (args.length != 3 || useradd[0] != '<') {
        messageSend('Please follow the syntax. `!addrole @user role`', rolechannel);
        return;
    }
    var userid = useradd.substring(2, 11);
    var role = args[2];

    var params = {
        token: process.env.TOKEN,
        user: userid
    };

    web.users.info(params).then(res => {
        var ok = res.ok;
        console.log(ok);

        if (ok == true) {
            fs.readFile(__dirname + `/roles/${role}.json`, (err, data) => {
                var json = JSON.parse(data);
                console.log(json);

                if (json.indexOf(useradd) > -1) {
                    getFirstName(userid)
                        .then(res => {
                            messageSend(`${res} is already part of ${role}.`, rolechannel);
                        }).catch(console.error);
                    console.log('user already exists');
                } else {
                    json.push(useradd);
                    fs.writeFile(__dirname + `/roles/${role}.json`, JSON.stringify(json), (err) => {
                        if (err) throw err;
                        console.log(`${useradd} added to ${role}`);
                    });
                    getFirstName(userid)
                        .then(res => {
                            messageSend(`${res} has been added to ${role}.`, rolechannel);
                        }).catch(console.error);
                }
            });
        }
    }).catch(err => {
        console.log(err);
        messageSend('Who dis?', rolechannel);
    });
}

function removeRole(roleuser, rolechannel) {
    var args = roleuser.split(' ');
    var userremove = args[1];
    console.log(userremove);
    if (args.length != 3 || userremove[0] != '<') {
        messageSend('Please follow the syntax. `!removerole @user role`', rolechannel);
        return;
    }
    var userid = userremove.substring(2, 11);
    var role = args[2];

    var params = {
        token: process.env.TOKEN,
        user: userid
    };

    web.users.info(params).then(res => {
        var ok = res.ok;

        if (ok == true) {
            fs.readFile(__dirname + `/roles/${role}.json`, (err, data) => {
                var json = JSON.parse(data);
                console.log(json);

                var index = json.indexOf(userremove);
                if (index > -1) {
                    json.splice(index, 1);
                    console.log(json);
                    fs.writeFile(__dirname + `/roles/${role}.json`, JSON.stringify(json), (err) => {
                        if (err) throw err;
                        console.log(`${userremove} removed from ${role}`);
                    });
                    getFirstName(userid)
                        .then(res => {
                            messageSend(`${res} has been removed from ${role}.`, rolechannel);
                        }).catch(console.error);
                } else {
                    getFirstName(userid)
                        .then(res => {
                            messageSend(`${res} is not part of ${role}.`, rolechannel);
                        }).catch(console.error);
                }
            });
        }
    }).catch(err => {
        console.log(err);
        messageSend('Who dis?', rolechannel);
    });
}

function callRole(calltext, callchannel) {
    var args = calltext.split(' ');
    var key, value, result;
    for (key in args) {
        if (args.hasOwnProperty(key) && !isNaN(parseInt(key, 10))) {
            value = args[key];
            if (value[0] === '@') {
                result = value;
                break;
            }
        }
    }
    let role = result.substring(1);
    console.log(`Role to be called: ${role}`);

    let call = fs.readFile(__dirname + `/roles/${role}.json`, (err, data) => {
        var json = JSON.parse(data);
        call = json.toString();
        if (call === undefined || call.length == 0) {
            messageSend('Role is empty.', callchannel);
            return;
        }
        messageSend(call, callchannel);
    });
}


//TODO viewRoles function to see who are in certain roles
// function viewRoles(viewchannel) {
//     // var aero, business, chassis, electronics, leaddesigners, leadership, lowvoltage, power, suspension = [];
//     // var aerob, businessb, chassisb, electronicsb, leaddesignersb, leadershipb, lowvoltageb, powerb, suspensionb = [];

//     // read aero
//     // fs.readFile(__dirname + '/roles/aero.json', (err, data) => {
//     //     var json = JSON.parse(data);
//     //     var content = json.toString();
//     //     if (content == undefined || content.length == 0) {
//     //         aero = 'Empty';
//     //     } else {
//     //         aero = content;
//     //     }
//     // });
//     // var aerob = [];
//     // var aero = [];
//     // fs.readFile(__dirname + '/roles/aero.json', (err, data) => {
//     //     let json = JSON.parse(data);
//     //     // console.log(json);

//     //     for (let i = 0; i < json.length; i++) {
//     //         let buffer = json[i].substring(2, 11);
//     //         // console.log(buffer);
//     //         aerob.push(buffer.toString());
//     //     }
//     //     console.log(aerob);
//     // });

//     // https://stackoverflow.com/questions/13343340/calling-an-asynchronous-function-within-a-for-loop-in-javascript 
//     // for (let i = 0; i < leadershipb.length; i++) {
//     //     getFirstName(leadershipb[i])
//     //         .then(res => {
//     //             console.log(res);
//     //             leadership.push(res.toString());
//     //             console.log(leadership);
//     //         });

//     // console.log(leadership);

//     var aero = [];                       THIS  PART IS GETTING THERE
//     var aerob = [];
//     // var count2 = 0;
//     fs.readFile(__dirname + '/roles/aero.json', (err, data) => {
//         let json = JSON.parse(data);
//         console.log(json);
//         let count1 = 0;
//         let count2 = 0;

//         for (let i = 0; i < json.length; i++) {
//             let buffer = json[i].substring(2, 11);
//             aerob.push(buffer.toString());
//             count1++;
//             if (count1 > json.length - 1) {
//                 console.log(aerob);
//             }
//         }

//         if (aerob.length == json.length) {
//             // aerob.forEach(function(listItem, index))
//             for (let i = 0; i < aerob.length; i++) {
//                 let buffer = aerob[i];
//                 // let count2 = 0;
//                 // var res = [];
//                 getFirstName(buffer.toString())
//                     .then(res => {

//                     }).catch(console.error);
//                 console.log(aero);
//                 // if (count2 > aerob.length - 1) {
//                 //     console.log(aero);
//                 // }
//             }
//         }
//         // for (var j = 0; j < aerob.length; j++) {
//         //     let buffer = aerob[j];
//         //     // let count2 = 0;
//         //     getFirstName(buffer)
//         //         .then(fname => {
//         //             aero.push(fname.toString());
//         //             count2++;
//         //         }).catch(console.error);
//         //     if (count2 > aerob.length - 1) {
//         //         console.log(aero);
//         //     }
//         // }
//     });



// }