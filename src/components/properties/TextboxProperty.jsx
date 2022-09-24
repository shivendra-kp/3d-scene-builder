import { useRef } from "react";
import PropertyLabel from "./PropertyLable";

// const updateTextArea = (textarea, value) => {
//     var textEvent = document.createEvent("TextEvent");
//     textEvent.initTextEvent("textInput", true, true, null, value);
//     textarea.dispatchEvent(textEvent);
// };

const TextboxProperty = (props) => {
    const property = props.property || { name: "textbox" };
    const textbox = useRef();

    const onSubmit = (e) => {};

    const handleKeyPress = (e) => {
        console.log(e.code);

        if (e.code === "Enter") {
            if (e.shiftKey) {
                e.preventDefault();
                e.target.value += "\r\n";
            } else {
                e.preventDefault();
                e.target.blur();
            }
        }
        if (e.code === "Tab") {
            e.preventDefault();
            e.target.value += "\t";
        }

        if (e.code === "KeyC") {
            if (e.ctrlKey) {
                e.preventDefault();
                // e.target.value
                navigator.clipboard.writeText(e.target.value);
            }
        }
    };

    const handleOperations = (e) => {
        const tag = e.target.getAttribute("tag");
        switch (tag) {
            case "copy":
                navigator.clipboard.writeText(textbox.current.value);
                return;
            case "paste":
                navigator.clipboard.readText().then(
                    (success) => {
                        console.log(success);
                        textbox.current.value = success;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                return;

            case "clear":
                textbox.current.value = "";
                return;
            default:
                return;
        }
    };

    return (
        <div className="property ">
            <PropertyLabel name={property.name} />
            <div className="property-content">
                <div style={{ display: "flex", width: "100%" }}>
                    <textarea
                        ref={textbox}
                        name={property.name}
                        id={property.id}
                        rows="10"
                        className="property-textarea"
                        onBlur={onSubmit}
                        onKeyDown={handleKeyPress}
                        spellCheck="false"
                    />
                    <div className="property-textarea-sidebar">
                        <div className="property-textarea-button" tag="copy" onClick={handleOperations} />
                        <div className="property-textarea-button" tag="paste" onClick={handleOperations} />
                        <div className="property-textarea-button" tag="clear" onClick={handleOperations} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TextboxProperty;
