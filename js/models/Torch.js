import {Object3D} from "../object3D/Object3D.js";
import {Sphere} from "../object3D/Sphere.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";
import {Cube} from "../object3D/Cube.js";

class Torch extends Object3D {

    constructor() {
        super(null, null, null, null, null);

        let material = new Material("../../assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);

        this.addChild(new Sphere(0.015,colors.stoneGrey, material));

        let scale = 5;

        let materialT = new Material("../../assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.01*scale, 0.01*scale);
        let materialF = new Material("../../assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.01*scale, 0.055*scale);
        let materialS = new Material("../../assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.01*scale, 0.055*scale);

        let materials = {
            'topT': materialT,
            'bottomT': materialT,
            'frontT': materialF,
            'backT': materialF,
            'leftT': materialS,
            'rightT': materialS
        }

        let cube = new Cube(0.01, 0.055, 0.01, colors.wood, materials);
        cube.trasladar([0,-0.04,0])
        this.addChild(cube)
    }

}

export {Torch}