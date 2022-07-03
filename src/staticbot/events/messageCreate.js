const client = require('../index');
const db = require('quick.db');
const { MessageHandler } = require('../../lib/index.js');
console.log('[NODE/messageCreate.js] Packages Imported');

console.log(
    '\x1b[31m',
    '\n*********************************************\n*********************************************\n\nStatic Bot is now recieving Messages\n\n*********************************************\n*********************************************\n\n\n\n',
);

// Create cooldowns
const cooldowns = new Map();
client.on('messageCreate', async (message) => {
    // If bot
    if (message.author.bot) return;
    // If member is afk remove AFK || If mentioned AFK member
    MessageHandler.afk({
        message: message,
        db: db,
    });
    // If message = command run command
    MessageHandler.commands({
        message: message,
        db: db,
        client: client,
        cooldowns: cooldowns
    });
});
