let COLORS = {
    blue: 0x0b3ebf
}

const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: "help",
    description: "Help",

    callback: (message, args) => {


        const embed = new MessageEmbed()
        .setColor(COLORS.blue)
        .setTitle(':wave: Hey, brauchst du Hilfe? Ich habe hier etwas!')
        .setTimestamp()
    }
}