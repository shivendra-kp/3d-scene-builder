import { useEffect } from "react";
import { useState } from "react";
import PropertyLabel from "./PropertyLable";

const floatFilters = (number) => {
    if (number === "") return "0.0";
    let num = String(parseFloat(number));
    if (!num.includes(".")) num += ".0";
    return num;
};

const FloatProperty = (props) => {
    const property = props.property || { name: "Scalar" };
    const [number, setNumber] = useState("0.0");

    useEffect(() => {
        setNumber(property.initial);
    }, [property.initial]);

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.type === "keydown") {
            if (e.code === "Enter") {
                e.target.blur();
            }
        }
    };
    const onSubmitValue = (e) => {
        const num = floatFilters(e.target.value);

        setNumber(num);
        if (props.onChange) props.onChange({ ...property, value: num });
    };
    return (
        <div className="property flex-row-centre">
            <PropertyLabel name={property.name} />
            <div className="property-content">
                <input
                    type="number"
                    value={number}
                    onChange={handleChange}
                    onClick={(e) => e.target.select()}
                    tabIndex="1"
                    onBlur={onSubmitValue}
                    onKeyDown={handleKeyPress}
                    className="property-input"
                />
            </div>
        </div>
    );
};
export default FloatProperty;
