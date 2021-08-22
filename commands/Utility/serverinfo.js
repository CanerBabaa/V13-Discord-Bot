const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "serverinfo",
  description: "Shows Server Info",
  run: async (client, interaction) => {
    let realmembers = interaction.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    let bots = interaction.guild.members.cache.filter(
      (member) => member.user.bot
    ).size;
    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor(client.color(interaction))
          .setAuthor(
            `${interaction.guild.name} Server Information`,
            interaction.guild.iconURL()
          )
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
          .setTimestamp()
          .addFields([
            {
              name: "Server",
              inline: true,
              value: [
                "```",
                `Owner:\u2000${await interaction.guild.members
                  .fetch(interaction.guild.ownerId)
                  .then((x) => x.user.tag)}`,
                `Verification Level:\u2000${interaction.guild.verificationLevel}`,
                `Boost:\u2000Level ${interaction.guild.premiumTier} (${interaction.guild.premiumSubscriptionCount} Boosts)`,
                "```",
              ].join("\n"),
            },
            {
              name: "Members",
              inline: true,
              value: [
                "```",
                `Count:\u2000${interaction.guild.memberCount}`,
                `Real:\u2000${realmembers}`,
                `Bots:\u2000${bots}`,
                "```",
              ].join("\n"),
            },
            {
              name: "Roles",
              inline: true,
              value: [
                "```",
                `Count:\u2000${interaction.guild.roles.cache.size - 1}`,
                `Unused Slot:\u2000${249 - interaction.guild.roles.cache.size}`,
                `Percent Used:\u2000${(
                  (interaction.guild.roles.cache.size / 250) *
                  100
                ).toFixed(2)}%`,
                "```",
              ].join("\n"),
            },
            {
              name: "Emojis (Static)",
              inline: true,
              value: [
                "```",
                `Count:\u2000${
                  interaction.guild.emojis.cache.filter((x) => !x.animated).size
                }`,
                `Unused Slot:\u2000${
                  50 *
                    (interaction.guild.premiumTier === 3
                      ? 5
                      : interaction.guild.premiumTier + 1) -
                  interaction.guild.emojis.cache.filter((x) => !x.animated).size
                }`,
                `Percent Used:\u2000${
                  (interaction.guild.emojis.cache.filter((x) => !x.animated)
                    .size /
                    (50 *
                      (interaction.guild.premiumTier === 3
                        ? 5
                        : interaction.guild.premiumTier + 1))) *
                  100
                }%`,
                "```",
              ].join("\n"),
            },
            {
              name: "Emojis (Animated)",
              inline: true,
              value: [
                "```",
                `Count:\u2000${
                  interaction.guild.emojis.cache.filter((x) => x.animated).size
                }`,
                `Unused Slot:\u2000${
                  50 *
                    (interaction.guild.premiumTier === 3
                      ? 5
                      : interaction.guild.premiumTier + 1) -
                  interaction.guild.emojis.cache.filter((x) => x.animated).size
                }`,
                `Percent Used:\u2000${
                  (interaction.guild.emojis.cache.filter((x) => x.animated)
                    .size /
                    (50 *
                      (interaction.guild.premiumTier === 3
                        ? 5
                        : interaction.guild.premiumTier + 1))) *
                  100
                }%`,
                "```",
              ].join("\n"),
            },
            {
              name: "Channels",
              inline: true,
              value: [
                "```",
                `Count:\u2000Text(${
                  interaction.guild.channels.cache.filter(
                    (x) => x.type === "text"
                  ).size
                })\u2000Voice(${
                  interaction.guild.channels.cache.filter(
                    (x) => x.type === "voice"
                  ).size
                })\u2000Category(${
                  interaction.guild.channels.cache.filter(
                    (x) => x.type === "category"
                  ).size
                })`,
                `Unused Slot:\u2000${
                  500 - interaction.guild.channels.cache.size
                }`,
                `Percent Used:\u2000${(
                  (interaction.guild.emojis.cache.size / 500) *
                  100
                ).toFixed(2)}%`,
                "```",
              ].join("\n"),
            },
            {
              name: "Created",
              value: `\`\`\`${moment(interaction.guild.createdAt).format(
                "dddd, do MMMM YYYY"
              )}\`\`\``,
            },
          ]),
      ],
    });
  },
};
