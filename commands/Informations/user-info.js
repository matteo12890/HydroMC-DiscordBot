let COLORS = {
    blue: 0x0b3ebf
}
const { MessageEmbed } = require('discord.js')
const moment = require('moment') 
moment.locale('ENG')

module.exports ={
    commands: ['userinfo', 'user-info', 'ui', 'memberinfo', 'member-info', 'mi'], // You Can Keep Any Name
    description: 'Shows User Info About A User or Pinged User.', // Optional

    callback: (message, args) => {

        const member = message.mentions.members.first() || message.member

        const status = {
            online: '🟢  Online',
            idle: '🟡  Idle',
            dnd: '🔴  Do not Disturb',
            offline: '⚫  Offline'
        }

        let mentionedMember = message.mentions.members.first() || message.member;
        let joinedAt = message.guild.createdAt.toLocaleDateString()

        const embed = new MessageEmbed()

        .setTitle(`UserInfo von ${member.user.username}`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
        .addField('Status:', `${status[member.presence.status]}`)
        .addField('Aktivität:', `${member.user.presence.activities}`)
        .addField('HydroMC.de beigetreten am:', joinedAt)
        .addField('Account erstellt am:', `${moment.utc(member.user.createdAt).format('LLLL')}`)
        .addField('Rollen', `${member.roles.cache.map(role => role.toString())}`, true)
        .setColor(COLORS.blue)

        message.channel.send(embed)
    }
}