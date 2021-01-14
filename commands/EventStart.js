const Discord = require('discord.js')
const fs = require("fs")
module.exports = {
    name: "eventstart",
    run: async (message,client) => {
        let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
        let embed = new Discord.MessageEmbed();
            embed.setAuthor(message.author.tag, message.author.avatarURL())
    embed.setDescription("The Server has openned. You may now be able to join. See you there! :wave:")
    embed.setTitle('Flight Started')
            if (messageAttachment) embed.setImage(messageAttachment)
            embed.setColor(14680086)
            let Target = fs.readFileSync("./config/Channels.json")
            Target2 = JSON.parse(Target)
            TargetC = Target2.Event
            client.channels.cache.get(TargetC).send(embed)
           await sleep(10000)
            message.delete()
    }
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
}