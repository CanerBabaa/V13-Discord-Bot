const fetch = require("node-fetch");

module.exports = {
  name: "animalfact",
  description: "Shows Random Animal Fact Based On Your Choice Of Animal",
  options: [
    {
      type: "STRING",
      name: "animal",
      description: "Animal You Want Fact On",
      required: true,
      choices: [
        {
          name: "dog",
          value: "dog",
        },
        {
          name: "cat",
          value: "cat",
        },
        {
          name: "panda",
          value: "panda",
        },
        {
          name: "fox",
          value: "fox",
        },
        {
          name: "bird",
          value: "bird",
        },
        {
          name: "koala",
          value: "koala",
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    let animal = interaction.options.getString("animal");

    const data = await fetch(`https://some-random-api.ml/facts/${animal}`)
      .then((res) => res.json())
      .catch(() => null);

    if (!data) return client.embeds.error(interaction, "Api Currently Down");

    return client.embeds.normal(interaction, `${animal} Fact`, data.fact);
  },
};
