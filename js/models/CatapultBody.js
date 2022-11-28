import colors from "../constants/colors.js";
import {Cube} from "../object3D/Cube.js";
import {CatapultAxis} from "./CatapultAxis.js";
import {Material} from "../materials/Material.js";

class CatapultBody extends Cube {

    constructor() {
        let material = new Material("../../assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);
        super(0.35, 0.04, 0.75, colors.wood, material);

        let axis = new CatapultAxis();
        axis.trasladar([0, 0, 0.35]);
        this.addChild(axis);

        axis = new CatapultAxis();
        axis.trasladar([0, 0, -0.35]);
        this.addChild(axis);
    }

}

export {CatapultBody}