import {ChannelType, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {joinVoiceChannel} from "@discordjs/voice"; 

export const data = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip current song")

export const execute = async (client, interaction) => {
    const queue = client.distube.getQueue(interaction)
    if(!queue) return interaction.reply(`There is nothing in the queue right now!`);

    try {
        const song = await queue.skip()
        interaction.reply(`Skipped! Now playing:\n**${song.name}**`);
    } catch(e) {
        interaction.reply(`${e}`);
    }
}