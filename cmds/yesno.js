const axios = require('axios');

module.exports = async function () {
    return new Promise((resolve, reject) => {
        axios.get('https://yesno.wtf/api').then(res => {
            console.log(res.data);
            const msg = [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `${res.data.answer.capitalize()}`
                    }
                },
                {
                    "type": "image",
                    "image_url": `${res.data.image}`,
                    "alt_text": "yesno"
                }
            ];
            console.log(msg);
            return resolve(msg);
        }).catch(err => {
            return reject(err);
        });
    });
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}