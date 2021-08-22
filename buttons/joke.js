const fetch = require("node-fetch");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "joke",
  run: async (client, interaction) => {
    let joke = await fetch(
      "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );
    joke = await joke.json();

    let embed = new MessageEmbed()
      .setColor(client.color(interaction))
      .addField("Question", `${joke.setup}`)
      .addField("Answer", `${joke.delivery}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp();

    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("joke")
        .setLabel("New Random Joke")
        .setStyle("PRIMARY")
    );

    interaction.update({ embeds: [embed], components: [row] });
  },
};
