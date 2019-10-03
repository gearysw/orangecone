const cheerio = require('cheerio');
const axios = require('axios');

const URL = 'http://hashondawonyet.com/';

module.exports = async function () {
    return new Promise((resolve, reject) => {
        axios.get(URL).then(res => {
            if (res.status === 200) {
                const html = res.data;
                // console.log(html);
                const $ = cheerio.load(html);
                // console.log($('div').has('.answer').text());
                // console.log($('div').attr('id').text());
                $(this).find('div').each(() => {
                    console.log($(this).text());
                });
            }
        });
    });
}