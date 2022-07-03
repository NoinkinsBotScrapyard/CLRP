const client = require('../index');
const { MessageEmbed } = require('discord.js')

function captcha(options) {
	const { member, json } = options
	const filter = (m) => {
        if(m.author.bot) return;
        if(m.author.id === member.id && m.content === json.captcha_text) return true;
        else {
            msg.channel.send("You have answered the captcha incorrectly!")
		}
    };
    const response = await msg.channel.awaitMessages(filter, {
        max : 1,
        time : 10000,
        errors : ['time']
    })
    if(response) {
        msg.channel.send('Congrats, you have answered the captcha.')
    }
}


client.on('guildMemberAdd', async (member) => {
    const url = 'https://api.no-api-key.com/api/v2/captcha';
        try {
            fetch(url)
                .then(res => res.json())
                .then(async json => {
                    console.log(json)
                    const msg = await member.send(
                        new MessageEmbed()
                            .setTitle('Please enter the captcha')
                            .setImage(json.captcha)
                            .setColor("RANDOM")
                    )
                    try {
                        captcha({ member: member, json: json })
                    } catch (error) {
                        msg.channel.send(`Try again.`)
						try {
                        	captcha({ member: member, json: json })
						} catch(error) {
							msg.channel.send('Try again.')
							try {
                        		captcha({ member: member, json: json })
                    		} catch (error) {
                        		msg.channel.send(`Try again.`)
								try {
                        			captcha({ member: member, json: json })
								} catch(error) {
									msg.channel.send('You failed.....')
									member.kick()
								}
                   			}
						}
                    }
                })
        } catch (error) {
            console.log(error)
        }
})