import {ChannelType, SlashCommandBuilder} from "discord.js";
import {joinVoiceChannel} from "@discordjs/voice"; 

export const data = new SlashCommandBuilder()
    .setName("join")
    .setDescription("Connect to a voice channel")
    .addChannelOption(option => option
        .setName("channel")
        .setDescription("Channel to join")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice));

export const execute = async (client, interaction) => {
    const voiceChannel = interaction.options.getChannel('channel');
    if(!voiceChannel) {
        return interaction.channel.send(`You must be in a voice channel!`)
    }

    client.distube.voices.join(voiceChannel);
    await interaction.reply(`Joined to channel ${voiceChannel.name}`);
}