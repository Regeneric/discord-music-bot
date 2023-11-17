import {DisTube} from "distube";
import Discord  from "discord.js";
import {YtDlpPlugin} from "@distube/yt-dlp";
import dotenv from "dotenv"; dotenv.config(); 

import * as config from "./config.json" assert {type: "json"}; 

import * as join from "./commands/join.js";
import * as play from "./commands/play.js";
import * as queue from "./commands/queue.js";
import * as skip  from "./commands/skip.js";

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.MessageContent
    ]
});

client.config = config;
client.distube = new DisTube(client, {
    leaveOnStop: false, 
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false, 
    plugins: [
        new YtDlpPlugin()
    ]
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;

const handleInteraction = async interaction => {
    if(!interaction.isCommand()) return;

    switch(interaction.commandName) {
        case "join":   await join.execute(client, interaction);   break;
        case "play":   await play.execute(client, interaction);   break;
        case "skip":   await skip.execute(client, interaction);   break;
        case "leave":  await leave.execute(client, interaction);  break;
        case "pause":  await pause.execute(client, interaction);  break;
        case "queue":  await queue.execute(client, interaction);  break;
        case "resume": await resume.execute(client, interaction); break;
    }
}

client.once(Discord.Events.ClientReady, () => {
    console.log(`${client.user.tag} is ready to play music.`)
});
client.login(process.env.TOKEN);

client.on(Discord.Events.InteractionCreate, handleInteraction);