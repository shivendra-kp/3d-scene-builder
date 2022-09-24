import { useState } from "react";
import PropertyLabel from "./PropertyLable";
import { useEffect } from "react";

const floatFilters = (number) => {
    if (number === "") return "0.0";
    let num = String(parseFloat(number));
    if (!num.includes(".")) num += ".0";
    return num;
};

const ScalarSliderProperty = (props) => {
    const property = props.property || { name: "Bool" };

    const [slider, setSlider] = useState({
        value: props.initial || property.min || "0.0",
        dragging: false,
        filled: 0,
        inputBox: null,
    });

    useEffect(() => {
        setSlider((state) => {
            const perc = (property.initial - property.min) / (property.max - property.min);
            const percent = clamp(perc, 0, 1);
            return { ...state, value: property.initial, filled: percent * 100 };
        });
    }, [property.initial, property.min, property.max]);

    const handleMouseDown = (e) => {
        if (e.button === 0) {
            // left mouse button

            setSlider((state) => {
                return { ...state, keyDown: true, inputBox: e.target };
            });
            window.addEventListener("mousemove", handleSlide);
            window.addEventListener("mouseup", handleMouseUp);
        }
    };
    const handleMouseUp = (e) => {
        if (e.button === 0) {
            // left mouse button
            window.removeEventListener("mousemove", handleSlide);
            window.removeEventListener("mouseup", handleMouseUp);

            //style changes

            setSlider((state) => {
                state.inputBox.style.cursor = "auto";

                if (!state.dragging) {
                    // console.log("click");
                    state.inputBox.select();
                }
                return { ...state, keyDown: false, dragging: false };
            });
        }
    };

    const handleClick = (e) => {};

    const handleSlide = (e) => {
        // can be optimized
        setSlider((state) => {
            const rect = state.inputBox.getBoundingClientRect();
            const width = e.clientX - rect.left;
            if (!state.dragging) {
                if (width > 2) {
                    //start dragging
                    return { ...state, dragging: true };
                }
                return state;
            }

            const percent = clamp(width / rect.width, 0, 1);
            const value = parseFloat(percent * (property.max - property.min) + property.min).toFixed(4);
            if (props.onUpdate) props.onUpdate({ ...property, value: value });
            return { ...state, filled: percent * 100, value: value };
        });
    };

    const handleChange = (e) => {
        setSlider((state) => {
            return { ...state, value: e.target.value };
        });
    };

    const handleKeyPress = (e) => {
        if (e.code === "Enter") {
            e.target.blur();
        }
    };

    const submitChanges = (e) => {
        const value = floatFilters(slider.value);
        setSlider((state) => {
            const perc = (state.value - property.min) / (property.max - property.min);

            const percent = clamp(perc, 0, 1);
            return { ...state, value: value, filled: percent * 100 };
        });
        if (props.onChange) props.onChange({ ...property, value: value });
    };

    return (
        <div className="property flex-row-centre">
            <PropertyLabel name={property.name} />
            <div className="property-content flex-column">
                <input
                    className="property-input"
                    type="number"
                    value={slider.value}
                    onClick={handleClick}
                    onChange={handleChange}
                    onMouseDown={handleMouseDown}
                    onKeyDown={handleKeyPress}
                    onBlur={submitChanges}
                    style={{ width: "100%" }}
                />
                <div style={{ width: "100%", height: "0px", position: "relative" }}>
                    <div
                        className="slider-fill"
                        style={{
                            width: slider.filled + "%",
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
