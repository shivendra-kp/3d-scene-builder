import { useState, useEffect } from "react";
import { Images } from "../../assets";
import PropertyLabel from "./PropertyLable";

const BoolProperty = (props) => {
    const property = props.property || { name: "Bool" };

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(property.initial);
    }, [property.initial]);

    const handleClick = (e) => {
        const event = {
            ...property,
            value: !checked,
            oldValue: checked,
        };
        setChecked(!checked);
        if (props.onChange) props.onChange(event);
    };
    return (
        <div className="property flex-row-centre">
            <PropertyLabel name={property.name} />
            <div className="property-content">
                {checked ? (
                    <img className="bool-prop-icon" src={Images.checkboxFilled} alt="" onClick={handleClick} />
                ) : (
                    <img className="bool-prop-icon" src={Images.checkboxEmpty} alt="" onClick={handleClick} />
                )}
            </div>
        </div>
    );
};
export default BoolProperty;
