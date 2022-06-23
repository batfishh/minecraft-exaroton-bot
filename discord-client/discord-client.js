require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({ intents: [['GUILDS', 'GUILD_MESSAGES']] })

client.on('ready', () => {
    console.log(`Discord client ready :  ${client.user.tag}!`);
});


client.login(process.env.DISCORD_TOKEN).then((success) => {
    console.log("Logged into discord: ", success)
}).catch((err) => {
    console.log("Error in logging into discord : ", err)
})


async function sendMessageToChannel(channelId, message) {
    if (client.isReady()) {
        try {
            let channel = await client.channels.fetch(channelId)
            channel.send(message)
        }
        catch (err) {
            console.log("error in fetching channel : ", err)
        }
    }
    else {
        console.log("Discord Client not ready yet!")
    }
}

module.exports = { sendMessageToChannel }









