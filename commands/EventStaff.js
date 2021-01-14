const Discord = require('discord.js')
const fs = require("fs")
module.exports = {
    name: "eventstaff",
    run: async (message,client) => {
        let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
        let embed = new Discord.MessageEmbed();
            embed.setAuthor(message.author.tag, message.author.avatarURL())
    embed.setDescription(message.content.slice(12))
    embed.setTitle('Flight Allocation')
            if (messageAttachment) embed.setImage(messageAttachment)
            embed.setColor('#ff2b2b')
            let Target = fs.readFileSync("./config/Channels.json")
            Target2 = JSON.parse(Target)
            TargetC = Target2.StaffEvent
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