import React from "react";
import "./MovieListItem.css";
import {Link} from "react-router-dom";

const posterRoot = "https://image.tmdb.org/t/p/w342";

const MovieListItem = ({movie}) => {
    const {id, title, vote_average: rating, poster_path, release_date: release} = movie;
    const imgUrl = `${posterRoot}/${poster_path}`;

    return (
        <li className="movie-item">
            <Link to={`/movies/${id}`} className="thumbnail">
                <img src={imgUrl} alt=""/>
                <div className="movie-description">
                    <h2>{title}</h2>
                    <section className="movie-details">
                        <div className="movie-year">
                            <span className="title">Year</span>
                            <span>{release.substr(0, 4)}</span>
                        </div>
                        <div className="movie-rating">
                            <span className="title">Rating</span>
                            <span>{rating}</span>
                        </div>
                    </section>
                </div>
            </Link>
        </li>
    );
};

export default MovieListItem;
