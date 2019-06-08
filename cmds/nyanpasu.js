const axios = require('axios');
const Url = 'http://nyanpass.com/add.php';
const Header = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
const Form = 'nyan=pass';

module.exports = async function () {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: Url,
            headers: Header,
            data: Form
        }).then(res => {
            console.log(res.data);
            return resolve(res.data.cnt);
        }).catch(err => {
            console.log(err);
            return reject();
        });
    })
}