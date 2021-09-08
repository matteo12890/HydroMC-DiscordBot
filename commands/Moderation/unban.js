const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['unban', 'pardon', 'entbann'],
    description: 'Entbannt einen Nutzer mit der User-ID',
    permissions: 'BAN_MEMBERS',
    permissionError: 'Du hast nicht genügend Rechte jemanden zu entbannen.',
    expectedArgs: '?unban userid',

    callback: (message, args) => {

        const userID = args[0]
        if(!userID) return message.reply('Du musst die Nutzer ID angeben um jemanden zu entbannen.')

    
        message.guild.fetchBans().then(bans => {
            if(bans.size == 0) return
            let bannedUser = bans.find(b => b.user.id == userID)

            if(bannedUser) {

                const embed =  new MessageEmbed()
                .setTitle('Nutzer entbannt')
                .setDescription(`<@${userID}> wurde erfolgreich entbannt!`)
                .addField('Entbannt von:', message.author)
                .addField('UserID:', userID)
                .setImage('https://emoji.gg/assets/emoji/7191_unban_hammer.png')
                .setColor('GREEN')

                message.channel.send(embed).then(message.guild.members.unban(bannedUser.user))
            } else {
                message.reply('Dieser Nutzer ist nicht gebannt, oder du hast die falsche ID angegeben.')
            }
        })


    }
}
