import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./Slider.css";

export default class Slider extends React.Component {
    onChange = range => {
        this.props.onChange(range);
    };

    render() {
        const {min, max, step, value} = this.props.data;
        return (
            <div className="slider">
                <label>{this.props.children}</label>
                <InputRange
                    minValue={min}
                    maxValue={max}
                    step={step}
                    onChange={this.onChange}
                    value={value}
                />
            </div>
        )
    }
}
