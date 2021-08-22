const fetch = require("node-fetch");

module.exports = class Images {
  constructor(client) {
    this.client = client;
  }

  async get(category) {
    let res = await fetch(`https://waifu.pics/api/sfw/${category}`);
    res = await res.json();
    let image = res.url;
    return image;
  }
};
