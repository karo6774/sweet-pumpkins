import React, {useState, useEffect} from "react";
import "./Movies.css";
import MovieListItem from "./MovieListItem";
import Button from "../Button";
import {listMovies} from "../../TMDB";

const assembleQuery = (query, page) => Object.assign(
    {
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        page
    },
    query
);

const Movies = ({filters, page, onNavigation}) => {
    const [pages, setPages] = useState(1);
    const [query, setQuery] = useState({});
    const [movies, setMovies] = useState([]);

    async function loadMovies() {
        setMovies([]);

        const {movies: mov, totalPages} = await listMovies(assembleQuery(filters, page));

        setPages(totalPages);
        setMovies(mov);
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
        loadMovies().catch(console.error);
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
