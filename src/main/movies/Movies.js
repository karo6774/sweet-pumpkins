import React, {useState, useEffect} from "react";
import "./Movies.css";
import MovieListItem from "./MovieListItem";
import Button from "../Button";

const apiRoot = "https://api.themoviedb.org/3";

const assembleQuery = (filters, page) =>
    `&page=${page}` + filters;

const assembleDiscoverUrl = query =>
    `${apiRoot}/discover/movie` +
    `?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
    `&language=en-US` +
    `&sort_by=popularity.desc` +
    `&include_adult=false` +
    `&include_video=false` +
    query;

const Movies = ({filters, page, onNavigation}) => {
    const [pages, setPages] = useState(1);
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    function loadMovies() {
        setMovies([]);
        const url = assembleDiscoverUrl(query);

        fetch(url)
            .then(async r => {
                const data = await r.json();
                const movies = data.results.map(result => {
                    const {vote_count, id, genre_ids, poster_path, title, vote_average, release_date} = result;
                    return {vote_count, id, genre_ids, poster_path, title, vote_average, release_date};
                });
                setPages(data.total_pages);
                setMovies(movies);
            })
            .catch(console.error);
    }

    function setClampedPage(page) {
        if (page < 1) {
            page = 1;
        } else if (page > pages) {
            page = pages;
        }
        onNavigation(page);
    }

    // load movies when query changes
    useEffect(() => {
        loadMovies();
    }, [query]);
    // update query when filters or page changes
    useEffect(() => {
        setQuery(assembleQuery(filters, page));
    }, [page, filters]);

    return (
        <section>
            <ul className="movies">
                {
                    movies.map(it =>
                        <MovieListItem movie={it} key={it.id}/>
                    )
                }
            </ul>
            <div className="pagination">
                <Button onClick={() => setClampedPage(page - 1)}>Previous</Button>
                <span>Page {page}</span>
                <Button onClick={() => setClampedPage(page + 1)}>Next</Button>
            </div>
        </section>
    );
};
export default Movies;
