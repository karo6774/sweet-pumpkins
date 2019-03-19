import React from "react";
import "./Selection.css";

const Selection = ({children, selected, values, onChanged}) =>
    (
        <div className="selection">
            <label>{children}</label>
            <select value={selected} onChange={event => onChanged(event.target.value)}>
                {
                    values.map(({display, value}) => (
                        <option value={value} key={value}>{display}</option>
                    ))
                }
            </select>
        </div>
    );
export default Selection;
