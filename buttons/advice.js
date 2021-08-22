const fetch = require("node-fetch");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "advice",
  run: async (client, interaction) => {
    let Advice = await fetch("https://api.adviceslip.com/advice");
    Advice = await Advice.json();

    let embed = new MessageEmbed()
      .setColor(client.color(interaction))
      .setTitle("Random Advice")
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setDescription(`${Advice.slip.advice}`)
      .setTimestamp();

    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("advice")
        .setLabel("New Random Advice")
        .setStyle("PRIMARY")
    );

    return interaction.update({ embeds: [embed], components: [row] });
  },
};
