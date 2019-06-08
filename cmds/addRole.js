const {
    WebClient
} = require('@slack/web-api');
const web = new WebClient(process.env.TOKEN);
const fs = require('fs');

module.exports = async function (text) {
    return new Promise((resolve, reject) => {
        var args = text.split(' ');
        var useradd = args[1];
        if (args.length != 3 || useradd[0] != '<') {
            return reject('Please follow the syntax. `!addrole @user role`');
        }
        var userid = useradd.substring(2, 11);
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

                    if (json.indexOf(useradd) > -1) {
                        web.users.info(params).then(result => {
                            var firstname = result.user.profile.first_name;
                            return resolve(`${firstname} is already part of ${role}.`);
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
                            return resolve(`${firstname} has been added to ${role}.`);
                        }).catch(console.error);
                    }
                });
            }
        }).catch(err => {
            console.log(err);
            return reject('Who dis?');
        });
    });
};