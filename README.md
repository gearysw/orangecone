This bot uses the Node JS Slack SDK v4.x (http://slackapi.github.io/node-slack-sdk/).

The main file for this project is `bot.js`. The bot still requires a file containing environment secrets by using a `.env` file. Documentation for `dotenv` can be found here (https://www.npmjs.com/package/dotenv).

The bot takes a `TOKEN` variable from the `.env` file to authenticate itself with your Slack workspace. This token usually starts with `xoxb-`.

Once you've built your local project, you can run the bot by executing `node bot.js`.