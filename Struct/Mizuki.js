const { Client, version, Collection } = require("discord.js");
const { performance } = require("perf_hooks");
const Utils = require("./Utils.js");
const Anilist = require("./Anilist.js");
const Embeds = require("./Embeds.js");
const Logger = require("./Logger.js");
const Images = require("./Images");
const Text = require("./Text.js");
const { Database } = require("quickmongo");

module.exports = class Mizuki extends Client {
  constructor() {
    super({
      intents: 32767,
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.buttons = new Collection();
    this.utils = new Utils(this);
    this.anilist = new Anilist(this);
    this.embeds = new Embeds(this);
    this.logger = new Logger(this);
    this.images = new Images(this);
    this.text = new Text(this);
    this.config = require("../Assets/Json/config");
    // this.db = new Database(this.config.mongo);

    this.snipes = new Collection();
    this.esnipes = new Collection();

    this.bootTime = null;

    this.once("ready", () => {
      return (this.bootTime = Math.round(performance.now()));
    });
  }

  async init() {
    this.utils.loadCommands();
    this.utils.loadEvents();
    this.utils.loadButtons();
    super.login(this.config.token);
  }

  version() {
    let Dversion = version;
    let Cversion = require("../package.json").version;

    return { Dversion: Dversion, Cversion: Cversion };
  }

  color(interaction) {
    if (interaction.guild) {
      let color = interaction.guild.me.roles.highest.hexColor;
      if (!color || color === "#000000") color = "#9B30FF";

      return color;
    } else {
      let color = "#9B30FF";
      return color;
    }
  }
};
