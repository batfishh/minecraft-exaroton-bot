const { Client } = require("exaroton");
require("dotenv").config();

const { sendMessageToChannel } = require("./discord-client/discord-client");
let token = process.env.EXAROTON_TOKEN;
let serverId = process.env.EXAROTON_SERVERID;

const client = new Client(token);

async function monitorServer() {
  let server = client.server(serverId);
  server.subscribe(["console", "status"]);
  server.on("console:line", function (data) {
    // Log entry if a new player joins

    if (data.line.match(/joined the game/g)) {
      const log = data.line;
      let startIndex = data?.line.indexOf(`]: `);
      let endIndex = data?.line.indexOf(`joined`);
      const playerName = log.substring(startIndex + 2, endIndex - 1);
      sendMessageToChannel(
        process.env.DISCORD_CHANNEL_ID,
        `${playerName} has joined and is now playing!`
      );
    }

    // Log entry if chat message is entered
    // Example command : !save -> saves the message to discord channel and pins it(useful for saving coordinates etc.)
    if (data.line.match(/<.*>/g)) {
      if (data.line.indexOf("!save") >= 0) {
        const EntitySaved = data.line.substring(data.line.indexOf("!save") + 5);
        sendMessageToChannel(
          process.env.DISCORD_CHANNEL_ID,
          `Message saved  : ${EntitySaved}`
        )
          .then((msg) => msg.pin())
          .catch((err) => {
            console.log("Error : pinning message");
          });
      }
    }
  });

  //Monitor Start and Stop

  server.on("status", (server) => {
    switch (server.status) {
      case 2:
        sendMessageToChannel(
          process.env.DISCORD_CHANNEL_ID,
          `Server is starting! Join now!`
        );
        break;
      case 3:
        sendMessageToChannel(
          process.env.DISCORD_CHANNEL_ID,
          `Server Stopping :( See y'all later!`
        );
        break;
    }
  });
}

//Start the monitoring after a 3 second delay to wait for discord to connect.
setTimeout(() => {
  monitorServer();
}, 3000);
