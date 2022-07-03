const { Client } = require('discord.js');

class CLRP extends Client {
    constructor() {
        super({
            intents: 32767,
        });
    }
}

module.exports = CLRP;
