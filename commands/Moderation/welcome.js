let COLORS = {
    blue: 0x0b3ebf
}
const { MessageEmbed } = require("discord.js")

module.exports = (bot) => {
    const welcomechannelId = '884888935304658978'
    const targetChannelId = `884888935304658979`

    bot.on('guildMemberAdd', (member) => {
        const channel = member.guild.channels.cache.get(welcomechannelId)

        const embed = new MessageEmbed()
        .setTitle(`Willkommen auf ${member.guild.name}!`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription(`Hey <@${member.user.id}>, Willkommen auf **${member.guild.name}**. Schön das du hier bist!
Bitte akzeptiere unsere Regeln in ${member.guild.channels.cache.get(targetChannelId).toString()}! **Das HydroMC.de Team wünscht dir eine schöne Zeit!**
Unterhalte dich auch in <#884888935807983658>.`)
        
        .setFooter(`Willkommen ${member.user.username}#${member.user.discriminator}!`,member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor(COLORS.blue)
    channel.send(embed)
        
    })
}