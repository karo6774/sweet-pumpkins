import React, {Component} from "react";
import "./Movies.css";
import MovieListItem from "./MovieListItem";
import Button from "../Button";

const apiRoot = "https://api.themoviedb.org/3";

export default class Movies extends Component {
    state = {
        movies: [],
        page: 1,
        pages: 1,
        query: ""
    };

    filters;

    static assembleQuery(filters, page) {
        return `&page=${page}` + filters;
    };

    loadMovies = query => {
        this.setState({movies: []});
        const url =
            `${apiRoot}/discover/movie` +
            `?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
            `&language=en-US` +
            `&sort_by=popularity.desc` +
            `&include_adult=false` +
            `&include_video=false` +
            query;
        fetch(url)
            .then(async r => {
                const data = await r.json();
                const movies = data.results.map(result => {
                    const {vote_count, id, genre_ids, poster_path, title, vote_average, release_date} = result;
                    return {vote_count, id, genre_ids, poster_path, title, vote_average, release_date};
                });
                const pages = data.total_pages;
                this.setState({movies, pages});
            })
            .catch(console.error);
    };

    setPage = page => {
        if (page < 1) {
            page = 1;
        } else if (page > this.state.pages) {
            page = this.state.pages;
        }
        if (page !== this.state.page) {
            this.setState({page, query: Movies.assembleQuery(this.props.filters, page)});
        }
    };

    componentDidMount() {
        this.setState({query: Movies.assembleQuery(this.props.filters, this.state.page)})
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.query !== this.state.query) {
            this.loadMovies(nextState.query);
        }
        if (nextProps.filters !== this.props.filters) {
            this.setState({query: Movies.assembleQuery(nextProps.filters, this.state.page)})
        }
    }

    render() {
        return (
            <section>
                <ul className="movies">
                    {
                        this.state.movies.map(it =>
                            <MovieListItem movie={it} key={it.id}/>
                        )
                    }
                </ul>
                <div className="pagination">
                    <Button onClick={() => this.setPage(this.state.page - 1)}>Previous</Button>
                    <span>Page {this.state.page}</span>
                    <Button onClick={() => this.setPage(this.state.page + 1)}>Next</Button>
                </div>
            </section>
        )
    }
}
