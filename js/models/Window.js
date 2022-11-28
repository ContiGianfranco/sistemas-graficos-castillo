import {Cube} from "../object3D/Cube.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";

class Window extends Cube {

    constructor() {
        let material = new Material("../../assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);

        super(0.05, 0.1, 0.025, colors.black, material);
    }

}

export {Window}