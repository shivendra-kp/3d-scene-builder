const getMaterialProperties = (type, initial) => {
    switch (type) {
        case "basic":
            return getBasicMaterialProperties(initial);
        case "standard":
            return getStandardMaterialProperties(initial);
        case "physical":
            return getPhysicalMaterialProperties(initial);
        default:
            return;
    }
};

const getBasicMaterialProperties = (initial) => {
    const properties = [
        {
            name: "Wireframe",
            id: "wireframe",
            type: "bool",
            initial: initial ? initial.wireframe : false,
        },
        {
            name: "Double Sided",
            id: "doubleSided",
            type: "bool",
            initial: initial ? initial.doubleSided : false,
        },

        {
            name: "Fog",
            id: "fog",
            type: "bool",
            initial: initial ? initial.fog : false,
        },

        { id: "n001", type: "lineDivider" },
        //color
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
        { id: "n002", type: "lineDivider" },

        /* if you use Environment Maps */
        // {
        //     name: "Environment Map",
        //     id: "envMap",
        //     type: "texture",
        //     initial: initial ? initial.alphaMap : null,
        // },
        // {
        //     name: "Reflectivity",
        //     id: "reflectivity",
        //     type: "float",
        //     initial: initial ? initial.roughness : 1,
        // },
        // {
        //     name: "Refraction Ratio",
        //     id: "refractionRatio",
        //     type: "slider",
        //     initial: initial ? initial.roughness : 1,
        //     min: 0,
        //     max: 1,
        // },
        // {
        //     name: "Specular Map",
        //     id: "specularMap",
        //     type: "texture",
        //     initial: initial ? initial.specularMap : null,
        // },
        {
            name: "Transparent",
            id: "transparent",
            type: "bool",
            initial: initial ? initial.transparent : false,
        },
        {
            name: "Opacity",
            id: "opacity",
            type: "slider",
            initial: initial ? initial.opacity : 1,
            min: 0,
            max: 1,
        },

        {
            name: "Alpha Map",
            id: "alphaMap",
            type: "texture",
            initial: initial ? initial.alphaMap : null,
        },

        { id: "n003", type: "lineDivider" },

        {
            name: "AO intensity",
            id: "aoMapIntensity",
            type: "float",
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

const getPhysicalMaterialProperties = (initial) => {
    const properties = [
        {
            name: "Wireframe",
            id: "wireframe",
            type: "bool",
            initial: initial ? initial.wireframe : false,
        },
        {
            name: "Double Sided",
            id: "doubleSided",
            type: "bool",
            initial: initial ? initial.doubleSided : false,
        },
        {
            name: "Flat Shading",
            id: "flatShading",
            type: "bool",
            initial: initial ? initial.flatShading : false,
        },
        {
            name: "Fog",
            id: "fog",
            type: "bool",
            initial: initial ? initial.fog : false,
        },
        { id: "n001", type: "lineDivider" },
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
        { id: "n002", type: "lineDivider" },

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
        { id: "n003", type: "lineDivider" },

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
        { id: "n004", type: "lineDivider" },

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
        { id: "n005", type: "lineDivider" },

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
        { id: "n006", type: "lineDivider" },
        {
            name: "Transparent",
            id: "transparent",
            type: "bool",
            initial: initial ? initial.transparent : false,
        },
        {
            name: "Opacity",
            id: "opacity",
            type: "slider",
            initial: initial ? initial.opacity : 1,
            min: 0,
            max: 1,
        },
        {
            name: "Alpha Map",
            id: "alphaMap",
            type: "texture",
            initial: initial ? initial.alphaMap : null,
        },

        { id: "n007", type: "lineDivider" },

        {
            name: "AO intensity",
            id: "aoMapIntensity",
            type: "float",
            initial: initial ? initial.aoMapIntensity : 1,
        },
        {
            name: "AO Map",
            id: "aoMap",
            type: "texture",
            initial: initial ? initial.aoMap : null,
        },

        { id: "n008", type: "lineDivider" },

        {
            name: "Clearcoat",
            id: "clearcoat",
            type: "float",
            initial: initial ? initial.clearcoat : 1,
        },
        {
            name: "Clearcoat Map",
            id: "clearcoatMap",
            type: "texture",
            initial: initial ? initial.clearcoatMap : null,
        },

        {
            name: "Clearcoat Roughness",
            id: "clearcoatRoughness",
            type: "slider",
            initial: initial ? initial.clearcoatRoughness : 0.6,
            min: 0,
            max: 1,
        },
        {
            name: "Clearcoat Roughness Map",
            id: "clearcoatRoughnessMap",
            type: "texture",
            initial: initial ? initial.clearcoatRoughnessMap : null,
        },
        {
            name: "Clearcoat Normal Scale",
            id: "clearcoatNormalScale",
            type: "vector",
            initial: initial ? initial.clearcoatNormalScale : [1, 1, 0],
        },
        {
            name: "Clearcoat Normal Map",
            id: "clearcoatNormalMap",
            type: "texture",
            initial: initial ? initial.clearcoatNormalMap : null,
        },

        { id: "n009", type: "lineDivider" },
        {
            name: "Sheen",
            id: "sheen",
            type: "float",
            initial: initial ? initial.sheen : 0,
        },
        {
            name: "Sheen Color",
            id: "sheenColor",
            type: "color",
            initial: initial ? initial.color : { r: 255, g: 255, b: 255, a: 1 },
        },
        {
            name: "Sheen Color Map",
            id: "sheenColorMap",
            type: "texture",
            initial: initial ? initial.sheenColorMap : null,
        },
        {
            name: "Sheen Roughness",
            id: "sheenRoughness",
            type: "slider",
            initial: initial ? initial.sheenRoughness : 0.6,
            min: 0,
            max: 1,
        },
        {
            name: "Sheen Roughness Map",
            id: "sheenRoughnessMap",
            type: "texture",
            initial: initial ? initial.sheenRoughnessMap : null,
        },
        { id: "n010", type: "lineDivider" },
        {
            name: "Specular Intensity",
            id: "specularIntensity",
            type: "float",
            initial: initial ? initial.specularIntensity : 0,
        },
        {
            name: "Specular Intensity Map",
            id: "specularIntensityMap",
            type: "texture",
            initial: initial ? initial.specularIntensityMap : null,
        },
        {
            name: "Specular Color",
            id: "specularColor",
            type: "color",
            initial: initial ? initial.specularColor : { r: 255, g: 255, b: 255, a: 1 },
        },
        {
            name: "Specular Color Map",
            id: "specularColoMap",
            type: "texture",
            initial: initial ? initial.specularColoMap : null,
        },

        { id: "n011", type: "lineDivider" },
        {
            name: "Thickness",
            id: "thickness",
            type: "float",
            initial: initial ? initial.thickness : 0.0,
        },
        {
            name: "Thickness Map",
            id: "thicknessMap",
            type: "texture",
            initial: initial ? initial.thicknessMap : null,
        },

        { id: "n012", type: "lineDivider" },
        {
            name: "IOR",
            id: "ior",
            type: "float",
            initial: initial ? initial.ior : 1.5,
        },
        {
            name: "Reflectivity",
            id: "reflectivity",
            type: "float",
            initial: initial ? initial.reflectivity : 0.0,
        },

        {
            name: "Transmission",
            id: "transmission",
            type: "float",
            initial: initial ? initial.transmission : 0.0,
        },
        {
            name: "Transmission Map",
            id: "transmissionMap",
            type: "texture",
            initial: initial ? initial.transmissionMap : null,
        },
    ];
    return properties;
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
            name: "Double Sided",
            id: "doubleSided",
            type: "bool",
            initial: initial ? initial.doubleSided : false,
        },
        {
            name: "Flat Shading",
            id: "flatShading",
            type: "bool",
            initial: initial ? initial.flatShading : false,
        },
        {
            name: "Fog",
            id: "fog",
            type: "bool",
            initial: initial ? initial.fog : false,
        },
        { id: "n001", type: "lineDivider" },

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
        { id: "n002", type: "lineDivider" },

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
        { id: "n003", type: "lineDivider" },

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
        { id: "n004", type: "lineDivider" },

        {
            name: "Normal Scale",
            id: "normalScale",
            type: "vector",
            initial: initial ? initial.normalScale : [1, 1, 0],
        },
        {
            name: "Normal Map",
            id: "normalMap",
            type: "texture",
            initial: initial ? initial.normalMap : null,
        },
        { id: "n005", type: "lineDivider" },

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
        { id: "n006", type: "lineDivider" },
        {
            name: "Transparent",
            id: "transparent",
            type: "bool",
            initial: initial ? initial.transparent : false,
        },
        {
            name: "Opacity",
            id: "opacity",
            type: "slider",
            initial: initial ? initial.opacity : 1,
            min: 0,
            max: 1,
        },
        {
            name: "Alpha Map",
            id: "alphaMap",
            type: "texture",
            initial: initial ? initial.alphaMap : null,
        },

        { id: "n007", type: "lineDivider" },

        {
            name: "AO intensity",
            id: "aoMapIntensity",
            type: "float",
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

export { getMaterialProperties };
