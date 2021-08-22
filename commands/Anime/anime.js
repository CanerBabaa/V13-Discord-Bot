const { MessageEmbed } = require("discord.js");
const { query } = require("../../Assets/Queries/Anime");

module.exports = {
  name: "anime",
  description: "Search An Anime On Anilist",
  options: [
    {
      type: "STRING",
      name: "anime",
      description: "Anime Query",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let search = interaction.options.getString("anime");

    let variables = { search: search, type: "ANIME" };

    let { data } = await client.anilist.fetch(query, variables);

    if (!data.Media)
      return client.embeds.error(interaction, "Could Not Find That Anime");

    let embed = new MessageEmbed()
      .setTitle(`${data.Media.title.english}`)
      .setURL(`${data.Media.siteUrl}`)
      .setColor(client.color(interaction))
      .setDescription(`${data.Media.description.substring(0, 1000)}`)
      .setThumbnail(`${data.Media.coverImage.large}`)
      .setImage(`${data.Media.coverImage.large}`)
      .addField("Rating", `${data.Media.averageScore}` + "%")
      .addField("Episodes", `${data.Media.episodes}`)
      .addField("Genres", `${data.Media.genres}`)
      .addField(
        "Status",
        `${(client.text.propercase(data.Media.status), true)}`
      )
      .setTimestamp();

    return interaction.followUp({ embeds: [embed] });
  },
};
