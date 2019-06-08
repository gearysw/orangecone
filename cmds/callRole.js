const fs = require('fs');

module.exports = async function (text) {
    return new Promise((resolve, reject) => {
        var args = text.split(' ');
        var key, value, result;
        for (key in args) {
            if (args.hasOwnProperty(key) && !isNaN(parseInt(key, 10))) {
                value = args[key];
                if (value[0] === '@') {
                    result = value;
                    break;
                }
            }
        }
        let role = result.substring(1);
        console.log(`Role to be called: ${role}`);

        fs.readFile(`./roles/${role}.json`, (err, data) => {
            if (err) console.log(err);
            var json = JSON.parse(data);
            let call = json.toString();
            if (call === undefined || call.length == 0) {
                return reject('Role is empty.');
            } else {
                return resolve(call);
            }

        });
    });
}