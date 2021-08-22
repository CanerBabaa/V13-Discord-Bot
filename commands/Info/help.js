const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Help Menu And Info On Specific Command",
  options: [
    {
      type: "STRING",
      name: "command",
      description: "Command You Want Info On",
      required: false,
    },
  ],
  run: async (client, interaction) => {
    let slash = "/";
    if (!interaction.options.getString("command")) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir.toLowerCase() !== "owner") {
          const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
            file.endsWith(".js")
          );

          const cmds = commands.map((command) => {
            let file = require(`../../commands/${dir}/${command}`);
            if (!file.name) return "No command name.";
            let name = file.name.replace(".js", "");
            return `\`${slash}${name}\``;
          });

          let data = new Object();

          data = {
            name:
              "<:arrow:853981627683045426> | " +
              dir.toUpperCase() +
              " | " +
              cmds.length,
            value: cmds.length === 0 ? "In progress." : cmds.join(", "),
          };
          categories.push(data);
        }
      });

      const embed = new MessageEmbed()
        .setTitle(client.user.username)
        .setDescription(
          `Need More Help? Use ${slash}help <command> For More Info\nSupport | [Click Me](https://discord.gg/FZaNTZvgWN)`
        )
        .addFields(categories)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setColor(client.color(interaction));

      return interaction.followUp({ embeds: [embed] });
    } else {
      const command = client.commands.get(
        interaction.options.getString("command")
      );

      if (!command)
        return client.embeds.error(
          interaction,
          "No Command With That Name Found"
        );

      const embed = new MessageEmbed()
        .setTitle("Command Details")
        .addField("Slash", `\`${slash}\``)
        .addField(
          "Command",
          command.name ? `\`${command.name}\`` : "No Name For This Command"
        )
        .addField(
          "Usage",
          command.usage
            ? `\`${slash}${command.name} ${command.usage}\``
            : `\`${slash}${command.name}\``
        )
        .addField(
          "Description ",
          command.description
            ? `\`\`\`${command.description}\`\`\``
            : "```No Description For This Command```"
        )
        .addField(
          "Permission's (Me)",
          `\`\`\`${
            command.botPermission ? command.botPermission + ", " : ""
          }EMBED_LINKS, SEND_MESSAGES\`\`\``
        )
        .addField(
          "Permission's (You)",
          `\`\`\`${
            command.authorPermission ? command.authorPermission : "None "
          }\`\`\``
        )
        .setTimestamp()
        .setColor(client.color(interaction));
      return interaction.followUp({ embeds: [embed] });
    }
  },
};
