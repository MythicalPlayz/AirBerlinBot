const Discord = require('discord.js')
const fs = require("fs")
const fetch = require("node-fetch")

module.exports = {
    name: "profile",
    run: async (message,client) => {
        Info = await GetData(message)
        if (Info.status === "ok") {
            Groups = await GetGroups(Info.robloxId)
            GetGroupRank(Groups)
        }
      
            else {
                SendUserVerify(message)
            } 

    }
}
async function GetData(message) {
    return await  fetch(`https://verify.eryn.io/api/user/${message.author.id}`)
    .then(res => res.json())


}
function SendUserVerify(message) {
    let embed = new Discord.MessageEmbed()
    embed.setDescription(":exclamation::wave: You must be new! Please go to https://verify.eryn.io/ and follow the instructions on the page in order to get verified.")
    embed.setTitle('Verify')
    embed.setColor('#ff2b2b');
    message.channel.send(embed)
}
async function GetGroups(userId) {
    return await fetch(`https://groups.roblox.com//v2/users/${userId}/groups/roles`)
    .then(res => res.json())
}
function GetGroupRank(table) {
    for (const part of table){
        console.log(part)
        //TODO: Fix
    }
}