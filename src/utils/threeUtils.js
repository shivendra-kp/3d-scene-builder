import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import CryptoJS from "crypto-js";

const textureLoader = new TextureLoader();
const gltfLoader = new GLTFLoader();

const meshFromGltf = (gltf) => {
    const map = {};
    const meshes = [];
    getMeshRec(gltf.scene, map, meshes);
    const matToMeshMap = [];
    for (const key in map) {
        matToMeshMap.push(map[key]);
    }

    // returns all the mesh and map containg material index to meshes
    return { meshes: meshes, map: matToMeshMap };
};

//recusive function
const getMeshRec = (scene, map, meshes) => {
    if (scene.children.length === 0) {
        if (scene.isMesh) {
            meshes.push(scene);
            const matId = scene.material.uuid;
            if (map[scene.material.uuid]) {
                map[matId].push(scene);
            } else {
                map[matId] = [scene];
            }
        }
        return;
    }

    scene.children.forEach((element) => {
        getMeshRec(element, map, meshes);
    });
};

const getStandardMaterialProperties = (initial) => {
    const properties = [
        {
            name: "Wireframe",
            id: "wireframe",
            type: "bool",
            initial: initial ? initial.wireframe : false,
        },
        {
            name: "Color",
            id: "color",
            type: "color",
            initial: initial ? initial.color : { r: 255, g: 255, b: 255, a: 1 },
        },
        {
            name: "Albedo",
            id: "map",
            type: "texture",
            initial: initial ? initial.map : null,
        },
        {
            name: "Roughness",
            id: "roughness",
            type: "slider",
            initial: initial ? initial.roughness : 1,
            min: 0,
            max: 1,
        },
        {
            name: "Roughness Map",
            id: "roughnessMap",
            type: "texture",
            initial: initial ? initial.roughnessMap : null,
        },
        {
            name: "Metallic",
            id: "metalness",
            type: "slider",
            initial: initial ? initial.metalness : null,
            min: 0,
            max: 1,
        },
        {
            name: "Metallic Map",
            id: "metalnessMap",
            type: "texture",
            initial: initial ? initial.metalnessMap : null,
        },
        {
            name: "Normal Scale",
            id: "normalScale",
            type: "vector",
            initial: initial ? initial.normalScale : null,
        },
        {
            name: "Normal Map",
            id: "normalMap",
            type: "texture",
            initial: initial ? initial.normalMap : null,
        },
        {
            name: "Emission Color",
            id: "emissive",
            type: "color",
            initial: initial ? initial.emissive : { r: 0, g: 0, b: 0, a: 1 },
        },
        {
            name: "Emission Intensity",
            id: "emissiveIntensity",
            type: "float",
            initial: initial ? initial.emissiveIntensity : 1,
        },
        {
            name: "Emission Map",
            id: "emissiveMap",
            type: "texture",
            initial: initial ? initial.emissiveMap : null,
        },
        {
            name: "Alpha Map",
            id: "alphaMap",
            type: "texture",
            initial: initial ? initial.alphaMap : null,
        },
        {
            name: "AO intensity",
            id: "aoMapIntensity",
            type: "scalar",
            initial: initial ? initial.aoMapIntensity : 1,
        },
        {
            name: "AO Map",
            id: "aoMap",
            type: "texture",
            initial: initial ? initial.aoMap : null,
        },
    ];

    return properties;
};

//easily can be extended for more value
const getMaterialKeyValue = () => {
    return {
        wireframe: false,
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
    };
};

// utility to update material properties
const updateMaterialProperty = (material, prop) => {
    if (material.isMeshStandardMaterial) {
        updateStandardMaterialProperty(material, prop);
    }
};

const updateStandardMaterialProperty = (material, prop) => {
    if (prop.type === "color") {
        material[prop.name].r = prop.value.r / 255;
        material[prop.name].g = prop.value.g / 255;
        material[prop.name].b = prop.value.b / 255;
        return;
    }
    if (prop.type === "texture" || prop.name === "wireframe") {
        material[prop.name] = prop.value;
        material.needsUpdate = true;
        return;
    }

    if (prop.name === "normalScale") {
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
    material[prop.name] = prop.value;
};

// hash

const getHash = (message) => {
    return CryptoJS.MD5(message).toString(CryptoJS.enc.Hex);
};

// load manager
// basically prevents from reloading same file
// same files are determined using passing
// name, filesize, filetype to md5 hash
const MANAGER_CACHE = { textures: {}, models: {} };

const loadTexture = (file, from, onLoadComplete, onProgress) => {
    if (!file) return;
    const hash = getHash(file.name + file.size + file.type + "");

    let url;
    const onLoad = (_texture) => {
        if (url) URL.revokeObjectURL(url);
        MANAGER_CACHE.textures[hash] = { texture: _texture, count: 1, refs: {} };
        MANAGER_CACHE.textures[hash].refs[from] = true;
        onLoadComplete(_texture);
    };

    if (MANAGER_CACHE.textures[hash]) {
        // if hash exists
        if (MANAGER_CACHE.textures[hash].refs[from]) {
            // already has reference
            onLoadComplete(MANAGER_CACHE.textures[hash].texture);
            return;
        }
        // increase count and add reference
        MANAGER_CACHE.textures[hash].count++;
        MANAGER_CACHE.textures[hash].refs[from] = true;
        onLoadComplete(MANAGER_CACHE.textures[hash].texture);
        return;
    }

    url = URL.createObjectURL(file);
    textureLoader.load(url, onLoad, onProgress);
};

const unloadTexture = (file, from) => {
    if (!file) return;

    const hash = getHash(file.name + file.size + file.type + "");

    if (MANAGER_CACHE.textures[hash]) {
        // if not refereced by the object==>return
        if (!MANAGER_CACHE.textures[hash].refs[from]) return;

        // if hash exists decrement count and remove reference
        MANAGER_CACHE.textures[hash].count--;
        delete MANAGER_CACHE.textures[hash].refs[from];

        // delete texture from memeory if not used anywhere
        if (MANAGER_CACHE.textures[hash].count <= 0) {
            MANAGER_CACHE.textures[hash].texture.dispose();
            delete MANAGER_CACHE.textures[hash];
        }
    }
};

export {
    gltfLoader,
    meshFromGltf,
    getStandardMaterialProperties,
    updateMaterialProperty,
    getMaterialKeyValue,
    // hash
    getHash,
    //loaders
    loadTexture,
    unloadTexture,
    // debug
};
