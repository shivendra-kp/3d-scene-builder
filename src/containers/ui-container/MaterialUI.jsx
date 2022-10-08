import { Suspense, useRef } from "react";
import UIContainer from "./UIContainer";
import {
    getMaterialProperties,
    loadTexture,
    unloadTexture,
    updateMaterialProperty,
    getHash,
} from "../../utils/threeUtils";
import { Images } from "../../assets";

const propertiesList = {
    standard: getMaterialProperties("standard"),
    basic: getMaterialProperties("basic"),
    physical: getMaterialProperties("physical"),
};

const sections = {
    sectionId: "01",
    properties: propertiesList["standard"],
};

const POSITION = { top: 0, left: 0 };

const MaterialUI = (props) => {
    const bodyRef = useRef();
    const mat = props.material;
    const disabled = props.disabled;

    //set intial values of material properties
    if (mat && mat.data) {
        // console.log("load props");
        sections.properties = propertiesList[mat.data.type];
        sections.properties.forEach((prop) => {
            prop.initial = mat.data[prop.id];
        });
    }

    const handleCollapse = (e) => {
        if (bodyRef.current.style.display === "none") {
            bodyRef.current.style.display = "block";
            e.target.style.transform = "rotate(0deg)";
        } else {
            bodyRef.current.style.display = "none";
            e.target.style.transform = "rotate(-90deg)";
        }
    };

    const handlePanning = (e) => {
        if (!e.button === 0) return;
        window.addEventListener("mousemove", panning);
        window.addEventListener("mouseup", finishPanning);
    };

    const finishPanning = (e) => {
        if (!e.button === 0) return;

        window.removeEventListener("mousemove", panning);
        window.removeEventListener("mouseup", finishPanning);
    };
    const panning = (e) => {
        const mui = bodyRef.current.parentNode;
        POSITION.left += e.movementX;
        POSITION.top += e.movementY;
        mui.style.top = POSITION.top + "px";
        mui.style.left = POSITION.left + "px";
    };

    const handleCancel = (e) => {
        if (props.onCancel) props.onCancel();
    };

    const handleMaterialChangeProperty = (e) => {
        if (!mat) return;
        if (mat.material) {
            if (e.type === "texture") {
                //if no file is sent
                if (!e.file) {
                    if (mat.data[e.id]) {
                        unloadTexture(mat.data[e.id], mat.material.uuid);
                        mat.data[e.id] = null;
                        updateMaterialProperty(mat.material, { name: e.id, type: e.type, value: null });
                    }

                    return;
                }
                //remove old texture if exists
                if (mat.data[e.id]) {
                    unloadTexture(mat.data[e.id], mat.material.uuid);
                }
                //texture object
                mat.data[e.id] = e.file;

                loadTexture(e.file, mat.material.uuid, (texture) => {
                    updateMaterialProperty(mat.material, { name: e.id, type: e.type, value: texture });
                });
                return;
            }
            //anything thats not texture
            updateMaterialProperty(mat.material, { name: e.id, type: e.type, value: e.value });
            mat.data[e.id] = e.value;
        }
    };
    const handleMaterialUpdateProperty = (e) => {
        if (!mat) return;
        if (mat.material) {
            updateMaterialProperty(mat.material, { name: e.id, type: e.type, value: e.value });
            mat.data[e.id] = e.value;
        }
    };

    return (
        <>
            {disabled ? (
                <></>
            ) : (
                <div className="materialui" style={{ top: POSITION.top + "px", left: POSITION.left + "px" }}>
                    <div className="materialui-header" onMouseDown={handlePanning}>
                        <img
                            className="btn-square-small img-btn"
                            title="collapse"
                            onClick={handleCollapse}
                            src={Images.dropDownArrow}
                            alt=""
                            draggable="false"
                            style={{ transform: "rotate(0deg)" }}
                        ></img>
                        <img
                            className="img-btn"
                            src={Images.pan}
                            alt=""
                            style={{ height: "80%" }}
                            draggable="false"
                        ></img>
                        <img
                            className="btn-square-small img-btn"
                            onClick={handleCancel}
                            src={Images.cancel}
                            alt=""
                            draggable="false"
                        ></img>
                    </div>
                    <div className="materialui-body" ref={bodyRef}>
                        <Suspense>
                            <UIContainer
                                sections={[sections]}
                                onChange={handleMaterialChangeProperty}
                                onUpdate={handleMaterialUpdateProperty}
                            />
                        </Suspense>
                    </div>
                </div>
            )}
        </>
    );
};
export default MaterialUI;
