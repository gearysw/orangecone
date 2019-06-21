const axios = require('axios');

async function fuckoff(user) {
    return new Promise((resolve, reject) => {
        const fuckoffs = ['asshole', 'bag', 'bucket', 'bye', 'cool', 'cup', 'family', 'fascinating', 'flying', 'fyyff', 'give', 'horse', 'immensity', 'looking', 'no', 'ratsares', 'shit', 'single', 'thanks', 'that', 'this', 'too', 'what', 'zero'];
        let endpoint = fuckoffs[Math.floor(Math.random() * fuckoffs.length)];
        axios({
            method: 'get',
            url: `https://www.foaas.com/${endpoint}/${user}`,
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
            const msg = [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": res.data.message
                    }
                },
                {
                    "type": "context",
                    "elements": [{
                        "type": "mrkdwn",
                        "text": res.data.subtitle
                    }]
                }
            ];
            return resolve(msg);
        }).catch(console.error);
    });
}

async function fuckall(user) {
    return new Promise((resolve, reject) => {
        const fuckalls = ['everyone', 'everything'];
        let endpoint = fuckalls[Math.floor(Math.random() * fuckalls.length)];
        axios({
            method: 'get',
            url: `https://foaas.com/${endpoint}/${user}`,
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            console.log(res.data);
            const msg = [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": res.data.message
                    }
                },
                {
                    "type": "context",
                    "elements": [{
                        "type": "mrkdwn",
                        "text": res.data.subtitle
                    }]
                }
            ];
            return resolve(msg);
        }).catch(console.error);
    })
}

module.exports = {
    fuckoff,
    fuckall
}