const Discord = require('discord.js')
const fs = require("fs")
const fetch = require("node-fetch")
module.exports = {
    name: "verify",
    run: async (message,client) => {

        fetch(`https://verify.eryn.io/api/user/${message.author.id}`)
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
    }
}