let COLORS = {
    blue: 0x0b3ebf
}
const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['serverinfo', 'server-info', 'si'],
    description: 'Informationen über den Server', 

    callback: (message, args) => {

        const { guild } = message
        const icon = message.guild.iconURL() // Icon Of Server
        const roles = message.guild.roles.cache.map(e => e.toString()) // Roles Of Server
        const emojis = message.guild.emojis.cache.map(e =>  e.toString()) // Emojis Of Server
        const emojicount = message.guild.emojis.cache 
        const members = message.guild.members.cache // Members In Server
        const create = message.guild.createdAt.toLocaleDateString() // Server Create Date 
        const name = message.guild.name 

        const embed = new MessageEmbed()
            .setColor(COLORS.blue)
            .setTitle('ServerInfo von ' + '**'+name+'**')
            .setThumbnail("https://cdn.discordapp.com/attachments/871336886491295784/882664382105022545/image0.jpg")
            .addField('Server erstellt am', create)
            .addField('Owner',  guild.owner)
            .addField('Members', `Alle: ${members.size}\nNutzer: ${members.filter(member => !member.user.bot).size}\nBots: ${members.filter(member => member.user.bot).size}`)
            .addField('Status', `🟢 : ${guild.members.cache.filter(member => member.presence.status == 'online').size}\n🟡 : ${guild.members.cache.filter(member => member.presence.status == 'idle').size}\n🔴 : ${guild.members.cache.filter(member => member.presence.status == 'dnd').size}\n`)
            .addField('Channels', `⌨️ Text: ${guild.channels.cache.filter(channel => channel.type == 'text').size}\n🔈 Voice: ${guild.channels.cache.filter(channel => channel.type == 'voice').size}\n📁 Kategorien: ${guild.channels.cache.filter(channel => channel.type == 'category').size}`)
            .addField('Rollen', `${roles}`, true)

        message.channel.send(embed)
        
    }
}