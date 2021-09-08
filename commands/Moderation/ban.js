const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['ban', 'punish'],
    description: 'Bannt einen Nutzer', 
    permissions: 'BAN_MEMBERS', 
    permissionError: 'Du hast nicht genügend Rechte jemanden zu bannen!',
    expectedArgs: '?ban @Nutzer', 

    callback: (message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Du musst den Nutzer markieren, den du bannen möchtest. Nutze: ?ban @Nutzer')
        member.ban()

        const embed = new MessageEmbed()
        .setTitle('Nutzer gebannt')
    .setDescription(`<@${member.user.id}> wurde erfolgreich gebannt!`)
        .addField('Gebannt von ', message.author)
        .setImage('https://www.seekpng.com/png/full/189-1893200_ban-hammer-png-image-freeuse-library-pokemon-go.png')
        .setColor('RED')
        message.channel.send(embed)
    }
}