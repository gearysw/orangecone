module.exports = function (input) {
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
        // messageSend('Please follow the actual syntax.', channel);
        var msg = 'Please follow the actual syntax.';
        return msg;
    }

    var numDice = parseInt(dice.split('d')[0]);
    var diceType = parseInt(dice.split('d')[1]);

    if (diceType != 4 && diceType != 6 && diceType != 8 && diceType != 10 && diceType != 12 && diceType != 20) {
        // messageSend('That is not a standard die.', channel);
        var msg = 'That is not a standard die.';
        return msg;
    } else {
        let min = Math.ceil(numDice);
        let max = Math.floor(numDice * diceType);
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(`Rolled: ${num}`);
        // messageSend(num.toString(), channel);
        return num.toString();
    }
}