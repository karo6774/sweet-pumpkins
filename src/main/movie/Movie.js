import React, {useState, useEffect} from "react";
import "./Movie.css";
import LoadingMovie from "./LoadingMovie";
import {movieDetails} from "../../TMDB";

const Movie = ({match: {params: {id}}}) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        (async () => {
            setMovie(await movieDetails(id));
        })().catch(console.error);
    }, [id]);

    if (movie === null) {
        return (
            <div><LoadingMovie/></div>
        );
    } else {
        const {
            title,
            backdrop_path,
            release_date,
            genres,
            overview,
            vote_average,
            runtime
        } = movie;
        const releaseYear = release_date.substr(0, 4);
        const backgroundStyle = {
            backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${backdrop_path})`
        };
        return (
            <div className="movie-page">
                <div className="movie-image" style={backgroundStyle}/>
                <div className="movie-details">
                    <h1>
                        {title}
                        <span>({releaseYear})</span>
                    </h1>
                    <section className="genres">
                        {
                            genres.map((genre, index) => (
                                <div key={genre.id}>
                                    <span>{genre.name}</span>
                                    {
                                        index < genres.length - 1 && (
                                            <span className="separator">|</span>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </section>
                    <h5>
                        Rating:
                        <span>{vote_average}</span>
                    </h5>
                    <h5>
                        Runtime:
                        <span>{`${runtime} min`}</span>
                    </h5>
                    <h4>Overview</h4>
                    <p>{overview}</p>
                </div>
            </div>
        );
    }
};
export default Movie;
