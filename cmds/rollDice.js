module.exports = async function (input) {
    return new Promise((resolve, reject) => {
        var str = input.split(' ');
        var i, val, dice;
        for (i = 0; i < str.length; i++) {
            val = str[i];
            if (val.substring(0).match(/\dd\d/)) {
                dice = val;
                break;
            }
        }

        if (dice === undefined) {
            var msg = 'Please follow the actual syntax.';
            return reject(msg);
        }

        var numDice = parseInt(dice.split('d')[0]);
        var diceType = parseInt(dice.split('d')[1]);

        if (diceType != 4 && diceType != 6 && diceType != 8 && diceType != 10 && diceType != 12 && diceType != 20) {
            var msg = 'That is not a standard die.';
            return reject(msg);
        } else {
            let min = Math.ceil(numDice);
            let max = Math.floor(numDice * diceType);
            let num = Math.floor(Math.random() * (max - min + 1) + min);
            console.log(`Rolled: ${num}`);
            return resolve(num.toString());
        }

    });
}