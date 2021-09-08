const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms') 
const { randomPassword, randomNumber, ipAddress } = require('tech-tip-cyber') 
const randomMail = require('tech-tip-cyber') 

module.exports = {
    commands: ['hack'], 
    description: 'Jemanden hacken (Fun Command)', 

    callback: async (message, args, bot) => {

        const user = message.member
        const mention = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if (!mention) return message.reply(`Markiere einen Nutzer den du hacken möchtest.`) 

        const timeout = 120000 
        const hacktime = db.fetch(`hacktime_${user.id}`)

        if (hacktime !== null && timeout - (Date.now() - hacktime) > 0) { 
            const timeleft = ms(timeout - (Date.now() - hacktime))

            const embed = new MessageEmbed()
                .setAuthor(`${user.user.username} gehackt!`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RED')
                .setDescription(`
Bereits gehackt! Nächster Hack in **${timeleft.minutes} Minuten ${timeleft.seconds} Sekunden**
Der Cooldown beträgt **2 Minuten**
            `)
            message.channel.send(embed)
        } else {
            const disemail = randomMail({  
                domain: 'hydromc.de'
            })

            const email = randomMail({ 
                domain: 'gmail.com' 
            })

            const dispassword = randomPassword(12)

            const password = randomPassword(12) 
 
            const ip = ipAddress() 

            const age = await randomNumber({
                Minimum: 8,
                Maximum: 62, 
            }) 

            message.channel.send(`Startet Hack auf ${mention.user.username}..`).then(message => { 
                setTimeout(function () {
                    message.edit(`Einloggen in das Discord Konto...`)
                }, 2000)
                setTimeout(function () {
                    message.edit(`Erfolgreich in das Konto eingeloggt.`)
                }, 5000)
                setTimeout(function () {
                    message.edit(`Eingeloggt in das Konto von ${mention.user.username}\nEmail: ${disemail}\nPasswort: ${dispassword}`)
                }, 8000)
                setTimeout(function () {
                    message.edit(`Viren an das Konto #${mention.user.discriminator} schicken...`)
                }, 11000)
                setTimeout(function () {
                    message.edit(`Erfolgreich Viren an das Konto von #${mention.user.discriminator} geschickt.`)
                }, 15000)
                setTimeout(function () {
                    message.edit(`Gmail Account hacken...`)
                }, 18000)
                setTimeout(function () {
                    message.edit(`Gmail Account hacken... Passwort bekommen...`)
                }, 22000)
                setTimeout(function () {
                    message.edit(`Gmail Account von ${mention.user.username} gehackt.\nEmail: ${email}\nPasswort: ${password}`)
                }, 26000)
                setTimeout(function () {
                    message.edit(`IP Adresse bekommen...`)
                }, 30000)
                setTimeout(function () {
                    message.edit(`IP Adresse von ${mention.user.username} gefunden.\nIP: ${ip}`)
                }, 35000)
                setTimeout(function () {
                    message.edit(`Alter des Nutzers bekommen...`)
                }, 37000)
                setTimeout(function () {
                    message.edit(`Alter von ${mention.user.username} gefunden\nAlter: ${age}`)
                }, 40000)
                setTimeout(function () {
                    message.edit(`Erfolgreich ${mention.user.username} gehackt! :pick:`)
                }, 45000)
            })
            db.set(`hacktime_${user.id}`, Date.now())
        }
    }
}