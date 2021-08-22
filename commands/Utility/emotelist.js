const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emotelist",
  description: "Shows All The Emotes In The Server",
  run: async (client, interaction) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    interaction.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let embed = new MessageEmbed()
      .setTitle(
        `Emojis in ${interaction.guild.name} | Emojis [${OverallEmojis}] `
      )
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Non Animated [${EmojiCount}]**:\n${Emojis}`
      )
      .setColor(client.color(interaction));

    if (embed.length > 2000) {
      return client.embeds.error(
        interaction,
        "Emote List Exceeded Embed Limit"
      );
    } else {
      interaction.followUp({ embeds: [embed] });
    }
  },
};
