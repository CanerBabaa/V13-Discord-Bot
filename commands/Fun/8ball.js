const fetch = require("node-fetch");
const Badwords = require("bad-words");
const badWords = new Badwords();

module.exports = {
  name: "8ball",
  description: "Ask Me Anything",
  options: [
    {
      type: "STRING",
      name: "question",
      description: "Your Question",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let text = interaction.options.getString("question");

    if (badWords.isProfane(text))
      return client.embeds.error(
        interaction,
        "Baka! I Don't Reply To Useless Questions"
      );

    let answer = await fetch(`https://nekos.life/api/v2/8ball?text=${text}`);
    let Response = await answer.json();
    if (!answer || !Response)
      return client.embeds.error(interaction, "Error Occurred While Answering");

    return client.embeds.normal(interaction, "Answer", `${Response.response}`);
  },
};
