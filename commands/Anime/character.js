const { MessageEmbed } = require("discord.js");
const { query } = require("../../Assets/Queries/Character");

module.exports = {
  name: "character",
  description: "Search Info About A Character On Anilist",
  options: [
    {
      type: "STRING",
      name: "character",
      description: "Character You Want Info On",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let search = interaction.options.getString("character");

    let variables = { search: search };

    let { data } = await client.anilist.fetch(query, variables);

    if (!data.Character)
      return client.embeds.error(interaction, "Couldn't Find That Character");

    let embed = new MessageEmbed()
      .setTitle(data.Character.name.first + " " + data.Character.name.last)
      .setURL(data.Character.siteUrl)
      .setThumbnail(data.Character.image.large)
      .setImage(data.Character.image.large)
      .setColor(client.color(interaction))
      .setDescription(data.Character.description.substring(0, 1000));

    return interaction.followUp({ embeds: [embed] });
  },
};
