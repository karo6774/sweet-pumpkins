const apiRoot = "https://api.themoviedb.org/3";
const defaultParams = {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: "en-US"
};

/** Serializes the given query to a string with the defaultParams prepended */
function assembleDefaultQuery(query) {
    const merged = Object.assign({...defaultParams}, query);
    return new URLSearchParams(merged).toString();
}

function assembleApiUrl(path, query) {
    return new URL(`3${path}?${assembleDefaultQuery(query)}`, apiRoot).toString();
}

function fetchPath(path, query) {
    return fetch(assembleApiUrl(path, query));
}

export async function listMovies(query) {
    const response = await fetchPath("/discover/movie", query);
    const data = await response.json();
    return {
        movies: data['results'].map(result => {
            const {vote_count, id, genre_ids, poster_path, title, vote_average, release_date} = result;
            return {vote_count, id, genre_ids, poster_path, title, vote_average, release_date};
        }),
        totalPages: data['total_pages']
    };
}
