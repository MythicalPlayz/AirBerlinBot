const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const { Message } = require('discord.js');
const Discord = require('discord.js')
const fs = require("fs")
module.exports = {
    name: "announcement",
    run: async (message,client) => {
        let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
        
        
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
    .setDescription(message.content.slice(13))
    .setTitle('Announcement')
    if (messageAttachment) embed.setImage(messageAttachment)
       //.setImage("http://i.imgur.com/p2qNFag.png")
            .setColor('#ff2b2b');
            let Target = fs.readFileSync("./config/Channels.json")
            Target2 = JSON.parse(Target)
            TargetC = Target2.Announcement
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