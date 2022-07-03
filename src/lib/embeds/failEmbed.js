const { MessageEmbed } = require('discord.js');

class FailEmbed extends MessageEmbed {
	/*
	 * @param [options] title, description, system
	 * @returns {object}
	*/
    constructor(options) {
        super()
            .setColor('RED')
            .setAuthor({ name: `CSRP - ${options.system}` })
            .setTitle(options.title)
            .setDescription(options.description)
            .setFooter({ text: `CSRP - ${options.system}` });
        const { title, description, system } = options;
    }
}

module.exports = FailEmbed;
