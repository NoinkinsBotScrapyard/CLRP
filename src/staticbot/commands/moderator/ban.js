const { Message, Client } = require('discord.js');
const { SuccessEmbed, FailEmbed } = require('../../../lib');

module.exports = {
    name: 'ban',
    aliases: [],
    cooldown: 10,
    userperms: [],
    botperms: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]);
		let reason = args.slice(1).join(' ');
    },
};
