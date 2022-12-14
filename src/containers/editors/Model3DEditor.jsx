import { Canvas } from "@react-three/fiber";
import {
    PerspectiveCamera,
    Environment,
    OrbitControls,
    // useGLTF,
} from "@react-three/drei";

import { Images } from "../../assets";
import {
    getMaterial,
    gltfLoader,
    meshFromGltf,
    unloadTexture,
    defaulMat,
    highlightMat,
    GEOMETRY,
    MATERIAL,
} from "../../utils/threeUtils";
import { Suspense } from "react";
import { useState } from "react";
import MaterialUI from "../ui-container/MaterialUI";
import { useEffect } from "react";

import DockerUI from "../ui-container/DockerUI";
import DefaultGeometryUI from "../ui-container/DefaultGeometryUI";
import { useRef } from "react";

const CLEAR_MATERIALS = true;

// cache state

const CACHE = {
    files: {},
    materials: {}, // data{},references[],instance,higlight
    textures: {}, //{file,meta}
    meshes: {}, // [meshes]
    sections: {}, // {section1-files,section2-Materialproperties}
};

const FileSection = {
    sectionName: "Files",
    sectionId: "01",
    properties: [
        {
            name: "select file",
            type: "file",
            id: "model_001",
            fileType: ["Model"],
            extentions: ["glb"],
        },
    ],
};

const envSection = {
    sectionName: "Environment",
    sectionId: "02",
    properties: [
        {
            name: "Map",
            type: "texture",
            id: "env_001",
        },
    ],
};

const defaulSections = [FileSection, envSection];

// component
const Model3DEditor = (props) => {
    const envRef = useRef();
    const [state, setState] = useState({
        defaultScene: { active: false, geometry: null, material: null },
        MUI: { disabled: true, active: null, type: "Standard" },
        gltf: null,
        sections: [...defaulSections],
    });
    const [update, setUpdate] = useState(false);
    const editorId = props.editorId || "001";

    // call once
    useEffect(() => {
        setState((s) => {
            const matSec = getMatrialSection(1);
            matSec.properties[0].material = MATERIAL.material;

            return {
                ...s,
                defaultScene: { active: true, geometry: GEOMETRY.sphere, material: MATERIAL.material },
                sections: [...defaulSections, matSec],
            };
        });
    }, [editorId]);

    useEffect(() => {
        console.log(envRef.current);
    }, [envRef.current]);

    const handlePropertyChange = (e) => {
        if (e.type === "material") {
            const mi = e.materialIndex;

            switch (e.action) {
                case "highlight":
                    if (state.defaultScene.active) return;
                    highlightMaterial(editorId, mi);

                    return;
                case "add":
                    // Add different material properties
                    addMaterial(editorId, mi, e.matType);
                    setUpdate(!update);
                    return;

                case "clear":
                    if (state.defaultScene.active) return;
                    removeMaterial(editorId, mi);
                    setState((s) => {
                        return { ...s, MUI: { disabled: true, active: null } };
                    });
                    return;
                case "edit":
                    // show ui
                    if (state.defaultScene.active) {
                        setState((s) => {
                            return {
                                ...s,
                                MUI: { disabled: false, active: MATERIAL, type: "" },
                            };
                        });
                        return;
                    }

                    setState((s) => {
                        return {
                            ...s,
                            MUI: { disabled: false, active: CACHE.materials[editorId][e.materialIndex] },
                        };
                    });
                    return;
                case "explorer":
                    //show explorer
                    return;
                default:
                    break;
            }
        }
        if (e.type === "file") {
            // handle gltf file drop
            if (e.file === null) {
                //remove old files
                setState((s) => {
                    const matSec = getMatrialSection(1);
                    matSec.properties[0].material = MATERIAL.material;
                    return {
                        ...s,
                        gltf: null,
                        file: null,
                        sections: [...defaulSections, matSec],
                        defaultScene: { ...s.defaultScene, active: true },
                    };
                });
                clearModel(editorId);
                return;
            }
            const url = URL.createObjectURL(e.file);
            gltfLoader.load(url, (gltf) => {
                URL.revokeObjectURL(url);
                addModel(editorId, gltf, e.file);
                setState((s) => {
                    return {
                        ...s,
                        gltf: gltf,
                        sections: [...defaulSections, ...CACHE.sections[editorId]],
                        defaultScene: { ...s.defaultScene, active: false },
                    };
                });
            });
        }
    };

    const handleMUICancel = () => {
        setState((s) => {
            return { ...s, MUI: { disabled: true, active: null } };
        });
    };

    const handleAddDefualtMesh = (e) => {
        switchScene(e);
    };

    const handleSave = () => {
        //save gltf file
        //save materials data
        //save textures
    };
    const handleCancel = () => {};

    const switchScene = (scene) => {
        if (scene === "scene") {
            if (!CACHE.sections[editorId]) return;
            setState((s) => {
                return {
                    ...s,
                    defaultScene: { ...s.defaultScene, active: false },
                    sections: [...defaulSections, ...CACHE.sections[editorId]],
                };
            });
        } else {
            setState((s) => {
                const matSec = getMatrialSection(1);
                matSec.properties[0].material = MATERIAL.material;
                return {
                    ...s,
                    defaultScene: { active: true, geometry: GEOMETRY[scene], material: MATERIAL.material },
                    sections: [...defaulSections, matSec],
                };
            });
        }
    };

    return (
        <>
            <div className="editor">
                <div style={{ width: "0px" }}>
                    <DefaultGeometryUI onClick={handleAddDefualtMesh} />
                </div>
                <Canvas id="me-canvas">
                    <pointLight position={[8, 15, 10]} intensity={0.5} />
                    {/* <ambientLight /> */}

                    <Suspense fallback={null}>
                        {state.defaultScene.active ? (
                            <mesh geometry={state.defaultScene.geometry} material={state.defaultScene.material} />
                        ) : (
                            state.gltf && <primitive object={state.gltf.scene}></primitive>
                        )}
                    </Suspense>
                    <OrbitControls />
                    <Environment ref={envRef} background files={Images.envTexture01} />
                    <PerspectiveCamera makeDefault position={[0, 0, 2]} />
                </Canvas>
                <DockerUI
                    id={"ModelEditorUI"}
                    sections={state.sections}
                    onChange={handlePropertyChange}
                    heading="Scene"
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
                {/* <button onClick={printCache}>printCache</button> */}
            </div>
            <MaterialUI
                key={"MUI"}
                material={state.MUI.active}
                matType={state.MUI.type}
                disabled={state.MUI.disabled}
                onCancel={handleMUICancel}
            />
        </>
    );
};

export default Model3DEditor;

///////////////////////////////////////////////////////////////////////////////////////

// Utilities

const highlightMaterial = (editorId, materialIndex) => {
    console.log("highlight", materialIndex);
    const mat = CACHE.materials[editorId][materialIndex];
    if (mat.highlight) {
        //stop highlight
        mat.highlight = false;
        mat.references.forEach((mesh) => {
            mesh.material = mat.material || defaulMat;
        });
    } else {
        //highlight
        mat.highlight = true;
        mat.references.forEach((mesh) => {
            mesh.material = highlightMat;
        });
    }
};

const addMaterial = (editorId, materialIndex, matType) => {
    const matData = CACHE.materials[editorId][materialIndex];
    const newMat = getMaterial(matType);

    const mat = newMat.material;
    matData.data = newMat.data;

    // update material at index
    matData.material = mat;

    // update meshes using that material index
    matData.references.forEach((mesh) => {
        mesh.material = mat;
    });

    //update property reference
    const prop = CACHE.sections[editorId][0].properties[materialIndex];
    prop.material = mat;
};

const removeMaterial = (editorId, materialIndex) => {
    const old = CACHE.materials[editorId][materialIndex];
    if (!old.material) return;

    // update materials of referenced meshes
    old.references.forEach((mesh) => {
        mesh.material = defaulMat;
    });

    //also dispose textures if any
    for (const key in old.data) {
        if (old.data[key] instanceof File || old.data[key] instanceof Blob) {
            unloadTexture(old.data[key], old.material.uuid);
        }
    }

    old.material.dispose();
    old.material = null;
    const prop = CACHE.sections[editorId][0].properties[materialIndex];
    prop.material = null;
};

const addModel = (editorId, gltf, file) => {
    //cache the current file
    CACHE.files[editorId] = file;
    const obj = meshFromGltf(gltf);
    console.log(obj);

    if (CLEAR_MATERIALS) {
        //remove default material created by loader
        obj.meshes.forEach((mesh) => {
            const mat = mesh.material;
            mesh.material = defaulMat;
            mat.dispose();
        });
    }

    //generate default references
    CACHE.meshes[editorId] = obj.meshes;
    CACHE.materials[editorId] = obj.map.map((item, index) => {
        const mat = CLEAR_MATERIALS ? null : obj.materials[index];

        return { data: {}, material: mat, references: item, highlight: false };
    });
    CACHE.textures[editorId] = [];

    //update properties
    const materialSection = getMatrialSection(CACHE.materials[editorId].length);
    CACHE.sections[editorId] = [materialSection];
};

const clearModel = (editorId) => {
    delete CACHE.files[editorId];

    //dispose geomerty
    CACHE.meshes[editorId].map((mesh) => {
        mesh.geometry.dispose();
        return null;
    });
    CACHE.meshes[editorId] = [];

    //dispose materials
    CACHE.materials[editorId].map((mat) => {
        if (mat.material) {
            mat.material.dispose();
        }
        return null;
    });
    CACHE.materials[editorId] = [];

    //dispose texture
    CACHE.textures[editorId].map((text) => {
        text.dispose();
        return null;
    });
    CACHE.textures[editorId] = [];
    CACHE.sections[editorId] = [];
};

///////////////////////////////////////////////////////////////////////
//Switch Scenes

const getMatrialSection = (count) => {
    const properties = [];
    for (let i = 0; i < count; i++) {
        properties.push({
            name: "Material " + i,
            type: "material",
            id: "mat" + i,
            fileType: "Material",
            materialIndex: i,
            material: null,
        });
    }
    return {
        sectionName: "Materials",
        sectionId: "ms_01",
        properties: properties,
    };
};
