const Discord = require('discord.js')
const fs = require("fs")
const fetch = require("node-fetch")

module.exports = {
    name: "verifyauto",
    run: async (memb,client) => {
 
    
     
     fetch(`https://verify.eryn.io/api/user/${memb.id}`)
             .then(res => res.json())
             .then(json => {
                if (json.status === "ok") {
                    //robloxId
  value = json.robloxUsername
  //let member = message.guild.members.cache.get(client.id)
  
   role = memb.guild.roles.cache.find(role => role.name === "Verified")
 memb.roles.add(role)
  memb.setNickname(value,"Verified")
  var role2 = memb.guild.roles.find('Unverified', 'Beginner role name');
  memb.roles.remove(role2)
                }
                else {
                    value =  "Not Found";
                    SendUserVerify(memb)
                }
             })
             
       
    }
}
 
function SendUserVerify(memb) {
    let embed = new Discord.MessageEmbed()
    embed.setDescription(":exclamation::wave: You must be new! Please go to https://verify.eryn.io/ and follow the instructions on the page in order to get verified.")
    embed.setTitle('Verify')
    embed.setColor('#ff2b2b');
    memb.guild.channels.get('764486791318732840').send(embed)
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
}