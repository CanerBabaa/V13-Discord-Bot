const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Generates Invite Link For The Bot",
  run: async (client, interaction) => {
    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=877499878891200522&permissions=8&scope=bot%20applications.commands"
        )
        .setLabel("Invite Me")
        .setStyle("LINK")
    );
    interaction.followUp({ content: "My Invite Link", components: [row] });
  },
};
