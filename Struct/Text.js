module.exports = class Text {
  constructor(client) {
    this.client = client;
  }

  textTruncate(str = "", length = 100, end = "...") {
    return (
      String(str).substring(0, length - end.length) +
      (str.length > length ? end : "")
    );
  }

  truncate(...options) {
    return this.client.text.textTruncate(...options);
  }

  propercase([first, ...rest], lowerRest = false) {
    return (
      first.toUpperCase() +
      (lowerRest ? rest.join("").toLowerCase() : rest.join(""))
    );
  }

  joinArrayAndLimit(array = [], limit = 1000, connector = "\n") {
    return array.reduce(
      (a, c, i, x) =>
        a.text.length + String(c).length > limit
          ? { text: a.text, excess: a.excess + 1 }
          : {
              text: a.text + (!!i ? connector : "") + String(c),
              excess: a.excess,
            },
      { text: "", excess: 0 }
    );
  }

  clean(text) {
    return String(text)
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);
  }

  ordinalize(n = 0) {
    return (
      Number(n) + [, "st", "nd", "rd"][(n / 10) % 10 ^ 1 && n % 10] ||
      Number(n) + "th"
    );
  }

  joinArray(array = []) {
    return array.map((x) => String(x));
  }
};
