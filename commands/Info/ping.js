module.exports = {
  name: "ping",
  description: "Returns Client's Latency",
  run: async (client, interaction) => {
    return client.embeds.normal(
      interaction,
      "Latency",
      `${client.ws.ping}'ms 🏓`
    );
  },
};
