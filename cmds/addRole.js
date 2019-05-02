const {
    RTMClient,
    WebClient
} = require('@slack/client');

const rtm = new RTMClient(process.env.TOKEN);
const web = new WebClient(process.env.TOKEN);
const fs = require('fs');
rtm.start();

module.exports = function(text, channel) {
    var args = text.split(' ');
    var useradd = args[1];
    if (args.length != 3 || useradd[0] != '<') {
        rtm.sendMessage('Please follow the syntax. `!addrole @user role`', channel);
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
            fs.readFile(`./roles/${role}.json`, (err, data) => {
                if (err) console.error(err);
                var json = JSON.parse(data);
                console.log(json);

                if (json.indexOf(useradd) > -1) {
                    web.users.info(params).then(result => {
                        var firstname = result.user.profile.first_name;
                        rtm.sendMessage(`${firstname} is already part of ${role}.`);
                    }).catch(console.error);
                    console.log('user already part of role');
                } else {
                    json.push(useradd);
                    fs.writeFile(`./roles/${role}.json`, JSON.stringify(json), err => {
                        if (err) console.error(err);
                        console.log(`${useradd} added to ${role}`);
                    });
                    web.users.info(params).then(res => {
                        var firstname = res.user.profile.first_name;
                        rtm.sendMessage(`${firstname} has been added to ${role}.`, channel);
                    }).catch(console.error);
                }
            });
        }

    }).catch(err => {
        console.log(err);
        rtm.sendMessage('Who dis?', channel);
    });
};