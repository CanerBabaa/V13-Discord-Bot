const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "color",
  description: "Shows Info On A Color Hex",
  options: [
    {
      type: "STRING",
      name: "hex",
      description: "Hex Color You Want Info On",
      required: false,
    },
  ],
  run: async (client, interaction) => {
    let color =
      interaction.options.getString("hex") ||
      Math.floor(Math.random() * 16777215).toString(16);
    color = color.replace("#", "");

    try {
      let embed = new MessageEmbed()
        .setColor(`#${color}`)
        .setTitle(`#${color}`)
        .setImage("https://dummyimage.com/200/" + color)
        .setTimestamp();

      return interaction.followUp({ embeds: [embed] });
    } catch (e) {
      return client.embeds.error(interaction, "That Is Not A Valid Color");
    }
  },
};
