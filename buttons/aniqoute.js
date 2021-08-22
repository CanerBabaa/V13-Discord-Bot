const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const animeQuotes = require("animequotes");
const KITSU = require("node-kitsu");

module.exports = {
  name: "aniquote",
  run: async (client, interaction) => {
    let quote = animeQuotes.randomQuote();

    if (quote.Error) {
      quote = animeQuotes.randomQuote();
    }

    if (quote.length > 1) {
      quote = quote[Math.floor(Math.random() * (quote.length - 1))];
    }

    KITSU.searchAnime(quote.anime, 0).then((results) => {
      const finembed = new MessageEmbed()
        .setColor(client.color(interaction))
        .addField(
          `Quoted From ${quote.anime}`,
          `**"${quote.quote}"**\n\n-*${quote.name}*`
        )
        .setTimestamp();

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("aniquote")
          .setLabel("New Anime Qoute")
          .setStyle("PRIMARY")
      );

      if (!results) {
      } else if (!results[0].attributes) {
      } else if (!results[0].attributes.coverImage) {
      } else if (!results[0].attributes.coverImage.original) {
      } else finembed.setImage(results[0].attributes.coverImage.original);

      interaction.update({ embeds: [finembed], components: [row] });
    });
  },
};
