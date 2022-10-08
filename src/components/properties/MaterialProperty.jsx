import PropertyLabel from "./PropertyLable";
import { Images } from "../../assets";
import { useEffect, useState, useRef } from "react";
// import { AssetType, MapAssetToColor } from "../../utils/assetDefaults";

const MaterialProperty = (props) => {
    const property = props.property || { name: "material" };
    const materialuuid = (property.material && property.material.uuid) || "none";
    const [state, setState] = useState({ editButton: false, highlightButton: false });
    const matTypeUI = useRef();

    useEffect(() => {
        if (materialuuid === "none") {
            setState((s) => {
                return { ...s, editButton: false };
            });
        } else {
            setState((s) => {
                return { ...s, editButton: true };
            });
        }
        return () => {};
    }, [materialuuid]);

    const handleHighlight = () => {
        setState((s) => {
            return { ...s, highlightButton: !s.highlightButton };
        });
        if (props.onChange) props.onChange({ ...property, action: "highlight" });
    };

    const handleRequestAddNew = (e) => {
        const rect = e.target.getBoundingClientRect();
        matTypeUI.current.style.display = "block";
        window.addEventListener("mousedown", handleCancel);
        matTypeUI.current.style.top = rect.top + "px";
        matTypeUI.current.style.left = rect.left + 20 + "px";
    };

    const handleCancel = (e) => {
        window.removeEventListener("mousedown", handleCancel);

        if (e.target.parentNode !== matTypeUI.current) {
            console.log("clicked outside");
            matTypeUI.current.style.display = "none";
        }
    };

    const handleAddNew = (matType) => {
        if (props.onChange) props.onChange({ ...property, action: "add", matType: matType });
        window.removeEventListener("mousedown", handleCancel);
        matTypeUI.current.style.display = "none";
    };
    const handleClear = () => {
        if (props.onChange) props.onChange({ ...property, action: "clear" });
    };

    const handleShowMaterialUI = () => {
        if (props.onChange) props.onChange({ ...property, action: "edit" });
    };

    return (
        <div className="property flex-row-centre">
            <PropertyLabel name={property.name} />
            <div className="property-content">
                <img src={Images.previewMaterial} alt="" className="property-asset-image asset-property-body" />

                <div className="flex-column align-start" style={{ marginLeft: "4px" }}>
                    <img
                        className="btn-square-small img-btn"
                        title="highlight"
                        onClick={handleHighlight}
                        alt=""
                        src={state.highlightButton ? Images.materialFilled : Images.materialEmpty}
                    />
                    {state.editButton ? (
                        <img
                            className="btn-square-small img-btn"
                            title="edit"
                            onClick={handleShowMaterialUI}
                            alt=""
                            src={Images.edit}
                        ></img>
                    ) : (
                        <img
                            className="btn-square-small img-btn"
                            title="add"
                            onClick={handleRequestAddNew}
                            alt=""
                            src={Images.plus}
                        ></img>
                    )}

                    <img
                        className="btn-square-small img-btn"
                        title="clear"
                        onClick={handleClear}
                        alt=""
                        src={Images.cancel}
                    ></img>
                    {/* Floating UI */}

                    <div style={{ position: "fixed", background: "black", display: "none" }} ref={matTypeUI}>
                        <div
                            className="property-name btn-text"
                            onClick={(e) => {
                                handleAddNew("basic");
                            }}
                        >
                            Basic
                        </div>
                        <div
                            className="property-name btn-text"
                            onClick={(e) => {
                                handleAddNew("standard");
                            }}
                        >
                            Standard
                        </div>

                        <div
                            className="property-name btn-text"
                            onClick={(e) => {
                                handleAddNew("physical");
                            }}
                        >
                            Physical
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialProperty;
