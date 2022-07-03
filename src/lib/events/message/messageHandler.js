const CooldownHandler = require('./cooldownHandler')

// Class
class MessageHandler {
    constructor() {}
    /*
		Checks if user is AFK
		@param [options] Options for db, message
		@returns {Message} String that sends a message if the user is afk.
		@example
		// With all parameters(Required)
		messageHandler.afk({ message: message, db: db })
	*/
    static async afk(options) {
        const { message, db } = options;
        if (db.has(`afk_${message.author.id}+${message.guild.id}`)) {
            const info = db.get(`afk_${message.author.id}+${message.guild.id}`);
            await db.delete(`afk_${message.author.id}+${message.guild.id}`);
            message.reply(`Your afk status have been removed (${info})`);
        }
        if (message.mentions.members.first()) {
            if (
                db.has(
                    `afk_${message.mentions.members.first().id}+${
                        message.guild.id
                    }`,
                )
            ) {
                message.channel.send(
                    message.mentions.members.first().user.tag +
                        ' is afk, ' +
                        db.get(
                            `afk_${message.mentions.members.first().id}+${
                                message.guild.id
                            }`,
                        ),
                );
            } else return;
        } else;
    }
    /*
		Checks if message is a command
		If command runs command
		@param [options] Options for db, message, client
		@returns {Message} String that sends a message if it is a command
		@example
		// With all parameters(Required)
		messageHandler.commands({ message: message, db: db, client: client })
	*/
    static async commands(options) {
        const { message, db, client, cooldowns } = options;
        try {
            let prefix = await db.fetch(`prefix_${message.guildId}`);
            if (prefix) {
                if (message.mentions.users.first()) {
                    if (
                        message.mentions.users.first().id ==
                        '982949470884990978'
                    )
                        return message.channel.send(
                            `My prefix in **${message.guild.name}** is ${prefix}`,
                        );
                }
                if (
                    !message.guild ||
                    !message.content.toLowerCase().startsWith(prefix)
                )
                    return;

                const [cmd, ...args] = message.content
                    .slice(prefix.length)
                    .trim()
                    .split(/ +/g);

                const command =
                    client.commands.get(cmd.toLowerCase()) ||
                    client.commands.find((c) =>
                        c.aliases?.includes(cmd.toLowerCase()),
                    );

                if (!command) return;

                if (
                    command.userperms.length > 0 ||
                    command.botperms.length > 0
                ) {
                    if (typeof command.userperms === 'string') {
                        command.userperms = command.userperms.split();
                        validatePermissions(command.userperms);
                    }

                    for (const permission of command.userperms) {
                        if (!message.member.permissions.has(permission)) {
                            return message.channel.send(
                                `<:vError:725270799124004934> Insufficient Permission! \`${permission}\` required.`,
                            );
                        }
                    }

                    if (typeof command.botperms === 'string') {
                        command.botperms = command.botperms.split();
                        validatePermissions(command.botperms);
                    }

                    for (const permission of command.botperms) {
                        if (!message.guild.me.permissions.has(permission)) {
                            return message.channel.send(
                                `<:vError:725270799124004934> Insufficient Permission! I require \`${permission}\`.`,
                            );
                        }
                    }
                }

                CooldownHandler.cooldown({
                    message: message,
                    cooldowns: cooldowns,
                    message: message,
                    client: client,
                    args: args,
                    command: command,
                });
            } else {
                let standardPrefix = '?';
                if (message.mentions.users.first()) {
                    if (
                        message.mentions.users.first().id ==
                        '982949470884990978'
                    )
                        return message.channel.send(
                            `My Prefix in **${message.guild.name}** is ${standardPrefix}`,
                        );
                }
                if (
                    !message.guild ||
                    !message.content.toLowerCase().startsWith(standardPrefix)
                )
                    return;

                const [cmd, ...args] = message.content
                    .slice(standardPrefix.length)
                    .trim()
                    .split(/ +/g);

                const command =
                    client.commands.get(cmd.toLowerCase()) ||
                    client.commands.find((c) =>
                        c.aliases?.includes(cmd.toLowerCase()),
                    );

                if (!command) return;

				if (
                    command.userperms.length > 0 ||
                    command.botperms.length > 0
                ) {
                    if (typeof command.userperms === 'string') {
                        command.userperms = command.userperms.split();
                        validatePermissions(command.userperms);
                    }

                    for (const permission of command.userperms) {
                        if (!message.member.permissions.has(permission)) {
                            return message.channel.send(
                                `<:vError:725270799124004934> Insufficient Permission! \`${permission}\` required.`,
                            );
                        }
                    }

                    if (typeof command.botperms === 'string') {
                        command.botperms = command.botperms.split();
                        validatePermissions(command.botperms);
                    }
                }
				
                CooldownHandler.cooldown({
                    message: message,
                    cooldowns: cooldowns,
                    message: message,
                    client: client,
                    args: args,
                    command: command,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = MessageHandler;
