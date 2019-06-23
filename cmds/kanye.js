const axios = require('axios');

module.exports = async function () {
    return new Promise(async (resolve, reject) => {
        try {
            const quote = await axios.get('https://api.kanye.rest/');
            console.log(quote.data.quote);
            const msg = [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `"${quote.data.quote}"\n_- Kanye West_`
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://i.imgur.com/IHr3gbj.jpg",
                        "alt_text": "kanye west"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [{
                        "type": "mrkdwn",
                        "text": "<https://kanye.rest/|Kanye Quotes>"
                    }]
                }
            ];
            return resolve(msg);
        } catch (error) {
            return reject(error);
        }
    });
}