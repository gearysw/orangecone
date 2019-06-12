This bot uses [Node JS Slack SDK v5.0.1](https://slack.dev/node-slack-sdk/).

Before starting the bot, it requires some authentication from the [Slack App page](https://api.slack.com/apps). This app uses a `.env` file to store the credentials. Documentation for `dotenv` can be found [here](https://www.npmjs.com/package/dotenv).

The bot takes a `TOKEN` variable from the `.env` file to authenticate itself with your Slack workspace. This token usually starts with `xoxb-`.

To start the bot,
1. Install the npm packages by typing in the console `npm install`
2. Start the bot by running `node bot.js`