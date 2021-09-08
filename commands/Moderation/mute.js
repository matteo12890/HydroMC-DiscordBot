const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['mute', 'stumm'],
    description: 'Schaltet einen Nutzer stumm.', 
    permissions: 'KICK_MEMBERS',
    permissionError: 'Du hast nicht genügend Rechte um jemanden zu muten.', 
    expectedArgs: '?mute @Nutzer',

    callback: (message, args) => {

        let reason = args.slice(1).join(" ");
        const member = message.mentions.members.first()
        if(!member) return message.reply('Bitte markiere einen Nutzer, den du stummschalten möchtest.')
        member.roles.add('884843652684333146')
        if(member.roles.cache.has('884843652684333146')) return message.reply('Dieser Nutzer ist bereits stummgeschaltet.')

        const embed = new MessageEmbed()
        .setTitle('Nutzer gestummt')
        .setDescription(`<@${member.user.id}> wurde erfolgreich stummgeschalten.`)
        .addField('Stummgeschaltet von', message.author)
        .setColor('RED')
        .setFooter('Grund: ' + reason)
        .setImage('https://i2.wp.com/slurptech.com/wp-content/uploads/2020/11/How-to-Toggle-Mute-on-Discord.png?resize=680%2C350&ssl=1')
        message.channel.send(embed)
    }
}