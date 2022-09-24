import PropertyLabel from "./PropertyLable";
import { Images } from "../../assets";
import { useEffect, useState } from "react";
// import { AssetType, MapAssetToColor } from "../../utils/assetDefaults";

const MaterialProperty = (props) => {
    const property = props.property || { name: "material" };
    const materialuuid = (property.material && property.material.uuid) || "none";
    const [state, setState] = useState({ editButton: false, highlightButton: false });

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
    const handleAddNew = () => {
        if (props.onChange) props.onChange({ ...property, action: "add" });
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
                            onClick={handleAddNew}
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
                </div>
            </div>
        </div>
    );
};

export default MaterialProperty;
