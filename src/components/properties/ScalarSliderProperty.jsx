import PropertyLabel from "./PropertyLable";
import { useEffect } from "react";
import { useRef } from "react";

const floatFilters = (number) => {
    if (number === "") return "0.0";
    let num = String(parseFloat(number));
    if (!num.includes(".")) num += ".0";
    return num;
};

const ScalarSliderProperty = (props) => {
    const inputBox = useRef();
    const fillBox = useRef();
    let dragging = false;
    const property = props.property || { name: "Slider", initial: "0.0", min: 0, max: 1 };

    useEffect(() => {
        const perc = (property.initial - property.min) / (property.max - property.min);
        const percent = clamp(perc, 0, 1);
        inputBox.current.value = property.initial || "0.0";
        fillBox.current.style.width = percent * 100 + "%";
    }, [property.initial, property.min, property.max]);

    const handleMouseDown = (e) => {
        if (e.button === 0) {
            // left mouse button
            window.addEventListener("mousemove", handleSlide);
            window.addEventListener("mouseup", handleMouseUp);
        }
    };
    const handleMouseUp = (e) => {
        if (e.button === 0) {
            // left mouse button
            window.removeEventListener("mousemove", handleSlide);
            window.removeEventListener("mouseup", handleMouseUp);
        }
    };

    const handleClick = (e) => {};

    const handleSlide = (e) => {
        // can be optimized
        const rect = inputBox.current.getBoundingClientRect();
        const width = e.clientX - rect.left;

        if (!dragging) {
            if (width > 2) {
                //start dragging
                dragging = true;
            } else {
                return;
            }
        }

        const percent = clamp(width / rect.width, 0, 1);
        const value = parseFloat(percent * (property.max - property.min) + property.min).toFixed(4);
        inputBox.current.value = value;
        fillBox.current.style.width = percent * 100 + "%";
        if (props.onUpdate) props.onUpdate({ ...property, value: value });
    };

    const handleKeyPress = (e) => {
        if (e.code === "Enter") {
            e.target.blur();
        }
    };

    const submitChanges = (e) => {
        const value = floatFilters(e.target.value);
        const perc = (parseFloat(value) - property.min) / (property.max - property.min);
        const percent = clamp(perc, 0, 1);
        inputBox.current.value = value;
        fillBox.current.style.width = percent * 100 + "%";

        if (props.onChange) props.onChange({ ...property, value: value });
    };

    return (
        <div className="property flex-row-centre">
            <PropertyLabel name={property.name} />
            <div className="property-content flex-column">
                <input
                    ref={inputBox}
                    className="property-input"
                    type="number"
                    onClick={handleClick}
                    onMouseDown={handleMouseDown}
                    onKeyDown={handleKeyPress}
                    onBlur={submitChanges}
                    style={{ width: "100%" }}
                />
                <div style={{ width: "100%", height: "0px", position: "relative" }}>
                    <div
                        ref={fillBox}
                        className="slider-fill"
                        style={{
                            width: "0%",
                            height: "17.6px",
                            bottom: "17.6px",
                            position: "relative",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
export default ScalarSliderProperty;

const clamp = (current, min, max) => {
    if (current < min) return min;
    if (current > max) return max;
    return current;
};
