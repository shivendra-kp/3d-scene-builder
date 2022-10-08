import { TextureLoader, sRGBEncoding, RepeatWrapping } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import CryptoJS from "crypto-js";

const textureLoader = new TextureLoader();
const gltfLoader = new GLTFLoader();

const meshFromGltf = (gltf) => {
    const map = {};
    const meshes = [];
    const materials = [];
    getMeshRec(gltf.scene, map, meshes, materials);
    const matToMeshMap = [];
    for (const key in map) {
        matToMeshMap.push(map[key]);
    }
    // returns all the mesh and map containg material index to meshes
    return { meshes: meshes, map: matToMeshMap, materials: materials };
};

//recusive function
const getMeshRec = (scene, map, meshes, materials) => {
    if (scene.children.length === 0) {
        if (scene.isMesh) {
            meshes.push(scene);
            const matId = scene.material.uuid;
            if (map[scene.material.uuid]) {
                map[matId].push(scene);
            } else {
                map[matId] = [scene];
                materials.push(scene.material);
            }
        }
        return;
    }

    scene.children.forEach((element) => {
        getMeshRec(element, map, meshes, materials);
    });
};

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
        _texture.flipY = false;
        _texture.encoding = sRGBEncoding;
        _texture.wrapS = RepeatWrapping;
        _texture.wrapT = RepeatWrapping;
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

export { gltfLoader, meshFromGltf, getHash, loadTexture, unloadTexture };
