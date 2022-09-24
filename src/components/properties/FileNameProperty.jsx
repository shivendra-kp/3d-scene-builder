import { Images } from "../../assets";

const FileNameProperty = (props) => {
    const toggle = (element, value) => {
        if (value) {
            element.style.visibility = "visible";
        } else {
            element.style.visibility = "hidden";
        }
    };

    return (
        <div
            className="property-filename"
            onMouseEnter={(e) => {
                toggle(e.target.children[0], true);
            }}
            onMouseLeave={(e) => {
                toggle(e.target.children[0], false);
            }}
        >
            <img
                src={Images.cancel}
                alt=""
                className="img-btn"
                style={{ width: "12px", marginRight: "4px", visibility: "hidden" }}
                onClick={(e) => {
                    if (props.onChange) props.onChange(props.index);
                }}
            />
            <div className="property-name">{props.name || "default"}</div>
        </div>
    );
};

export default FileNameProperty;
