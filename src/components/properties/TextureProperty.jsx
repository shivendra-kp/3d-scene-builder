import { useState, useEffect } from "react";
import PropertyLabel from "./PropertyLable";
import { Images } from "../../assets";

const TextureProperty = (props) => {
    const [currentFile, setCurrentFile] = useState({ url: "", name: "" });

    const property = props.property || { name: "texture", id: 0 };
    // const onChange = props.onChange;

    // whenever inital state changes
    useEffect(() => {
        const file = property.initial;
        if (file) {
            setCurrentFile((s) => {
                let name;
                let url;

                if (s.url) {
                    URL.revokeObjectURL(s.url);
                }
                if (property.initial) {
                    // console.log(file);
                    url = URL.createObjectURL(file);
                    if (file.name.length > 10) {
                        name = file.name.slice(0, 10) + "...";
                    } else {
                        name = file.name;
                    }
                }

                return { url: url, name: name };
            });
        } else {
            setCurrentFile((s) => {
                if (s.url) {
                    URL.revokeObjectURL(s.url);
                }
                return { url: "", name: "" };
            });
        }
    }, [property.initial]);

    useEffect(() => {
        return () => {
            if (currentFile.url) {
                URL.revokeObjectURL(currentFile.url);
            }
        };
    }, [currentFile]);

    const handleClick = (e) => {
        //show filer explorer here
    };

    const onDrop = (e) => {
        e.preventDefault();
        if (e.target.classList.contains("dropbox-dragover")) {
            e.target.classList.remove("dropbox-dragover");
        }
        const file = e.dataTransfer.files[0];
        setCurrentFile((s) => {
            if (s.url) {
                URL.revokeObjectURL(s.url);
            }
            const url = URL.createObjectURL(file);
            let name;
            if (file.name.length > 10) {
                name = file.name.slice(0, 10) + "...";
            } else {
                name = file.name;
            }
            return {
                url: url,
                name: name,
            };
        });

        if (props.onChange) props.onChange({ ...property, file: file });
    };

    const handleDragStart = (e) => {
        e.target.classList.add("dropbox-dragover");
    };
    const handleDragEnd = (e) => {
        e.target.classList.remove("dropbox-dragover");
    };

    const handleClear = (e) => {
        if (currentFile.url) {
            URL.revokeObjectURL(currentFile.url);
            setCurrentFile({ url: "", name: "" });
            if (props.onChange) props.onChange({ ...property, file: null });
        }
    };

    return (
        <div className="property flex-row-centre">
            <PropertyLabel name={property.name} />
            <div
                className="property-content asset-property-body"
                onClick={handleClick}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={handleDragStart}
                onDragLeave={handleDragEnd}
            >
                <img
                    src={currentFile.url || Images.textureNone}
                    alt=""
                    className="property-asset-image disable-pointer-events"
                />
                <div className="property-asset-content disable-pointer-events">
                    <div className="name">{currentFile.name || "None"}</div>
                    <div className="type">{"Texure"}</div>
                    <div
                        style={{
                            backgroundColor: "#fcba03",
                            width: "100%",
                            height: "2px",
                        }}
                    ></div>
                </div>
                <div style={{ width: "0px" }}>
                    {currentFile.url !== "" && (
                        <img
                            src={Images.cancel}
                            alt=""
                            className="img-btn"
                            style={{
                                width: "16px",
                                visibility: "visible",
                                position: "relative",
                                right: "16px",
                                zIndex: "7",
                            }}
                            onClick={handleClear}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
export default TextureProperty;
