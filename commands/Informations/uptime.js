let COLORS = {
    blue: 0x0b3ebf
}
const { MessageEmbed } = require('discord.js')
const db = require('quick.db') 

module.exports = (bot) => {
    bot.on('message', message => {
        const prefix = "?"
        if(message.content.toLowerCase() === `${prefix}uptime` || message.content.toLowerCase() === `${prefix}bot-uptime`) {
            const days = Math.floor(bot.uptime / 86400000)
            const hours = Math.floor(bot.uptime / 3600000) % 24
            const minutes = Math.floor(bot.uptime / 60000) % 60
            const seconds = Math.floor(bot.uptime / 1000) % 60 
 
            
            const embed = new MessageEmbed()
            .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(COLORS.blue)
            .setDescription(`
Ich bin online seit:
\`${days}\` Tage \`${hours}\` Stunde(n) \`${minutes}\` Minute(n) \`${seconds}\` Sekunde(n)
            `)
            message.channel.send(embed)
        }
    })
}