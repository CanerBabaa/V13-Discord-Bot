const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const permissions = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS",
];

module.exports = {
  name: "roleinfo",
  description: "Shows Info Of The Role You Mentioned",
  options: [
    {
      type: "ROLE",
      name: "role",
      description: "Role You Want Info On",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let role = interaction.options.getRole("role");

    const rolePermissions = role.permissions.toArray();
    const finalPermissions = [];

    for (const permission in permissions) {
      if (role.permissions.has(permission)) {
        finalPermissions.push(`✔️ ${permissions[permission]}`);
      } else {
        finalPermissions.push(`❌ ${permissions[permission]}`);
      }
    }
    const position = `\`${
      interaction.guild.roles.cache.size - role.position
    }\`/\`${interaction.guild.roles.cache.size}\``;

    const embed = new MessageEmbed()
      .setTitle(`Role Info`)
      .setColor(`${role.hexColor}`)
      .addField("Name", `${role.toString()}`, true)
      .addField("ID", `\`${role.id}\``, true)
      .addField("Position", `${position}`, true)
      .addField("Mentionable", `${role.mentionable ? "Yes" : "No"}`, true)
      .addField("Bot Role", `${role.managed ? "Yes" : "No"}`, true)
      .addField("Visible", `${role.hoist ? "Yes" : "No"}`, true)
      .addField("Color", `\`${role.hexColor.toUpperCase()}\``, true)
      .addField(
        "Creation Date",
        `\`${moment(role.createdAt).format("DD/MMM/YYYY")}\``,
        true
      )
      .addField(
        "Permissions",
        `\`\`\`diff\n${finalPermissions.join("\n")}\`\`\``
      );

    interaction.followUp({ embeds: [embed] });
  },
};
