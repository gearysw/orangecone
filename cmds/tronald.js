const axios = require('axios');

async function tronaldQuote() { //! getting some promise errors
    return new Promise((resolve, reject) => {
        axios.get({
            method: 'get',
            url: 'https://api.tronalddump.io/random/quote',
            headers: {
                'Accept': 'application/hal+json'
            }
        }).then(res => {
            console.log(res);
        });
    });
}

module.exports = {
    tronaldQuote
}