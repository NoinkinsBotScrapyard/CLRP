const { Message, Client } = require('discord.js');
const { SuccessEmbed, FailEmbed } = require('../../../lib');


module.exports = {
    name: 'strike',
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
		let strikeNum = args[1]
		let reason = args.slice(2).join(' ');
		let first = message.mentions.users.first();
		if ( !strikeNum || !reason || !first ) {
			const embed = new FailEmbed({ title: 'Syntax Error', description: 'Syntax: ?strike <offender> <strike number> <reason>', system: 'Staff Management System'})
			return message.channel.send({embeds: [embed]})
		} else {
			const embed = new SuccessEmbed({ title: "Strike", description: `User: ${message.member}\n—————————-\nOffender: ${first}\nStrike: ${strikeNum}\n—————————-\nReason: ${reason}`, system: 'Staff Management System'})
			message.channel.send({embeds: [embed]})
		}
    },
};
