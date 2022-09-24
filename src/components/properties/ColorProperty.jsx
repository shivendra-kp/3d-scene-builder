import PropertyLabel from "./PropertyLable";
import { RgbaColorPicker } from "react-colorful";
import { useState, useEffect } from "react";
import { useRef } from "react";

const CP_DIMENSIONS = {
    height: 300,
    width: 210,
};

const ColorPicker = (props) => {
    return (
        <>
            <div style={{ position: "fixed", zIndex: 20, top: props.top + "px", left: props.left + "px" }} tabIndex="0">
                <RgbaColorPicker onChange={props.onChange} color={props.color} />
                <div className="colorpicker-button-wrapper">
                    <button className="colorpicker-button" onClick={props.onSave}>
                        Ok
                    </button>
                    <button className="colorpicker-button" onClick={props.onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

const ColorProperty = (props) => {
    const property = props.property || { name: "ColorPicker" };
    const init = property.initial || { r: 255, g: 255, b: 255, a: 1 };
    const update = props.onUpdate;
    const [colorPicker, setColorPicker] = useState({
        visible: false,
        old: { r: 255, g: 255, b: 255, a: 1 },
        color: { r: 255, g: 255, b: 255, a: 1 },
        position: { x: 0, y: 0 },
    });
    const colorBox = useRef();

    let tempCol = { r: 255, g: 255, b: 255, a: 1 };

    useEffect(() => {
        setColorPicker((s) => {
            const col = { r: init.r, g: init.g, b: init.b, a: init.a };
            return { ...s, color: col, old: col };
        });
    }, [init.r, init.g, init.b, init.a]);

    const handleClick = (e) => {
        console.log("clicked");
        const vh = document.documentElement.clientHeight;
        const vw = document.documentElement.clientWidth;
        const position = { x: e.clientX, y: e.clientY };
        if (CP_DIMENSIONS.width + e.clientX > vw) {
            position.x = e.clientX - (e.clientX + CP_DIMENSIONS.width - vw) - 10;
        }
        if (CP_DIMENSIONS.height + e.clientY > vh) {
            position.x = e.clientY - (e.clientY + CP_DIMENSIONS.height - vh) - 10;
        }
        console.log(position);
        setColorPicker((state) => {
            return { ...state, visible: !state.visible, position: position };
        });
    };

    const handleChange = (color) => {
        tempCol = color;
        colorBox.current.style.backgroundColor = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        if (update) update({ ...property, value: color });
    };
    const handleSaveChanges = () => {
        setColorPicker((state) => {
            return { ...state, visible: false, old: tempCol, color: tempCol };
        });

        if (props.onChange) props.onChange({ ...property, value: tempCol });
    };
    const handleDiscardChanges = () => {
        const oldColor = colorPicker.old;
        colorBox.current.style.backgroundColor = `rgba(${oldColor.r},${oldColor.g},${oldColor.b},${oldColor.a})`;

        setColorPicker((state) => {
            return { ...state, visible: false, color: state.old };
        });
        if (props.onChange) props.onChange({ ...property, value: colorPicker.old });
    };

    return (
        <>
            <div className="property flex-row-centre">
                <PropertyLabel name={property.name} />
                <div className="property-content">
                    <div
                        className="property-color-box"
                        onClick={handleClick}
                        style={{
                            backgroundColor: `rgba(${colorPicker.color.r},${colorPicker.color.g},${colorPicker.color.b},${colorPicker.color.a})`,
                        }}
                        ref={colorBox}
                    ></div>
                </div>
            </div>
            {colorPicker.visible ? (
                <ColorPicker
                    onChange={handleChange}
                    onSave={handleSaveChanges}
                    onCancel={handleDiscardChanges}
                    color={colorPicker.color}
                    top={colorPicker.position.y}
                    left={colorPicker.position.x}
                />
            ) : (
                <></>
            )}
        </>
    );
};
export default ColorProperty;
