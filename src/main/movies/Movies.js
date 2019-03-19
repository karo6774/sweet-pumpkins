import React, {useState, useEffect} from "react";
import "./Movies.css";
import MovieListItem from "./MovieListItem";
import Button from "../Button";

const apiRoot = "https://api.themoviedb.org/3";

function assembleQuery(filters, page) {
    return `&page=${page}` + filters;
}

const Movies = ({filters}) => {
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    function loadMovies(q) {
        setMovies([]);
        const url =
            `${apiRoot}/discover/movie` +
            `?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
            `&language=en-US` +
            `&sort_by=popularity.desc` +
            `&include_adult=false` +
            `&include_video=false` +
            q;
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
        setPage(page);
    }

    useEffect(() => {
        const newQuery = assembleQuery(filters, page);
        if (query !== newQuery) {
            setQuery(newQuery);
            loadMovies(newQuery);
        }
    });

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
