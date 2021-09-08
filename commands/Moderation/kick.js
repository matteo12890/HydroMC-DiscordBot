const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'kick', 
    description: 'Kickt einen Nutzer', 
    permissions: 'KICK_MEMBERS', 
    permissionError: 'Du hast nicht genügend Rechte jemanden zu kicken.',
    expectedArgs: '?kick @Nutzer',

    callback: (message, args) => {
        let grund = args.slice(1).join(" ");
        const member = message.mentions.members.first()
        if(!member) return message.reply('Du musst einen Nutzer markieren, den du kicken möchtest.')
        member.kick()

        const embed = new MessageEmbed()
        .setTitle('Nutzer gekickt')
        .setDescription(`<@${member.user.id}> wurde erfolgreich gekickt.`)
        .addField('Gekickt von', message.author)
        .setColor('RED')
        .setFooter('Grund: ' + grund)
        .setImage('https://i2.wp.com/slurptech.com/wp-content/uploads/2020/11/How-to-Toggle-Mute-on-Discord.png?resize=680%2C350&ssl=1')
        message.channel.send(embed)
    }
}