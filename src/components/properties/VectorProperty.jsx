import { useState } from "react";
import PropertyLabel from "./PropertyLable";

//vector [x,y,z]

const floatFilters = (number) => {
    if (number === "") return "0.0";
    let num = String(parseFloat(number));
    if (!num.includes(".")) num += ".0";
    return num;
};

const VectorProperty = (props) => {
    const property = props.property || { name: "Bool" };
    const [vector, setVector] = useState(property.initial || ["0.0", "0.0", "0.0"]);

    const handleChange = (e) => {
        // setVector(e.target.tag);
        const tag = parseInt(e.target.getAttribute("tag"));
        const old = vector;
        old[tag] = e.target.value;
        setVector([...old]);
    };

    const handleKeyPress = (e) => {
        if (e.type === "keydown") {
            if (e.code === "Enter") {
                e.target.blur();
            }
        }
    };
    const onSubmitValue = (e) => {
        let vec = [String(floatFilters(vector[0])), String(floatFilters(vector[1])), String(floatFilters(vector[2]))];
        setVector(vec);
        if (props.onChange) props.onChange({ ...property, value: vec });
    };

    return (
        <div className="property flex-row-centre">
            <PropertyLabel name={property.name} />
            <div className="property-content">
                <div className="property-text">x </div>
                <input
                    tag="0"
                    type="number"
                    className="property-input"
                    value={vector[0]}
                    onChange={handleChange}
                    onClick={(e) => e.target.select()}
                    tabIndex="1"
                    onBlur={onSubmitValue}
                    onKeyDown={handleKeyPress}
                />
                <div className="property-text">y </div>
                <input
                    tag="1"
                    type="number"
                    className="property-input"
                    value={vector[1]}
                    onChange={handleChange}
                    onClick={(e) => e.target.select()}
                    tabIndex="1"
                    onBlur={onSubmitValue}
                    onKeyDown={handleKeyPress}
                />
                <div className="property-text">z </div>
                <input
                    tag="2"
                    type="number"
                    className="property-input"
                    value={vector[2]}
                    onChange={handleChange}
                    onClick={(e) => e.target.select()}
                    tabIndex="1"
                    onBlur={onSubmitValue}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </div>
    );
};
export default VectorProperty;
