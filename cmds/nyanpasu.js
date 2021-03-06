const axios = require('axios');
const Url = 'http://nyanpass.com/add.php';
const Header = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
const Form = 'nyan=pass';

module.exports = async function () {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'post',
                url: Url,
                headers: Header,
                data: Form
            });
            console.log(res.data);
            const msg = [{
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Current Nyanpasu Count*\n${res.data.cnt}`
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://i.imgur.com/E83gsQh.jpg",
                        "alt_text": "nyanpasu"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [{
                        "type": "mrkdwn",
                        "text": "<http://nyanpass.com/|Nyanpasu>"
                    }]
                }
            ];
            return resolve(msg);
        } catch (error) {
            return reject(error);
        }
    })
}