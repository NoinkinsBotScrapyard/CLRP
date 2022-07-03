const { Command } = require('reconlx');
const db = require('quick.db');

module.exports = {
    name: 'setprefix',
    aliases: ['sp'],
    cooldown: 10,
    userperms: [],
    botperms: ['MANAGE_CHANNELS'],
    run: async (client, message, args) => {
        if (!message.member.roles.cache.has('981100313555644416') || !message.author.id === '700641965787709520')
            return message.channel.send(
                'You do not have permission to perform this command.',
            );
		if (!args[0]) return message.channel.send('Please specify a prefix')
        const prefix = args[0]
        db.set(`prefix_${message.guild.id}`, prefix);
        message.channel.send(`Prefix changed to ${prefix}`)
    },
};
