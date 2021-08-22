let query = `query ($search: String, $status: MediaStatus) {
  Media(type: ANIME, status: $status, search: $search) {
    title {
      romaji
      english
      native
    }
    episodes
    nextAiringEpisode {
      episode
      timeUntilAiring
    }
    coverImage {
      large
      medium
    }
  }
}
    `;
module.exports = { query };
