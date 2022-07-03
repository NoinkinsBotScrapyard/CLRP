const { MessageEmbed } = require('discord.js');

class SuccessEmbed extends MessageEmbed {
    constructor(options) {
        super()
            .setColor('GREEN')
            .setAuthor({ name: `CSRP - ${options.system}` })
            .setTitle(options.title)
            .setDescription(options.description)
            .setFooter({ text: `CSRP - ${options.system}` });
        const { title, description, system } = options;
    }
}

module.exports = SuccessEmbed;
