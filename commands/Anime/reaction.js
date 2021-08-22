const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "reaction",
  description: "Anime Based Gif ReActions",
  options: [
    {
      type: "STRING",
      name: "category",
      description: "which reaction do you want",
      required: true,
      choices: [
        {
          name: "cry",
          value: "cry",
        },
        {
          name: "blush",
          value: "blush",
        },
        {
          name: "smug",
          value: "smug",
        },
        {
          name: "smile",
          value: "smile",
        },
        {
          name: "wave",
          value: "wave",
        },
        {
          name: "happy",
          value: "happy",
        },
        {
          name: "dance",
          value: "dance",
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    let action = interaction.options.getString("category");

    let desc;

    if (action === "cry") {
      desc = `${interaction.user.tag} Is Crying`;
    } else if (action === "blush") {
      desc = `${interaction.user.tag} Is Blushing`;
    } else if (action === "smug") {
      desc = `${interaction.user.tag} Smug's`;
    } else if (action === "smile") {
      desc = `${interaction.user.tag} Is Smiling`;
    } else if (action === "wave") {
      desc = `${interaction.user.tag} Waving`;
    } else if (action === "happy") {
      desc = `${interaction.user.tag} Is Happy`;
    } else if (action === "dance") {
      desc = `${interaction.user.tag} Is Dancing`;
    } else {
      desc = `${interaction.user.tag}`;
    }
    let url = await client.images.get(`${action}`);

    let embed = new MessageEmbed()
      .setTitle(`${desc}`)
      .setColor(client.color(interaction))
      .setImage(`${url}`)
      .setTimestamp();

    return interaction.followUp({ embeds: [embed] });
  },
};
