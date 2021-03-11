const Discord = require('discord.js')
const fs = require("fs")
const fetch = require("node-fetch")

module.exports = {
    name: "verify",
    run: async (message,client) => {
   Info = await GetData(message)
   if (Info.status === "ok") {
HandleRole(Info.robloxUsername,message)
   }
 
       else {
           value =  "Not Found";
           SendUserVerify(message)
       } 
    
     
    
}
}
async function GetData(message) {
    return await  fetch(`https://verify.eryn.io/api/user/${message.author.id}`)
    .then(res => res.json())


}
 function HandleRole(user,message) {
role = message.member.guild.roles.cache.find(role => role.name === "Verified")
message.member.roles.add(role)
var role2 = message.member.guild.roles.cache.find(role => role.name === 'Unverified');
message.member.roles.remove(role2)
message.member.setNickname(user,"Verified")
       
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