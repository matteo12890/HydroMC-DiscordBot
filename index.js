console.log('Lädt...')

const Discord = require('discord.js');
const bot = new Discord.Client();

bot.queue = new Discord.Collection()

const { token, owner } = require('./config.json')
const loadCommands = require('./commands/load-commands');
const uptime = require('./commands/Informations/uptime');
const welcome = require('./commands/Moderation/welcome');


bot.once('ready', () => {
    console.log(`HydroMC eingeloggt als ` + bot.user.tag)
    
    setInterval(() => {
        const statuses = [
            `auf HydroMC.de`,
            `?help | HydroMC.de`,
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        bot.user.setActivity(status, { type: "PLAYING"})
    }, 15000)

    loadCommands(bot)
    uptime(bot)
    welcome(bot)
})





bot.login(token)