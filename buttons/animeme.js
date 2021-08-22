const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "animeme",
  run: async (client, interaction) => {
    const Reds = ["Animemes"];

    const Rads = Reds[Math.floor(Math.random() * Reds.length)];

    const res = await fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

    const json = await res.json();

    if (!json[0])
      return client.embeds.error(
        interaction,
        `An Error Occurred While Looking For A Meme`
      );

    const data = json[0].data.children[0].data;

    const embed = new MessageEmbed()
      .setColor(client.color(interaction))
      .setURL(`https://reddit.com${data.permalink}`)
      .setTitle(data.title)
      .setImage(data.url)
      .setFooter(
        `${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${
          data.num_comments || 0
        } 💬`
      )
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("animeme")
        .setLabel("New Anime Meme")
        .setStyle("PRIMARY")
    );

    return interaction.update({ embeds: [embed], components: [row] });
  },
};
