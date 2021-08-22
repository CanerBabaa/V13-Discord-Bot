const { duration } = require("moment");
require("moment-duration-format");
let { query } = require("../../Assets/Queries/NextAiringDate");

module.exports = {
  name: "next",
  description: "Search An Airing Anime's Next Episode Time Until Airing",
  options: [
    {
      type: "STRING",
      name: "anime",
      description:
        "The Anime You Want To View Next Airing Episode Time Until Airing",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let search = interaction.options.getString("anime");

    const variables = { search, status: "RELEASING" };

    let { data } = await client.anilist.fetch(query, variables);

    if (!data.Media || !data.Media.nextAiringEpisode)
      return client.embeds.error(interaction, "Couldn't Find That Anime");

    return client.embeds.normal(
      interaction,
      `Episode ${data.Media.nextAiringEpisode.episode} Of ${data.Media.title.english} Airs In`,
      `${duration(
        data.Media.nextAiringEpisode.timeUntilAiring,
        "seconds"
      ).format("D [days] H [hours and] m [minutes]")}`
    );
  },
};
