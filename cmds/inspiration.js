const axios = require('axios');

module.exports = async function () {
    return new Promise((resolve, reject) => {
        axios.get('http://inspirobot.me/api?generate=true').then(res => {
            console.log(res.data);
            const msg = [
                {
                    "type": "image",
                    "title": {
                        "type": "plain_text",
                        "text": "Inspiration",
                        "emoji": true
                    },
                    "image_url": res.data,
                    "alt_text": "Inspiration"
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "<http://inspirobot.me/|Generated from InspiroBot>"
                        }
                    ]
                }
            ];
            return resolve(msg);
        }).catch(err => {
            return reject(err);
        });
    });
}