const {
    WebClient
} = require('@slack/web-api');
const web = new WebClient(process.env.TOKEN);
const fs = require('fs');

module.exports = async function (text) {
    return new Promise((resolve, reject) => {
        var args = text.split(' ');
        var userremove = args[1];
        console.log('To be removed: ' + userremove);
        if (args.length != 3 || userremove[0] != '<') {
            return reject('Please follow the syntax. `!removerole @user role`');
        }
        var userid = userremove.substring(2, 11);
        var role = args[2];

        var params = {
            token: process.env.TOKEN,
            user: userid
        };

        web.users.info(params).then(res => {
            if (res.ok == true) {
                fs.readFile(`./roles/${role}.json`, (err, data) => {
                    if (err) console.log(err);
                    var json = JSON.parse(data);
                    console.log(json);

                    var index = json.indexOf(userremove);
                    if (index > -1) {
                        json.splice(index, 1);
                        console.log(json);
                        fs.writeFile(`./roles/${role}.json`, JSON.stringify(json), (err) => {
                            if (err) throw err;
                            console.log(`${userremove} removed from ${role}`);
                        });
                        web.users.info(params)
                            .then(res => {
                                return resolve(`${res.user.profile.first_name} has been removed from ${role}.`);
                            }).catch(console.error);
                    } else {
                        web.users.info(params)
                            .then(res => {
                                return resolve(`${res.user.profile.first_name} is not part of ${role}.`);
                            }).catch(console.error);
                    }
                });
            }
        }).catch(err => {
            console.log(err);
            return reject('Who dis?');
        });
    });
}