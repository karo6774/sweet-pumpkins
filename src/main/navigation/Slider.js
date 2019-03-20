import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "./Slider.css";

const Slider = ({children, onChange, data: {min, max, step, value}}) => {
    return (
        <div className="slider">
            <label>{children}</label>
            <InputRange
                minValue={min}
                maxValue={max}
                step={step}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};
export default Slider;
