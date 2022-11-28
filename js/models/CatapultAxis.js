import colors from "../constants/colors.js";
import {Cylinder} from "../object3D/Cylinder.js";
import {Material} from "../materials/Material.js";

class CatapultAxis extends Cylinder {

    constructor() {
        let material = new Material("../../assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);
        super(0.4, 0.01, colors.black, material);

        let wheel = new Cylinder(0.02,0.08, colors.wood, material);
        wheel.trasladar([0,0.188,0]);
        this.addChild(wheel)

        wheel = new Cylinder(0.02,0.08, colors.wood, material);
        wheel.trasladar([0,-0.188,0]);
        this.addChild(wheel)

        this.rotar(Math.PI/2, [0,0,1])
    }

}

export {CatapultAxis}