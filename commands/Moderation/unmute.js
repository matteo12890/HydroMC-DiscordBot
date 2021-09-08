const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['unmute', 'entstumm'], 
    description: 'Entstummt einen Nutzer.',
    permissions: 'KICK_MEMBERS', 
    permissionError: 'Du hast nicht genügend Rechte jemanden zu muten.',
    expectedArgs: '?unmute @Nutzer',

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Bitte markiere einen Nutzer, den du entstummen möchtest.')
        member.roles.remove('884843652684333146')
        if(!member.roles.cache.has('884843652684333146')) return message.reply('Dieser Nutzer wurde bereits entstummt')

        const embed = new MessageEmbed()
        .setTitle('Unmute')
        .setDescription(`<@${member.user.id}> ist nun nicht mehr stummgeschaltet.`)
        .addField('Entstummt von', message.author)
        .setColor('GREEN')
        .setImage('https://i.pinimg.com/originals/75/c2/eb/75c2eb6f4f1d5185134cd615201d2289.png')
        message.channel.send(embed)
    }
}