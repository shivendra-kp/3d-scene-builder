import { useState } from "react";
import PropertyLabel from "./PropertyLable";

const integerFilters = (number) => {
    if (number === "") return 0;
    return parseInt(number, 10);
};

const IntegerProperty = (props) => {
    const property = props.property || { name: "Intger" };
    const [number, setNumber] = useState(property.initial || "0");

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.type === "keydown") {
            if (e.code === "Enter") {
                // console.log("Enter key Pressed");
                e.target.blur();
            }
        }
    };
    const onSubmitValue = (e) => {
        const num = String(integerFilters(e.target.value));
        setNumber(num);

        if (props.onChange) {
            props.onChange({ ...property, value: num });
        }
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
export default IntegerProperty;
