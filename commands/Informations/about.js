let COLORS = {
    blue: 0x0b3ebf
}

const { MessageEmbed, bot } = require("discord.js");
const moment = require("moment");


module.exports = {
    commands: ["about", "abt"],
    description: "About Embed",
    
    callback: (message, args) => {

        let logo = message.guild.logo
        let cpuram = "CPU: 0.0% " + "\nRAM: 94 MB"
        let stats = "Server: 2 " + "\nMitglieder: 26"
        let rping = setInterval(() => {
            const rping = [
                `98`,
                `103`,
            ]
    
            const ping = rping[Math.floor(Math.round() * rping.length)]
        }, 10000)
        let bild = (`HydroMC#4697`)

        const aboutEmbed = new MessageEmbed()
            .setColor(COLORS.blue)
            .setTitle(':wave: Hey, Ich bin HydroMC')
            .setThumbnail(logo)
            .addField(':gear: Developer: ', `<@551062724667244574> [Matteoo#0001]`)
            .addField(':thought_balloon: Prefix: ', '?')
            .addField(':regional_indicator_v: Version: ', 'V 1.0.0')
            .addField(':stopwatch: Uptime: ', "Uptime" )
            .addField(':satellite: Ping: ', rping)
            .addField(':desktop: Hardware: ', cpuram)
            .addField(':bar_chart: Stats: ', stats)
            .setFooter(bild)
            .setTimestamp()


                    message.channel.send(aboutEmbed)
                    
                

}
}