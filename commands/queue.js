import {ChannelType, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {joinVoiceChannel} from "@discordjs/voice"; 

export const data = new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show music queue")

export const execute = async (client, interaction) => {
    
    const queue = client.distube.getQueue(interaction);
    if(!queue) return interaction.reply("Queue is empty.");
    
    let embed = new EmbedBuilder();
    const q = queue.songs
        .map((song, i) => `${i === 0 ? '**Playing:**' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n');

    interaction.reply(q);
}