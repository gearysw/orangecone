const {
    WebClient
} = require('@slack/web-api');
const {
    RTMClient
} = require('@slack/rtm-api');
require('dotenv').config();
var help = require('./help.json');
const fs = require('fs');

//? importing custom function files
const cmds = require('./cmds/cmds');

//* initiate rtm client
const rtm = new RTMClient(process.env.TOKEN);
(async () => {
    const {
        self,
        team
    } = await rtm.start();
    console.log('RTM connected');
    console.log(self, team);
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
    if (message.user === 'USLACKBOT' && (!message.is_ephemeral || message.is_ephemeral === false)) { // f u slackbot
        const name = await getFirstName('USLACKBOT')
        var shutup = [`Shut up, ${name}.`, `${name}, you have no power here!`];
        var attack = shutup[Math.floor(Math.random() * shutup.length)];
        messageSend(attack, message.channel);
    }
    // basic commands
    if (message.text.toLowerCase().includes('hello')) {
        if (message.text.toLowerCase().includes(`<@${rtm.activeUserId}>`)) {
            messageSend('...hey', message.channel)
        } else {
            messageSend('Hello! :blobwave:', message.channel);
        }
    }
    if (message.text.toLowerCase().includes('what') && message.text.toLowerCase().includes('do') && (message.text.toLowerCase().includes('cone') || message.text.toLowerCase().includes('bot'))) {
        messageSend('Type in `!help` to see what I can help you with.', message.channel);
    }
    if (message.text.includes('!help')) { // responds to !help command
        messageSend(help.sendHelp, message.channel);
    }
    if (message.text.toLowerCase().includes('!drive') || message.text === '!googledrive') { // response for google drive link
        messageSend(help.drive, message.channel);
    }
    if (message.text.toLowerCase().includes('!stash')) { // response for vms stash
        messageSend(help.stash, message.channel);
    }
    if (message.text.toLowerCase().includes('!rule')) { // response for rulebook
        messageSend(help.rules, message.channel);
    }
    if (message.text === '!directory' || message.text === '!slackchannel' || message.text.toLowerCase().includes('!channels')) { // response for channel directory
        messageSend(help.channels, message.channel);
    }
    if (message.text.toLowerCase().includes('!minutes') || message.text === '!meetingminutes') { // response for meeting minutes
        messageSend(help.minutes, message.channel);
    }
    if (message.text.toLowerCase().includes('!buy') || message.text.toLowerCase().includes('!order')) { // response for ordering form
        messageSend(help.orderform, message.channel);
    }
    if (message.text === '!newb' || message.text === '!newmember' || message.text === '!welcome') { // response for new member form
        messageSend(help.newb, message.channel);
    }
    if (message.text.toLowerCase().includes('!reference') || message.text.toLowerCase().includes('!lightreading') || message.text.toLowerCase().includes('!read') || message.text.toLowerCase().includes('!documents')) { // response for reference documents
        messageSend(help.reference, message.channel);
    }
    if (message.text.toLowerCase().includes('!gantt') || message.text.toLowerCase().includes('!timeline') || message.text.toLowerCase().includes('!projects')) { // response for gantt chart
        messageSend(help.timeline, message.channel);
    }
    if (message.text.toLowerCase().includes('!currentcar') || message.text.toLowerCase().includes('!car')) { // resposne for car folder on google drive
        messageSend(help.currentcar, message.channel);
    }
    if (message.text.toLowerCase().includes('!affiliate') || message.text.toLowerCase().includes('!affiliation') || message.text.toLowerCase().includes('!register')) {
        messageSend(help.affiliate, message.channel);
    }
    if (message.text.toLowerCase().includes('!tutorial')) {
        messageSend(help.tutorial, message.channel);
    }
    if (message.text.toLowerCase().includes('!rolehelp')) {
        messageSend(help.rolehelp, message.channel);
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
    // custom commands
    if (message.text.includes(`<@${rtm.activeUserId}>`) || message.text.includes('<!channel>') || message.text.includes('<!here>') || message.text.includes('<!everyone>')) {
        pingReact(message.channel, message.ts);
    }
    if (message.text.toLowerCase().includes('!meme')) {
        randomMeme(message.channel);
    }
    if (message.text.includes('!roll')) {
        try {
            let diceroll = await cmds.rollDice(message.text);
            messageSend(diceroll, message.channel);
        } catch (error) {
            console.log(error);
            messageSend(error, message.channel);
        }
    }
    if (message.text.toLowerCase().includes('heads or tails')) {
        let chance = Math.ceil(Math.random() * 2);
        if (chance == 1) {
            messageSend('Heads', message.channel);
        } else if (chance == 2) {
            messageSend('Tails', message.channel);
        }
    }
    if (message.text.includes('!addrole')) {
        if (!message.text.toLowerCase().includes('aero') && !message.text.toLowerCase().includes('chassis') && !message.text.toLowerCase().includes('electronics') && !message.text.toLowerCase().includes('leaddesigners') && !message.text.toLowerCase().includes('leadership') && !message.text.toLowerCase().includes('lowvoltage') && !message.text.toLowerCase().includes('power') && !message.text.toLowerCase().includes('suspension') && !message.text.toLowerCase().includes('business')) {
            messageSend('That is not a valid command. Type `!rolehelp` to see all role commands', message.channel);
        } else {
            try {
                let sendrole = await cmds.addRole(message.text);
                messageSend(sendrole, message.channel);
            } catch (err) {
                console.log(err);
                messageSend(err, message.channel);
            }
        }
    }
    if (message.text.includes('!removerole')) {
        try {
            let sendrole = await cmds.removeRole(message.text);
            messageSend(sendrole, message.channel);
        } catch (error) {
            console.log(error);
            messageSend(error, message.channel);
        }
    }
    if (message.text.includes('@aero') || message.text.includes('@chassis') || message.text.includes('@electronics') || message.text.includes('@leaddesigners') || message.text.includes('@leadership') || message.text.includes('@lowvoltage') || message.text.includes('@power') || message.text.includes('@suspension') || message.text.includes('@business')) {
        try {
            var sendrole = await cmds.callRole(message.text);
            messageSend(sendrole, message.channel);
        } catch (error) {
            console.log(error);
            messageSend(error, message.channel);
        }
    }
    if (message.text.includes('!viewroles')) {
        cmds.viewRoles(message.channel);
    }
    if (message.text.includes('!eastereggs') || message.text.includes('!easteregg')) {
        messageSend(easterEggs, message.channel);
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
        try {
            const msg = await cmds.greetings.goodnight(message.user);
            messageSend(msg, message.channel);
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.toLowerCase().includes('good morning')) { // wish someone a good morning
        try {
            const msg = await cmds.greetings.goodmorning(message.user);
            messageSend(msg, message.channel);
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.toLowerCase().includes('good afternoon')) {
        try {
            const msg = await cmds.greetings.goodafternoon(message.user);
            messageSend(msg, message.channel);
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.toLowerCase().includes('good bot')) {
        addReaction('hugging_face', message.channel, message.ts);
        const name = await getFirstName(message.user);
        messageSend(`Thank you, ${name}!`, message.channel);
    }
    if (message.text.toLowerCase().includes('bad bot')) {
        addReaction('middle_finger', message.channel, message.ts);
        let diss = ['no u :angry:', ':triumph:', 'fite me irl', ':cry:'];
        let saydiss = diss[Math.floor(Math.random() * diss.length)];
        messageSend(saydiss, message.channel);
    }
    if (message.text.toLowerCase().includes('thanks') || message.text.toLowerCase().includes('thank you')) {
        if (message.text.includes(`<@${rtm.activeUserId}>`)) {
            messageSend('...sure', message.channel);
        } else if (message.text.toLowerCase().includes('bot') || message.text.toLowerCase().includes('cone bot')) {
            const name = await getFirstName(message.user);
            messageSend(`You're welcome, ${name}!`, message.channel);
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
    if (message.text.toLowerCase().match(/ye{2,}t/)) {
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
    if (message.text.toLowerCase().includes('they had us') || message.text.toLowerCase().includes('first half')) {
        var reactions = ['https://i.imgur.com/QpnBp7G.jpg', 'https://youtu.be/u35MwQ_zrBI?t=24'];
        var firsthalf = reactions[Math.floor(Math.random() * reactions.length)];
        messageSend(firsthalf, message.channel);
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
    if (message.text.toLowerCase().includes('how cute')) {
        messageSend('https://i.imgur.com/Dvi8rwG.jpg', message.channel);
    }
    if (message.text.toLowerCase().includes('oh deer') || message.text.toLowerCase().includes('oh dear')) {
        messageSend('https://www.youtube.com/watch?v=VaU6pqhwur4', message.channel);
    }
    if (message.text.toLowerCase().includes('can\'t believe you\'ve done this') || message.text.toLowerCase().includes('cant believe youve done this') || message.text.toLowerCase().includes('can\'t believe it') || message.text.toLowerCase().includes('cant believe it')) {
        messageSend('https://youtu.be/O7lRV1VHv1g?t=3', message.channel);
    }
    if (message.text.includes('!vaporwave')) {
        var text = cmds.vaporwave(message.text);
        messageSend(text, message.channel);
    }
    if (message.text.includes('!stand')) {
        var stand = cmds.enemyStand(message.text);
        messageSend(stand, message.channel);
    }
    if (message.text.toLowerCase() == '!nyanpasu') {
        try {
            let Nyanpasu = await cmds.nyanpasu();
            web.chat.postMessage({
                token: process.env.TOKEN,
                channel: message.channel,
                blocks: Nyanpasu
            });
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text === '!bored') {
        try {
            const activity = await cmds.bored();
            web.chat.postMessage({
                token: process.env.TOKEN,
                channel: message.channel,
                blocks: activity
            }).catch(console.error);
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text === '!joke') {
        try {
            const joke = await cmds.programmerjoke();
            web.chat.postMessage({
                token: process.env.TOKEN,
                channel: message.channel,
                blocks: joke
            });
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.includes('!yesno')) {
        try {
            const ans = await cmds.yesno();
            web.chat.postMessage({
                token: process.env.TOKEN,
                channel: message.channel,
                blocks: ans
            });
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.includes('!inspiration')) {
        try {
            const inspire = await cmds.inspiration();
            web.chat.postMessage({
                token: process.env.TOKEN,
                channel: message.channel,
                blocks: inspire
            });
            // messageSend(inspire, message.channel);
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.includes('!fuckoff')) {
        try {
            const user = await getFullName(message.user);
            const fuck = await cmds.fuckoff.fuckoff(user);
            web.chat.postMessage({
                token: process.env.TOKEN,
                channel: message.channel,
                blocks: fuck
            });
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.includes('!fuckall')) {
        try {
            const user = await getFullName(message.user);
            const fuck = await cmds.fuckoff.fuckall(user);
            web.chat.postMessage({
                token: process.env.TOKEN,
                channel: message.channel,
                blocks: fuck
            });
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.includes('!kanye')) {
        try {
            const quote = await cmds.kanye();
            web.chat.postMessage({
                token: process.env.TOKEN,
                channel: message.channel,
                blocks: quote
            });
        } catch (error) {
            console.log(error);
        }
    }
    if (message.text.includes('!tronald')) {
        var req = message.text.split(' ');
        if (req[1] == 'random') {
            try {
                const quote = await cmds.tronalddump.randomquote();
                web.chat.postMessage({
                    token: process.env.TOKEN,
                    channel: message.channel,
                    blocks: quote
                });
            } catch (error) {
                console.log(error);
            }
            // } else if (req[1] == 'meme') {
            //     try {
            //         const meme = await cmds.tronalddump.randomememe();
            //         web.files.upload({
            //             token: process.env.TOKEN,
            //             file: fs.createReadStream(meme),
            //             channels: message.channel
            //         });
            //     } catch (error) {
            //         console.log(error);
            //     }
        } else {
            try {
                const quote = await cmds.tronalddump.topicquote(message.text);
                web.chat.postMessage({
                    token: process.env.TOKEN,
                    channel: message.channel,
                    blocks: quote
                });
            } catch (error) {
                console.log(error);
                messageSend(error, message.channel);
            }
        }
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

async function getFirstName(userid) {
    try {
        const res = await web.users.info({
            token: process.env.TOKEN,
            user: userid
        });
        return res.user.profile.first_name;
    } catch (error) {
        console.log(error);
    }
}

async function getFullName(userid) {
    try {
        const res = await web.users.info({
            token: process.env.TOKEN,
            user: userid
        });
        return res.user.profile.real_name;
    } catch (error) {
        console.log(error);
    }
}

async function pingReact(channel, timestamp) {
    var emojis = ['pingshake', 'pingsock', 'pingthink', 'pingwhat'];
    let sendmoji = emojis[Math.floor(Math.random() * emojis.length)];
    addReaction(sendmoji, channel, timestamp);
}

async function randomMeme(memechannel) {
    fs.readdir('./memes', (err, files) => {
        var msgts;
        let memesend = files[Math.floor(Math.random() * files.length)];
        console.log('File to be sent:', memesend);

        rtm.sendMessage('Uploading...', memechannel)
            .then(res => {
                msgts = res.ts;
            }).catch(console.error);

        web.files.upload({
                token: process.env.TOKEN,
                file: fs.createReadStream('./memes/' + memesend),
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
    });
}

const easterEggs = '\`!bored\`\n\`!joke\`\n\`!nyanpasu\`\n\`!yesno\`\n\`!inspiration\`\n\`!fuckoff\`\n\`!fuckall\`\n\`!kanye\`\n`!tronald <random|topic>`';