const { glob } = require('glob');
const { promisify } = require('util');
const { Client } = require('discord.js');
const globPromise = promisify(glob);
console.log('[NODE/Handler] Packages Imported');

console.log(
    '\x1b[31m',
    '\n*********************************************\n*********************************************\n\nStatic Bot is Initiallising the handler\n\n*********************************************\n*********************************************\n\n\n\n',
);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(
        `${process.cwd()}/src/staticbot/commands/**/*.js`,
    );
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split('/');
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
    console.log('[HANDLER] Commands Mapped');

    // Events
    const eventFiles = await globPromise(
        `${process.cwd()}/src/staticbot/events/*.js`,
    );
    eventFiles.map((value) => require(value));
    console.log('[HANDLER] Events Mapped');
};

console.log(
    '\x1b[31m',
    '\n*********************************************\n*********************************************\n\nStatic Bot has Initiallised the handler\n\n*********************************************\n*********************************************\n\n\n\n',
);
