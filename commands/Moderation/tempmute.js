const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    commands: ['tempmute'],
    description: 'Stummt jemanden auf Zeit',
    permissions: 'KICK_MEMBERS', 
    permissionError: 'Du hast nicht genügend Rechte um jemanden zu muten.',
    expectedArgs: '?tempmute @Nutzer',

    callback: async(message, args) => {
        let grund = args.slice(2).join(" ");
        const member = message.mentions.members.first()
        member.roles.add('878214238500446255')
        const time = args[1]
        if(!member) return message.reply('Markiere einen Nutzer zum stummschalten.')
        if(!time) return message.reply('Gebe eine Zeit an, wie lange der Nutzer gestummt bleiben soll.')

        if(member.roles.cache.has('878214238500446255')) return message.reply('Dieser Nutzer ist bereits gestummt.')
        await member.roles.add('878214238500446255')

        const embed = new MessageEmbed()
        .setTitle('Nutzer gestummt')
        .setDescription(`<@${member.user.id}> ist nun stummgeschaltet für ${time}.`)
        .addField('Stummgeschaltet von', message.author)
        .setColor('RED')
        .setFooter('Grund: ' + grund)
        message.channel.send(embed)


        setTimeout(async () => {
            await member.roles.remove('878214238500446255')
            message.channel.send(`<@${member.user.id}> ist jetzt entstummt nach ${time}.`)
        }, ms(time))
    } 
}