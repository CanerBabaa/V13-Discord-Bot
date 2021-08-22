const Discord = require("discord.js");

module.exports = {
  name: "emoteinfo",
  description: "Show's An Emote's Info",
  options: [
    {
      type: "STRING",
      name: "emote",
      description: "Emote You Want Info On",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let emoji = interaction.options.getString("emote");

    try {
      let customEmoji =
        Discord.Util.parseEmoji(emoji) ||
        interaction.guild.emojis.cache.find((e) => e.name === emoji);
      if (!customEmoji)
        return client.embeds.error(interaction, "Couldn't Find That Emote");

      const embed = new Discord.MessageEmbed()
        .setTitle(`Emote | ${emoji}`)
        .setColor(client.color(interaction))
        .setThumbnail(client.user.displayAvatarURL());
      if (customEmoji.id) {
        embed.setImage(
          `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
            customEmoji.animated ? "gif" : "png"
          }`
        );
        embed.addField("Emote ID", `\`\`\`${customEmoji.id}\`\`\``);
        embed.addField(
          "Animated",
          `\`\`\`${customEmoji.animated ? "Yes" : "No"}\`\`\``
        );
        embed.addField(
          "Download Link",
          `[Link To Emote](https://cdn.discordapp.com/emojis/${
            customEmoji.id
          }.${customEmoji.animated ? "gif" : "png"})`
        );
        return interaction.followUp({ embeds: [embed] });
      } else {
        return client.embeds.error(interaction, "Couldn't Fetch That Emote");
      }
    } catch (e) {
      return client.embeds.error(interaction, "That Is Not A Valid Emote");
    }
  },
};
