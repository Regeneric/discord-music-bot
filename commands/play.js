import {SlashCommandBuilder} from "discord.js";
import {EmbedBuilder} from 'discord.js';
import DisTube from "distube";

export const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play music from YT")
    .addSubcommand(subcommand => subcommand
        .setName("song")
        .setDescription("Play a song")
        .addStringOption(option => option
            .setName("query")
            .setDescription("Song URL or search query")
            .setRequired(true)))

export const execute = async (client, interaction) => {
    if(!interaction.member.voice.channel) {
        await interaction.reply("You must be in a voice channel to use this command.");
        return;
    }

    let embed = new EmbedBuilder();
    if(interaction.options.getSubcommand() === "song") {
        let url = interaction.options.getString("query");
        if(!url) return interaction.reply(`Please enter a song URL or query to search.`);

        const voiceChannel = interaction.member.voice.channel;
        if(client.distube.voices.isDisconnected) {
            client.distube.voices.join(voiceChannel);
        } 

        try {
            await client.distube.play(interaction.member.voice.channel, url, {
                member: interaction.member,
                textChannel: interaction.channel, 
                interaction
            });
        } catch(e) {
            interaction.reply(e);
        }

        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply("Queue is empty.");
        const song = queue.songs[queue.songs.length-1];

        embed
            .setDescription(`Added **[${song.name}](${song.url})** to the queue.`)
            .setThumbnail(song.thumbnail)
            .setFooter({text: `Duration: ${song.formattedDuration}`});
        return await interaction.reply({embeds: [embed]});
    }
}