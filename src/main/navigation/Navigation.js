import React, {Component} from "react";
import "./Navigation.css";
import Selection from "./Selection";
import Slider from "./Slider";
import Button from "../Button";

export default class Navigation extends Component {
    onSearch;
    onFiltersChanged;
    filters;

    setGenre = genre => {
        this.props.onFiltersChanged({...this.props.filters, genre});
    };

    setYear = year => this.setSliderValue("year", year);
    setRating = rating => this.setSliderValue("rating", rating);
    setRuntime = runtime => this.setSliderValue("runtime", runtime);

    setSliderValue = (name, value) => {
        this.props.onFiltersChanged({
            ...this.props.filters,
            [name]: {
                ...this.props.filters[name],
                value
            }
        });
    };

    confirmSearch = () => {
        this.props.onSearch();
    };

    render() {
        return (
            <section className="navigation">
                <Selection selected={this.props.filters.genre}
                           values={this.props.filters.genres.map(it => ({display: it.name, value: it.id}))}
                           onChanged={this.setGenre}>Genre</Selection>
                <Slider data={this.props.filters.year} onChange={this.setYear}>Year</Slider>
                <Slider data={this.props.filters.rating} onChange={this.setRating}>Rating</Slider>
                <Slider data={this.props.filters.runtime} onChange={this.setRuntime}>Runtime</Slider>

                <Button onClick={this.confirmSearch}>Search</Button>
            </section>
        );
    }
}
