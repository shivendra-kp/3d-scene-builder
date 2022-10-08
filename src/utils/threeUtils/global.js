import { MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { BoxGeometry, ConeGeometry, CylinderGeometry, PlaneGeometry, SphereGeometry } from "three";
import { getStandardMaterialKeyValue } from "./materials";

const defaulMat = new MeshPhysicalMaterial();
const highlightMat = new MeshStandardMaterial({ color: "orange", emissive: "orange" });

const GEOMETRY = {
    cube: new BoxGeometry(1, 1, 1, 32, 32, 32),
    sphere: new SphereGeometry(0.5, 64, 32),
    cone: new ConeGeometry(0.5, 1.0, 32, 16),
    cylinder: new CylinderGeometry(0.5, 0.5, 1, 32, 16),
    plane: new PlaneGeometry(1, 1, 32, 32),
};

const MATERIAL = {
    data: getStandardMaterialKeyValue(),
    material: new MeshStandardMaterial(),
    highlight: false,
    references: [],
};

export { GEOMETRY, MATERIAL, defaulMat, highlightMat };
