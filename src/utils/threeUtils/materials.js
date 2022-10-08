import { MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { DoubleSide, FrontSide } from "three";

//easily can be extended for more value
// const getMaterialKeyValue = () => {};

const getBasicMaterialKeyValue = () => {
    return {
        type: "basic",
        wireframe: false,
        doubleSided: false,
        flatShading: false,
        transparent: false,
        fog: false,
        color: { r: 255, g: 255, b: 255, a: 1 },
        map: null,
        opacity: 1.0,
        reflectivity: 0,
        refractionRatio: 0.98, //float
        specularMap: null,
        alphaMap: null,
        aoMapIntensity: 1,
        aoMap: null,
    };
};
const getStandardMaterialKeyValue = () => {
    return {
        type: "standard",
        wireframe: false,
        doubleSided: false,
        flatShading: false,
        transparent: false,
        vertexColor: false,
        fog: false,
        color: { r: 255, g: 255, b: 255, a: 1 },
        map: null,
        roughness: 0.45,
        roughnessMap: null,
        metalness: 0,
        metalnessMap: null,
        normalScale: [1.0, 1.0, 0],
        normalMap: null,
        emissive: { r: 0, g: 0, b: 0, a: 1 },
        emissiveIntensity: 1,
        emissiveMap: null,
        alphaMap: null,
        aoMapIntensity: 1,
        aoMap: null,
    };
};
const getPhysicalMaterialKeyValue = () => {
    return {
        type: "physical",
        wireframe: false,
        doubleSided: false,
        flatShading: false,
        transparent: false,
        vertexColor: false,
        fog: false,
        color: { r: 255, g: 255, b: 255, a: 1 },
        map: null,
        roughness: 1,
        roughnessMap: null,
        metalness: 0,
        metalnessMap: null,
        normalScale: [1.0, 1.0, 0],
        normalMap: null,
        emissive: { r: 0, g: 0, b: 0, a: 1 },
        emissiveIntensity: 1,
        emissiveMap: null,
        alphaMap: null,
        aoMapIntensity: 1,
        aoMap: null,

        //physical mats
        clearcoat: 0.0,
        clearcoatMap: null,
        clearcoatNormalMap: null,
        clearcoatNormalScale: [1.0, 1.0, 0.0],
        clearcoatRoughness: 0.34,
        clearcoatRoughnessMap: null,

        ior: 1.5,
        reflectivity: 0.0,

        sheen: 0.0,
        sheenRoughness: 0.4,
        sheenRoughnessMap: null,
        sheenColor: { r: 0, g: 0, b: 0, a: 1 },
        sheenColorMap: null,

        specularIntensity: 0.2,
        specularIntensityMap: null,
        specularColor: { r: 0, g: 0, b: 0, a: 1 },
        specularColorMap: null,

        thickness: 1.0,
        thicknessMap: null,
        transmission: 0.0,
        transmissionMap: null,
    };
};

const getMaterial = (type) => {
    let mat, data;
    switch (type) {
        case "basic":
            mat = new MeshBasicMaterial();
            console.log(mat);
            data = getBasicMaterialKeyValue();
            break;
        case "standard":
            mat = new MeshStandardMaterial();
            data = getStandardMaterialKeyValue();
            break;
        case "physical":
            mat = new MeshPhysicalMaterial();
            data = getPhysicalMaterialKeyValue();

            break;
        default:
            break;
    }
    return { material: mat, data: data };
};

// utility to update material properties
const updateMaterialProperty = (material, prop) => {
    if (prop.type === "color") {
        material[prop.name].r = prop.value.r / 255;
        material[prop.name].g = prop.value.g / 255;
        material[prop.name].b = prop.value.b / 255;
        return;
    }

    if (prop.name === "normalScale" || prop.name === "clearcoatNormalScale") {
        material[prop.name] = { x: parseFloat(prop.value[0]), y: parseFloat(prop.value[1]) };
        return;
    }

    if (prop.type === "vector") {
        material[prop.name] = {
            x: parseFloat(prop.value[0]),
            y: parseFloat(prop.value[1]),
            z: parseFloat(prop.value[2]),
        };
        return;
    }

    if (prop.name === "doubleSided") {
        if (prop.value) {
            material.side = DoubleSide;
        } else {
            material.side = FrontSide;
        }
        return;
    }

    if (prop.type === "texture" || prop.name === "wireframe") {
        material[prop.name] = prop.value;
        material.needsUpdate = true;
        return;
    }

    if (prop.name === "transparent" || prop.name === "flatShading" || prop.name === "fog") {
        material.needsUpdate = true;
    }
    material[prop.name] = prop.value;

    // if (material.isMeshStandardMaterial) {
    // }
    // updateStandardMaterialProperty(material, prop);
};

// const updateStandardMaterialProperty = (material, prop) => {};

export {
    getMaterial,
    updateMaterialProperty,
    getStandardMaterialKeyValue,
    getPhysicalMaterialKeyValue,
    getBasicMaterialKeyValue,
};
