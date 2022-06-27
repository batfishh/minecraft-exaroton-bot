# Minecraft Exaroton Bot 

This NodeJS app can be used to monitor an exaroton minecraft server. Currently supports features like sending a message to a discord channel whenever the server starts , or when a player joins.


# Setup

 - pre-requisites - NodeJS
 - Clone repository
 - Create .env in root folder - keys mentioned below in the readme
 - `npm install`
 - `npm start`



## Environment Variables
Create a ".env" file with the keys given below : 

    DISCORD_TOKEN=<this is your bots discord token>
    DISCORD_GUILD_ID=<the server/guild ID where your bot is>
    DISCORD_CHANNEL_ID=<the channel ID, where the bot can send messages>
    
    EXAROTON_TOKEN=<exaroton API token, can be fetched from user settings page>
    EXAROTON_SERVERID=<serverID of your minecraft server, read exaroton API docs for more details>


Useful references: 
 - https://discord.js.org/#/docs/discord.js/main/general/welcome
 - https://support.exaroton.com/hc/en-us/articles/360019857878-Using-the-exaroton-API