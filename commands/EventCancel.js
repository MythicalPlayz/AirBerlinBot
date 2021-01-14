const Discord = require('discord.js')
const fs = require("fs")
module.exports = {
    name: "eventcancel",
    run: async (message,client) => {
        let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
        let embed = new Discord.MessageEmbed();
            embed.setAuthor(message.author.tag, message.author.avatarURL())
            if (message.content.slice(12)) {
    embed.setDescription(`The Fight has been cancelled. \n Reason: ${message.content.slice(12)} \n Sorry for you disturbunce.`) }
    else
    {
        embed.setDescription(`The Fight has been cancelled. \n Reason: No reason given. \n Sorry for you disturbunce.`) 
    }
    embed.setTitle('Flight Cancelled')
            if (messageAttachment) embed.setImage(messageAttachment)
            embed.setColor('#ff2b2b')
            let Target = fs.readFileSync("./config/Channels.json")
            Target2 = JSON.parse(Target)
            TargetC = Target2.Event
            client.channels.cache.get(TargetC).send(embed)
          await  sleep(10000)
            message.delete()
    }
    
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
}