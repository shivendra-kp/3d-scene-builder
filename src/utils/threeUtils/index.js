import { gltfLoader, meshFromGltf, getHash, loadTexture, unloadTexture } from "./loaders";
import { defaulMat, highlightMat, GEOMETRY, MATERIAL } from "./global";
import { getMaterial, updateMaterialProperty } from "./materials";
import { getMaterialProperties } from "./properties";

export {
    gltfLoader,
    meshFromGltf,
    // Defualts
    defaulMat,
    highlightMat,
    GEOMETRY,
    MATERIAL,
    getMaterialProperties,

    // Materials
    getMaterial,
    updateMaterialProperty,
    // hash
    getHash,
    //loaders
    loadTexture,
    unloadTexture,
    // debug
};
