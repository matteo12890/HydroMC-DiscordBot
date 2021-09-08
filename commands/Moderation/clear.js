let COLORS = {
    blue: 0x0b3ebf
}
const { MessageEmbed } = require("discord.js");

module.exports ={
    commands: ['clear', 'purge', 'del', 'delete', 'löschen'], 
    permissions: 'ADMINISTRATOR', 
    permissionError: 'Du kannst diesen Command nicht ausführen!', 
    description: 'Löscht Nachrichten', 
    callback: (message, args) => {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.channel.send('Bitte gebe eine Zahl an.')
        } else if (amount <= 1 || amount > 100) {
            return message.channel.send('Du kannst nur Nachrichten von 1-99 löschen.')
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('Error: Du kannst in diesem Channel keine Nachrichten löschen!')

            
        })
            
            const clearEmbed = new MessageEmbed()
            .setTitle('Clear')
            .addField('Gelöschte Nachrichten: ', amount)
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
            .setColor(COLORS.blue)

                message.channel.send(clearEmbed).then(msg => msg.delete({timeout: 2000}))

        console.log(`Ich habe ` + amount + ' Nachrichten gelöscht!')
    }
}