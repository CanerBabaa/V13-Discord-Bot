module.exports = {
  name: "interactionCreate",
  run: async (client, interaction) => {
    if (interaction.isCommand()) {
      await interaction.deferReply({ ephemeral: false });

      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return client.embeds.error(interaction, "An Error Occurred");

      cmd.run(client, interaction);
    }

    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return client.embeds.error(interaction, "An Error Occurred");

      button.run(client, interaction);
    }
  },
};
