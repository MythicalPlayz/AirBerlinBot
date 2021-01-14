
const Discord = require('discord.js')
const fs = require("fs")
const client = new Discord.Client()
let token =process.env.KEY
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
function CommandHandler(message,Sever,commandname) {
  let messageL = message.content.toLowerCase()
  if (messageL.startsWith(prefix+commandname)) {
    if (message.guild.id === Sever ) {
  client.commands.get(commandname).run(message,client)
  }
  else {
    let serverW = ''
let PublicServer = fs.readFileSync("./config/PublicServer.txt","utf-8")
    if (message.guild.id === PublicServer) {
      serverW = "Staff"
    }
    else {
      serverW = "Public"
    }
     let embed = WrongServer(serverW)
     message.channel.send(embed)
  }
  }
}
client.on('message', async message => {
//if (message.content.startsWith(':role')) {
//var role= message.member.guild.roles.cache.find(role => role.name === "Staff");
//message.member.roles.add(role);
//var role2= message.member.guild.roles.cache.find(role => role.name === "Higher Rank");
//message.member.roles.add(role2);
 //   }
  if (message.author.bot) {return}
  else {
  if ( message.content.startsWith(prefix)) {
    //if (message.content === 'shut') { process.exit() ;}
    if (message.member.roles.cache.find(r => r.name === "Scripter") || message.member.roles.cache.find(r => r.name === "Higher Ranks")) {
    }
    else {
    //  console.log(message.member.roles.cache.find(r => r.name === "Higher Ranks"))
      let embed = NoPermission()
      message.channel.send(embed)
      return
    }
   // console.log(messageL)
    let PublicServer = fs.readFileSync("./config/PublicServer.txt","utf-8")
    let StaffServer = fs.readFileSync("./config/StaffServer.txt","utf-8")
    let messageL = message.content.toLowerCase()
    if (messageL.startsWith(`${prefix}announcement`)) {
   CommandHandler(message,PublicServer,"announcement")
    }
    else if (messageL.startsWith(`${prefix}development`)) {
      CommandHandler(message,PublicServer,"development")
    }
    else if (messageL.startsWith(`${prefix}eventplan`)) {
      CommandHandler(message,PublicServer,"eventplan")
    }
    else if (messageL.startsWith(`${prefix}eventstart`)) {
      CommandHandler(message,PublicServer,"eventstart")
    }
    else if (messageL.startsWith(`${prefix}eventend`)) {
      CommandHandler(message,PublicServer,"eventend")
    }
    else if (messageL.startsWith(`${prefix}eventcancel`)) {
      CommandHandler(message,PublicServer,"eventcancel")
    }
    else if (messageL.startsWith(`${prefix}eventstaff`)) {
      CommandHandler(message,StaffServer,"eventstaff")
    }
    else if (messageL.startsWith(`${prefix}setup`)) {
      if (message.member.roles.cache.find(r => r.name === "Higher Ranks")|| message.member.roles.cache.find(r => r.name === "Scripter")) {
      CommandHandler(message,StaffServer,"setup")
      }
      else {
 return
      }
    }
  }
}
})
client.login(token)
client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
      status: "online",  //You can show online, idle....
      game: {
          name: "Flying to Germany||Fleigen nach Deutschland!",  //The message shown
          type: "LISTENING" //PLAYING: WATCHING: LISTENING: STREAMING:
      }
    
  });
  client.user.setActivity("Flying to Germany||Fleigen nach Deutschland!");
  
});