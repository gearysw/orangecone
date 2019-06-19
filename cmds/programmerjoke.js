const axios = require('axios');

module.exports = async function () {
    return new Promise((resolve, reject) => {
        axios.get('https://official-joke-api.appspot.com/jokes/programming/random').then(res => {
            const joke = res.data[0];
            console.log(joke);
            const msg = [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${joke.setup}`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${joke.punchline}`
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "<https://github.com/15Dkatz/official_joke_api|Programmer Jokes>"
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