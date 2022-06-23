require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({ intents: [["GUILDS", "GUILD_MESSAGES"]] });

client.on("ready", () => {
  console.log(`Discord client ready :  ${client.user.tag}!`);
  client.user.setActivity("_mcHelp", { type: 'PLAYING' });
});

client.on("messageCreate", async (msg) => {
  if (msg.content.match(/_mcHelp/g)) {
    msg.reply(
      "I don't do anything other than inform you when someone joins the minecraft server :)"
    );
  }
});


client
  .login(process.env.DISCORD_TOKEN)
  .then((success) => {
    console.log("Logged into discord: ", success);
  })
  .catch((err) => {
    console.log("Error in logging into discord : ", err);
  });

async function sendMessageToChannel(channelId, message) {
  if (client.isReady()) {
    try {
      let channel = await client.channels.fetch(channelId);
      channel.send(message);
    } catch (err) {
      console.log("error in fetching channel : ", err);
    }
  } else {
    console.log("Discord Client not ready yet!");
  }
}

module.exports = { sendMessageToChannel };
