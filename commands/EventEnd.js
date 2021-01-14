const Discord = require('Discord.js')
const fs = require("fs")
module.exports = {
    name: "eventend",
    run: async (message,client) => {
        let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
        let embed = new Discord.MessageEmbed();
            embed.setAuthor(message.author.tag, message.author.avatarURL())
    embed.setDescription("The Flight has justed ended. We hope you had a great time! :wave:")
    embed.setTitle('Flight Ended')
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