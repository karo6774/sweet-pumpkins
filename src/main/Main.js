import React, {useState, useEffect} from "react";
import "./Main.css";
import Navigation from "./navigation/Navigation";
import Movies from "./movies/Movies";

const apiRoot = "https://api.themoviedb.org/3";
const genresUrl = `${apiRoot}/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

function assembleFilters(filters) {
    let query = "";
    const {genre, year, rating, runtime} = filters;
    if (genre >= 0) {
        query += `&with_genres=${genre}`
    }
    query +=
        `&primary_release_date.gte=${year.value.min}-01-01` +
        `&primary_release_date.lte=${year.value.max}-12-31` +
        `&vote_average.gte=${rating.value.min}` +
        `&vote_average.lte=${rating.value.max}` +
        `&with_runtime.gte=${runtime.value.min}` +
        `&with_runtime.lte=${runtime.value.max}`;
    return query;
}

const setStorage = (name, value) => localStorage.setItem(name, JSON.stringify(value));

function getStorage(name) {
    let value = localStorage.getItem(name);
    if (value !== null) {
        value = JSON.parse(value);
    }
    return value;
}

function getStorageOr(name, def) {
    let value = getStorage(name);
    if (value === null) {
        value = def;
    }
    return value;
}

const Main = () => {
    const [filters, setFilters] = useState(getStorageOr("sweet-pumpkins.filters", {
        genre: -1,
        year: {
            min: 1990,
            max: 2019,
            step: 1,
            value: {min: 2000, max: 2019}
        },
        rating: {
            min: 0,
            max: 10,
            step: 1,
            value: {min: 8, max: 10}
        },
        runtime: {
            min: 0,
            max: 300,
            step: 15,
            value: {min: 60, max: 120}
        }
    }));
    const [filtersQuery, setFiltersQuery] = useState(assembleFilters(filters));
    const [genres, setGenres] = useState([{id: -1, name: "All"}]);
    const [page, setPage] = useState(getStorageOr("sweet-pumpkins.page", 1));

    // save state to local storage
    useEffect(() => {
        setStorage("sweet-pumpkins.filters", filters);
        setStorage("sweet-pumpkins.page", page);
    }, [filtersQuery, page]);
    // fetch genres
    useEffect(() => {
        (async () => {
            const r = await fetch(genresUrl);
            const data = await r.json();
            setGenres(genres.concat(data.genres));
        })();
    }, []);
    // scroll to top when page changes
    useEffect(() => window.scrollTo({top: 0}), [page]);

    return (
        <section className="main">
            <Navigation
                filters={filters}
                genres={genres}
                onSearch={() => setFiltersQuery(assembleFilters(filters))}
                onFiltersChanged={setFilters}/>
            <Movies filters={filtersQuery} page={page} onNavigation={setPage}/>
        </section>
    );
};
export default Main;
