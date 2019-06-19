const axios = require('axios');

module.exports = async function () {
    return new Promise((resolve, reject) => {
        axios.get('https://boredapi.com/api/activity/').then(res => {
            console.log(res.data)
            var price, difficulty;
            if (res.data.price <= 0.2) {
                price = ':heavy_dollar_sign:';
            } else if (res.data.price <= 0.4) {
                price = ':heavy_dollar_sign::heavy_dollar_sign:';
            } else if (res.data.price <= 0.6) {
                price = ':heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:';
            } else if (res.data.price <= 0.8) {
                price = ':heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:';
            } else if (res.data.price <= 1.0) {
                price = ':heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign:';
            }
        
            if (res.data.accessibility <= 0.2) {
                difficulty = ':star:';
            } else if (res.data.accessibility <= 0.4) {
                difficulty = ':star::star:';
            } else if (res.data.accessibility <= 0.6) {
                difficulty = ':star::star::star:';
            } else if (res.data.accessibility <= 0.8) {
                difficulty = ':star::star::star::star:';
            } else if (res.data.accessibility <= 1.0) {
                difficulty = ':star::star::star::star::star:';
            }

            const msg = [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*${res.data.activity}*\nType: ${res.data.type}\nDifficulty: ${difficulty}\nPrice: ${price}`
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
                            "text": "<https://boredapi.com/|Bored API>"
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