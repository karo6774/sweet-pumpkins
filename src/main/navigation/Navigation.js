import React from "react";
import "./Navigation.css";
import Selection from "./Selection";
import Slider from "./Slider";
import Button from "../Button";

const Navigation = ({onSearch, onFiltersChanged, filters, genres}) => {
    const setYear = year => setSliderValue("year", year);
    const setRating = rating => setSliderValue("rating", rating);
    const setRuntime = runtime => setSliderValue("runtime", runtime);

    function setSliderValue(name, value) {
        onFiltersChanged({
            ...filters,
            [name]: {
                ...filters[name],
                value
            }
        });
    }

    function setGenre(genre) {
        onFiltersChanged({...filters, genre});
    }

    return (
        <section className="navigation">
            <Selection selected={filters.genre}
                       values={genres.map(it => ({display: it.name, value: it.id}))}
                       onChanged={setGenre}>Genre</Selection>
            <Slider data={filters.year} onChange={setYear}>Year</Slider>
            <Slider data={filters.rating} onChange={setRating}>Rating</Slider>
            <Slider data={filters.runtime} onChange={setRuntime}>Runtime</Slider>

            <Button onClick={() => onSearch()}>Search</Button>
        </section>
    );
};
export default Navigation;
