import React, {Component} from "react";
import "./Main.css";
import Navigation from "./navigation/Navigation";
import Movies from "./movies/Movies";

const apiRoot = "https://api.themoviedb.org/3";
const genresUrl = `${apiRoot}/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;

export default class Main extends Component {
    state = (() => {
        const filters = {
            genre: -1,
            genres: [{id: -1, name: "All"}],
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
        };
        const filtersQuery = Main.assembleFilters(filters);
        return {filters, filtersQuery};
    })();

    static assembleFilters(filters) {
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

    componentDidMount() {
        fetch(genresUrl)
            .then(async r => {
                const data = await r.json();
                this.setState({
                    filters: {
                        ...this.state.filters,
                        genres: this.state.filters.genres.concat(data.genres)
                    }
                });
            })
    }

    onSearch = () => {
        this.setState({filtersQuery: Main.assembleFilters(this.state.filters)});
    };

    onFiltersChanged = filters => {
        this.setState({filters});
    };

    render() {
        return (
            <section className="main">
                <Navigation
                    filters={this.state.filters}
                    onSearch={this.onSearch}
                    onFiltersChanged={this.onFiltersChanged}/>
                <Movies filters={this.state.filtersQuery}/>
            </section>
        );
    }
}
