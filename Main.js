
const Discord = require('discord.js')
const fs = require("fs")
const { Server } = require('http')
const client = new Discord.Client()
let token = "NjU0Mzk5Mjk5MjkxMDU0MTMx.XfE-1w.FeabsdulXhxA5SY163MafMz3UQM" //process.env.KEY
const prefix = ":"
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
function WrongServer(sever) {
  let embed = new Discord.MessageEmbed();
  embed.setTitle('Error')
  embed.setColor("#ff2b2b")
  embed.setDescription(`This command can only work in ${sever} server.`)
  return embed
}
function NoPermission() {
  let embed = new Discord.MessageEmbed();
  embed.setTitle('Error')
  embed.setColor("#ff2b2b")
  embed.setDescription(`This bot can only be used be staff`)
  return embed
}
function CommandHandler(message,Sever,commandname,StaffOnly) {
  let messageL = message.content.toLowerCase()
  if (messageL.startsWith(prefix+commandname)) { 
    if (StaffOnly === true && CheckForStaff(message) !== StaffOnly) {
      let embed = NoPermission()
      message.channel.send(embed)
      return
    }
    let PublicServer = fs.readFileSync("./config/PublicServer.txt","utf-8")
    if (message.guild.id === Sever || Sever === PublicServer) {
  client.commands.get(commandname).run(message,client)
  }
  else if (message.guild.id !== Sever) {
    let serverW = ''

    if (message.guild.id === PublicServer) {
      serverW = "Staff"
    }
    else {
      serverW = "Public"
    }
     let embed = WrongServer(serverW)
     message.channel.send(embed)
  }
  else {
    message.reply("Ouch! We ran into an issue.")
  }
  }
}
function CheckForStaff(message) {
   if (message.member.roles.cache.find(r => r.name === "Scripter") || message.member.roles.cache.find(r => r.name === "Higher Ranks")) {
     return true;
    }
    else {
      return false 
    }
}
client.on('message', async message => {
  if (message.author.bot) {return}
  else {
  if ( message.content.startsWith(prefix)) {
    let PublicServer = fs.readFileSync("./config/PublicServer.txt","utf-8")
    let StaffServer = fs.readFileSync("./config/StaffServer.txt","utf-8")
    let messageL = message.content.toLowerCase()
    if (messageL.startsWith(`${prefix}announcement`)) {
   CommandHandler(message,PublicServer,"announcement",true)
    }
    else if (messageL.startsWith(`${prefix}development`)) {
      CommandHandler(message,PublicServer,"development",true)
    }
    else if (messageL.startsWith(`${prefix}eventplan`)) {
      CommandHandler(message,PublicServer,"eventplan",true)
    }
    else if (messageL.startsWith(`${prefix}eventstart`)) {
      CommandHandler(message,PublicServer,"eventstart",true)
    }
    else if (messageL.startsWith(`${prefix}eventend`)) {
      CommandHandler(message,PublicServer,"eventend",true)
    }
    else if (messageL.startsWith(`${prefix}eventcancel`)) {
      CommandHandler(message,PublicServer,"eventcancel",true)
    }
    else if (messageL.startsWith(`${prefix}eventstaff`)) {
      CommandHandler(message,StaffServer,"eventstaff",true)
    }
    else if (messageL.startsWith(`${prefix}setup`)) {
      CommandHandler(message,StaffServer,"setup",true)
      }
      else if (messageL.startsWith(`${prefix}verify`)) {
        CommandHandler(message,PublicServer,"verify",false)
        }
        else if (messageL.startsWith(`${prefix}qa`)) {
          CommandHandler(message,PublicServer,"qa",true)
          }
  }
}
})
client.login(token)
client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Your Airline");
  
});
client.on('guildMemberAdd', member => {
  try {
  var role = member.guild.roles.find(role => role.name === 'Unverified'); // Variable to get channel ID
member.addRole(role);
  client.commands.get("verifyauto").run(member,client)
  }catch {
    console.log("Could not add role");
  }
})