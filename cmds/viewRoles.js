const {
    RTMClient
} = require('@slack/rtm-api');
const {
    WebClient
} = require('@slack/web-api');

const rtm = new RTMClient(process.env.TOKEN);
const web = new WebClient(process.env.TOKEN);
const fs = require('fs');
(async () => {
    const {
        self,
        team
    } = await rtm.start();
    // console.log('RTM connected');
})();

module.exports = function (channel) {
    // send aero roles
    var aero = [];
    var aerobuffer = [];
    fs.readFile('./roles/aero.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`aero\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            aerobuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(aerobuffer);
                aerobuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        aero.push(` ${res.user.profile.real_name}`);
                        if (aero.length == json.length) {
                            console.log(aero);
                            rtm.sendMessage(`\`aero\`:${aero.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });

    // send business roles
    var business = [];
    var businessbuffer = [];
    fs.readFile('./roles/business.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`businesss\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            businessbuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(aerobuffer);
                businessbuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        business.push(` ${res.user.profile.real_name}`);
                        if (business.length == json.length) {
                            console.log(business);
                            rtm.sendMessage(`\`business\`:${business.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });

    // send chassis roles
    var chassis = [];
    var chassisbuffer = [];
    fs.readFile('./roles/chassis.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`chassis\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            chassisbuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(chassisbuffer);
                chassisbuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        chassis.push(` ${res.user.profile.real_name}`);
                        if (chassis.length == json.length) {
                            console.log(chassis);
                            rtm.sendMessage(`\`chassis\`:${chassis.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });

    // send electronics roles
    var electronics = [];
    var electronicsbuffer = [];
    fs.readFile('./roles/electronics.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`electronics\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            electronicsbuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(electronicsbuffer);
                electronicsbuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        electronics.push(` ${res.user.profile.real_name}`);
                        if (electronics.length == json.length) {
                            console.log(electronics);
                            rtm.sendMessage(`\`electronics\`:${electronics.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });

    // send leaddesigners roles
    var leaddesigners = [];
    var leaddesignersbuffer = [];
    fs.readFile('./roles/leaddesigners.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`leaddesigners\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            leaddesignersbuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(leaddesignersbuffer);
                leaddesignersbuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        leaddesigners.push(` ${res.user.profile.real_name}`);
                        if (leaddesigners.length == json.length) {
                            console.log(leaddesigners);
                            rtm.sendMessage(`\`leaddesigners\`:${leaddesigners.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });

    // send leadership roles
    var leadership = [];
    var leadershipbuffer = [];
    fs.readFile('./roles/leadership.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`leadership\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            leadershipbuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(leadershipbuffer);
                leadershipbuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        leadership.push(` ${res.user.profile.real_name}`);
                        if (leadership.length == json.length) {
                            console.log(leadership);
                            rtm.sendMessage(`\`leadership\`:${leadership.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });

    // send lowvoltage roles
    var lowvoltage = [];
    var lowvoltagebuffer = [];
    fs.readFile('./roles/lowvoltage.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`lowvoltage\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            lowvoltagebuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(lowvoltagebuffer);
                lowvoltagebuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        lowvoltage.push(` ${res.user.profile.real_name}`);
                        if (lowvoltage.length == json.length) {
                            console.log(lowvoltage);
                            rtm.sendMessage(`\`lowvoltage\`:${lowvoltage.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });

    // send power roles
    var power = [];
    var powerbuffer = [];
    fs.readFile('./roles/power.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`power\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            powerbuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(powerbuffer);
                powerbuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        power.push(` ${res.user.profile.real_name}`);
                        if (power.length == json.length) {
                            console.log(power);
                            rtm.sendMessage(`\`power\`:${power.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });

    // send suspension roles
    var suspension = [];
    var suspensionbuffer = [];
    fs.readFile('./roles/suspension.json', (err, data) => {
        let json = JSON.parse(data);
        if (json.length == 0) {
            rtm.sendMessage(`\`suspension\`: Empty`, channel);
            return;
        }
        let count1 = 0;

        for (let i = 0; i < json.length; i++) {
            let buffer = json[i].substring(2, 11);
            suspensionbuffer.push(buffer.toString());
            count1++;
            if (count1 == json.length) {
                console.log(suspensionbuffer);
                suspensionbuffer.forEach(userid => {
                    web.users.info({
                        token: process.env.TOKEN,
                        user: userid
                    }).then(res => {
                        suspension.push(` ${res.user.profile.real_name}`);
                        if (suspension.length == json.length) {
                            console.log(suspension);
                            rtm.sendMessage(`\`suspension\`:${suspension.toString()}`, channel);
                        }
                    }).catch(console.error);
                });
            }
        }
    });
}