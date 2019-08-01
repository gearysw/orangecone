const axios = require('axios');
const fs = require('fs');

async function randomquote() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                method: 'get',
                url: 'https://api.tronalddump.io/random/quote',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const msg = [{
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": res.data.value,
                        "emoji": true
                    }
                },
                {
                    "type": "context",
                    "elements": [{
                        "type": "mrkdwn",
                        "text": `-${res.data._embedded.author[0].name}`
                    }]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [{
                        "type": "mrkdwn",
                        "text": `Source: ${res.data._embedded.source[0].url}`
                    }]
                },
                {
                    "type": "context",
                    "elements": [{
                        "type": "mrkdwn",
                        "text": `Powered by <https://www.tronalddump.io/|Tronald Dump>`
                    }]
                }
            ];

            return resolve(msg);
        } catch (error) {
            return reject(error);
        }
    });
}

async function topicquote(input) { //! don't forget to add input args
    return new Promise(async (resolve, reject) => {
        try {
            var parseinput = input.substring(13);
            var args;
            if (parseinput.includes(' ')) {
                args = parseinput.replace(/\s/g, '+');
            } else {
                args = parseinput;
            }

            const res = await axios({
                method: 'get',
                url: `https://api.tronalddump.io/search/quote?query=${args}`,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (res.data.count > 0) {
                let rand = Math.floor(Math.random() * res.data.count);
                let quote = res.data._embedded.quotes[rand].value;
                let author = res.data._embedded.quotes[rand]._embedded.author[0].name;
                let source = res.data._embedded.quotes[rand]._embedded.source[0].url;

                var msg = [{
                        "type": "section",
                        "text": {
                            "type": "plain_text",
                            "text": quote,
                            "emoji": true
                        }
                    },
                    {
                        "type": "context",
                        "elements": [{
                            "type": "mrkdwn",
                            "text": `-${author}`
                        }]
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "context",
                        "elements": [{
                            "type": "mrkdwn",
                            "text": `Source: ${source}`
                        }]
                    },
                    {
                        "type": "context",
                        "elements": [{
                            "type": "mrkdwn",
                            "text": `Powered by <https://www.tronalddump.io/|Tronald Dump>`
                        }]
                    }
                ];

                return resolve(msg);
            } else {
                return reject('No quotes found matching topic.');
            }
        } catch (error) {
            console.log(error);
        }
    });
}

// async function randomememe() {
//     return new Promise(async (resolve, reject) => {
//         try {
//             // const meme = await axios({
//             //     responseType: 'arraybuffer',
//             //     method: 'get',
//             //     url: 'https://api.tronalddump.io/random/meme',
//             //     headers: {
//             //         'Accept': 'image/jpeg'
//             //     }
//             // });
//             // meme.data.pipe(fs.createWriteStream('./tmp/tronaldmeme.jpg'));
//             // console.log(img);


//             axios({
//                 method: 'get',
//                 url: 'https://api.tronalddump.io/random/meme',
//                 responseType: 'stream',
//                 headers: {
//                     'Accept': 'image/jpeg'
//                 }
//             }).then(response => {
//                 response.data.pipe(fs.createWriteStream('./tmp/tronaldmeme.jpg'));
//             }).then(function () {
//                 return resolve('./tmp/tronaldmeme.jpg');
//             });
//             // return resolve(meme.data);
//             // console.log(meme);
//         } catch (error) {
//             console.log(error);
//             // return reject(error);
//         }
//     });
// }

module.exports = {
    randomquote,
    topicquote
    // randomememe
}