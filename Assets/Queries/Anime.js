let query = `query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
        id
        siteUrl
        title {
            romaji
            english
            native
        }
        coverImage {
            large
            medium
        }
        status(version:2)
        description
        genres
        popularity
        averageScore
        episodes
    }
}`;

module.exports = { query };
