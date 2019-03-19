import React from "react";
import MovieListItem from "./main/movies/MovieListItem";

export default ({titles}) =>
    <ul>
        {
            titles.map((it, i) =>
                <MovieListItem title={it} key={`${i}`}/>
            )
        }
    </ul>;

/*export default class MovieList extends Component {
    titles;

    render() {
        return <ul>
            {
                this.props.titles.map((it, i) =>
                    <MovieListItem title={it} key={`${i}`}/>
                )
            }
        </ul>
    }
}*/
