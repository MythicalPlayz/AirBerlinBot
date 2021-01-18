const Discord = require('discord.js')
const fs = require("fs")
module.exports = {
    name: "setup",
    run: async (message,client) => {
        var args = message.content.split(' ')
        let change = args[2]
        let changer = args[1]
        if (!args[2]) {
            return false
        }
    if (changer.includes("PublicS")) {
    fs.writeFileSync("./config/PublicServer.txt",change)
    message.reply("Success")
    }
  else if (changer.includes("StaffS")) {
    fs.writeFileSync("./config/StaffServer.txt",change)
    message.reply("Success")
    }
  else if (changer.includes("Ann")) {
   // let Target = fs.readFileSync("./config/Channels.json")
   // Target2 = JSON.parse(Target)
  //  Target2.Announcement = change
  let json = GetotherValues('Announcement',change)
 // console.log(json)
data = JSON.stringify(json, null, 2)
  fs.writeFileSync('./config/Channels.json',data)
    message.reply("Success")
    }
  else if (changer.includes("Dev")) {
    let json = GetotherValues('Development',change)
  //console.log(json)
data = JSON.stringify(json, null, 2)
  fs.writeFileSync('./config/Channels.json',data)
    message.reply("Success")
    }
else if (changer.includes("PublicEvent")) {
        let json = GetotherValues('Event',change)
 // console.log(json)
data = JSON.stringify(json, null, 2)
  fs.writeFileSync('./config/Channels.json',data)
        message.reply("Success")
    }
 else if (changer.includes("StaffEvent")) {
 let json = GetotherValues('StaffEvent',change)
 // console.log(json)
data = JSON.stringify(json, null, 2)
  fs.writeFileSync('./config/Channels.json',data)
    message.reply("Success")
    }
    else if (changer.includes("QA")) {
      let json = GetotherValues('QA',change)
      // console.log(json)
     data = JSON.stringify(json, null, 2)
       fs.writeFileSync('./config/Channels.json',data)
         message.reply("Success")
         }
    else
    {
        message.reply("Error")
    }
   
}
}
function GetotherValues(exceptionv,value) {
let Target = fs.readFileSync("./config/Channels.json")
    Target2 = JSON.parse(Target);
    let Table = {}
    if (exceptionv === 'Announcement') {
      Table =
      {
        "Announcement": value,
        "Development": Target2.Development,
        "Event": Target2.Event,
        "StaffEvent": Target2.StaffEvent,
        "QA": Target2.QA
      }
      return Table
      }
    
    if (exceptionv === 'Development') {
Table =
      {
        "Announcement": Target2.Announcement,
        "Development":value,
        "Event": Target2.Event,
        "StaffEvent": Target2.StaffEvent,
        "QA": Target2.QA
      }
      return Table
    }
if (exceptionv === 'Event') {
Table =
      {
        "Announcement": Target2.Announcement,
        "Development": Target2.Development,
        "Event": value,
        "StaffEvent": Target2.StaffEvent,
        "QA": Target2.QA
      }
      return Table
    }
    if (exceptionv === 'StaffEvent') {
Table =
      {
        "Announcement": Target2.Announcement,
        "Development": Target2.Development,
        "Event": Target2.Event,
        "StaffEvent": value,
        "QA": Target2.QA
      }
      return Table
    }
    if (exceptionv === 'QA') {
      Table =
            {
              "Announcement": Target2.Announcement,
              "Development": Target2.Development,
              "Event": Target2.Event,
              "StaffEvent": Target2.StaffEvent,
              "QA": value
            }
            return Table
          } 
}