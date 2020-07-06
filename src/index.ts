import { Client } from '@typeit/discord';
import dotenv from 'dotenv';
dotenv.config();

async function start() {
    const client = new Client({
        classes: [
          `${__dirname}/HappyBirthdayWaifu.js`, // glob string to load the classes
        ],
        silent: false,
        variablesChar: ":",
        disableMentions: 'none',

      });
    try {
        await client.login('' + process.env.DISCORD_TOKEN);
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}

start();
