const { MessageEmbed } = require('discord.js')
const db = require('quick.db') 
const ms = require('parse-ms') 

module.exports = {
    commands: ['nickname', 'nick'], 
    description: 'Change NickName',
    callback: async(message, args, bot) => {

        const prefix = "?"
        const member = message.member

        const timeout = 900000 // 1 Hour In MiliSecond // For CoolDown
        const nametime = db.fetch(`name-time_${message.guild.id}_${member.id}`)

        if(nametime !== null && timeout - (Date.now() - nametime) > 0) { // CoolDown
            const timeleft = ms(timeout - (Date.now() - nametime))

            const embed = new MessageEmbed()
            .setAuthor(`${member.user.username} Begged`, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
Du kannst deinen Namen erst wieder in **${timeleft.hours} Stunden ${timeleft.minutes} Minuten ${timeleft.seconds} Sekunden** ändern.
Der Cooldown beträgt **15 Minuten**.
            `)
            message.channel.send(embed)
        } else { // Code
            const name = args.join(' ') // For NickName
            if(!name) return message.reply(`Wie soll dein neuer Name werden?`) // If No NickName Provided

            if(name.length > 32) return message.reply(`Dein neuer Name darf nur weniger als 32 Buchstaben haben.`) // If Name Is Longer Then 32 Words // Discord Rules
            if(name.length < 2) return message.reply(`Dein neuer Name muss mehr als 2 Buchstaben haben.`) // If Name Is Shorter Then 2 Words

            const embed = new MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`
    <@${member.user.id}> Möchte seinen Nickname zu **${name}** verändern

    Reagiere mit :white_check_mark: um deinen Nicknamen zu verändern.
    Reagiere mit :negative_squared_cross_mark: um die Anfrage abzubrechen.
            `)
            message.channel.send(embed).then(message => {
                message.react(':white_check_mark:') // React To Embed With Yes // Change Emoji
                message.react(':negative_squared_cross_mark:') // React To Embed With No // Change Emoji
                db.set(`name-time_${message.guild.id}_${member.id}`, Date.now())

                const filter = (reaction, user) => ['885109029095997470','885109029095997470'].includes(reaction.emoji.name) && user.id === member.id // Check If User Who Reacted To Emoji(Yes/No) is The Same As Who Used Command
                const collector = message.createReactionCollector(filter)

                collector.on('collect', async r => {
                    switch (r.emoji.name) {
                        case '': 
                            member.setNickname(name)
                            message.channel.send(`Erfolgreich Namen zu **${name}** verändert.`)
                            db.set(`name-time_${message.guild.id}_${member.id}`, Date.now())
                            collector.stop()
                            break;
                            case '885109029095997470': 
                                message.channel.send('Anfrage abgebrochen!')
                                db.set(`name-time_${message.guild.id}_${member.id}`, Date.now())
                    }
                })
            })
        }
    }
}