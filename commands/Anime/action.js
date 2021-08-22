const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "action",
  description: "Anime Based Gif Actions",
  options: [
    {
      type: "STRING",
      name: "category",
      description: "which action do you want",
      required: true,
      choices: [
        {
          name: "cuddle",
          value: "cuddle",
        },
        {
          name: "hug",
          value: "hug",
        },
        {
          name: "kiss",
          value: "kiss",
        },
        {
          name: "poke",
          value: "poke",
        },
        {
          name: "kill",
          value: "kill",
        },
        {
          name: "slap",
          value: "slap",
        },
        {
          name: "bite",
          value: "bite",
        },
        {
          name: "highfive",
          value: "highfive",
        },
        {
          name: "pat",
          value: "pat",
        },
        {
          name: "bonk",
          value: "bonk",
        },
        {
          name: "kick",
          value: "kick",
        },
      ],
    },
    {
      type: "USER",
      name: "mention",
      description: "Member You Want To Run The Action On",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let action = interaction.options.getString("category");
    let member = interaction.options.getMember("mention");

    if (
      member.user.id === client.user.id &&
      !client.config.owners.includes(interaction.user.id)
    )
      return client.embeds.error(
        interaction,
        "Only My Dev Can Use This Command On Me (◠‿◕)"
      );

    let desc;

    if (action === "cuddle") {
      desc = `${interaction.user.tag} Cuddles ${member.user.tag}`;
    } else if (action === "hug") {
      desc = `${interaction.user.tag} Hugs ${member.user.tag}`;
    } else if (action === "kiss") {
      desc = `${interaction.user.tag} Kissed ${member.user.tag}`;
    } else if (action === "poke") {
      desc = `${interaction.user.tag} Pokes ${member.user.tag}`;
    } else if (action === "kill") {
      desc = `${interaction.user.tag} Killed ${member.user.tag}`;
    } else if (action === "slap") {
      desc = `${interaction.user.tag} Slaps ${member.user.tag}`;
    } else if (action === "bonk") {
      desc = `${interaction.user.tag} Bonks ${member.user.tag}`;
    } else if (action === "kick") {
      desc = `${interaction.user.tag} Kicked ${member.user.tag}`;
    } else if (action === "pat") {
      desc = `${interaction.user.tag} Pats ${member.user.tag}`;
    } else if (action === "highfive") {
      desc = `${interaction.user.tag} Gave highfive To ${member.user.tag}`;
    } else if (action === "bite") {
      desc = `${interaction.user.tag} Bites ${member.user.tag}`;
    } else {
      desc = `${interaction.user.tag} | ${member.user.tag}`;
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
