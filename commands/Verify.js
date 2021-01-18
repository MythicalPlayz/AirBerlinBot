const Discord = require('discord.js')
const fs = require("fs")
const fetch = require("node-fetch")

module.exports = {
    name: "verify",
    run: async (message,client) => {
 
    
     
     fetch(`https://verify.eryn.io/api/user/${message.author.id}`)
             .then(res => res.json())
             .then(json => {
                if (json.status === "ok") {
                    //robloxId
  value = json.robloxUsername
  //let member = message.guild.members.cache.get(client.id)
  
   role = message.member.guild.roles.cache.find(role => role.name === "Verified")
  message.member.roles.add(role)
  message.member.setNickname(value,"Verified")
                }
                else {
                    value =  "Not Found";
                    SendUserVerify(message)
                }
             })
             
       
    }
}
 
function SendUserVerify(message) {
    let embed = new Discord.MessageEmbed()
    embed.setDescription(":exclamation::wave: You must be new! Please go to https://verify.eryn.io/ and follow the instructions on the page in order to get verified.")
    embed.setTitle('Verify')
    embed.setColor('#ff2b2b');
    message.channel.send(embed)
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
}