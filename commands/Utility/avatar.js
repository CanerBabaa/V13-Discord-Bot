const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Shows Avatar Of The Mentioned Or Member",
  options: [
    {
      type: "USER",
      name: "mention",
      description: "The User You Want To View Avatar Of",
      required: false,
    },
  ],
  run: async (client, interaction) => {
    let member = interaction.options.getMember("mention");
    if (!member)
      member = interaction.guild.members.cache.get(interaction.user.id);
    const png = avatar(member, "png");
    const webp = avatar(member, "webp");
    const jpg = avatar(member, "jpg");
    const gif = avatar(member, "gif");

    const embed = new MessageEmbed()
      .setColor(client.color(interaction))
      .setTitle(`${member.user.username}'s Avatar`);

    const format = member.user
      .displayAvatarURL({ dynamic: true })
      .substr(member.user.displayAvatarURL({ dynamic: true }).length - 3);

    if (!member.user.displayAvatarURL()) {
      return client.embeds.error(interaction, "User Does Not Have An Avatar");
    } else if (format == "gif") {
      embed.setDescription(
        `[Gif](${gif}) | [Png](${png}) | [Webp](${webp}) | [Jpg](${jpg})`
      );

      embed.setImage(
        member.user.displayAvatarURL({ format: "gif", size: 1024 })
      );
    } else {
      embed.setDescription(`[Png](${png}) | [Webp](${webp}) | [Jpg](${jpg})`);

      embed.setImage(
        member.user.displayAvatarURL({ format: "png", size: 1024 })
      );
    }

    return await interaction.followUp({ embeds: [embed] });
  },
};

function avatar(member, format) {
  return member.user.displayAvatarURL({
    dynamic: true,
    size: 1024,
    format,
  });
}
