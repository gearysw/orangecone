const {
    WebClient
} = require('@slack/web-api');
const web = new WebClient(process.env.TOKEN);

async function goodmorning(user) {
    return new Promise((resolve, reject) => {
        web.users.info({
            token: process.env.TOKEN,
            user: user
        }).then(res => {
            return resolve(`Good morning, ${res.user.profile.first_name}!`);
        }).catch(console.error);
    });
}

async function goodafternoon(user) {
    return new Promise((resolve, reject) => {
        web.users.info({
            token: process.env.TOKEN,
            user: user
        }).then(res => {
            return resolve(`Good afternoon, ${res.user.profile.first_name}!`);
        }).catch(console.error);
    });
}

async function goodnight(user) {
    return new Promise((resolve, reject) => {
        web.users.info({
            token: process.env.TOKEN,
            user: user
        }).then(res => {
            let name = res.user.profile.first_name;
            let gn = [`Good night, ${name}!`, `Sweet dreams, ${res}!`, `Have a good night, ${name}.`];
            let saygn = gn[Math.floor(Math.random() * gn.length)];
            return resolve(saygn);
        }).catch(console.error);
    });
}

module.exports = {
    goodmorning,
    goodafternoon,
    goodnight
}