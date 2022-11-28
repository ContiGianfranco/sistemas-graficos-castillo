import colors from "../constants/colors.js";
import {Cylinder} from "../object3D/Cylinder.js";
import {Trapezoid} from "../object3D/Trapezoid.js";
import {Cube} from "../object3D/Cube.js";
import {Material} from "../materials/Material.js";

class CatapultConterbalance extends Cylinder {

    constructor() {
        let material = new Material("../../assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);

        super(0.12, 0.012, colors.black, material);

        let suport = new Trapezoid(0.08,0.05,0.1, 0.015, colors.wood, material);
        suport.rotar(Math.PI/2,[0,1,0])
        suport.rotar(Math.PI/2,[1,0,0])
        suport.trasladar([0,-0.02,0.05])
        this.addChild(suport)

        suport = new Trapezoid(0.08,0.05,0.1, 0.015, colors.wood, material);
        suport.rotar(Math.PI/2,[0,1,0])
        suport.rotar(Math.PI/2,[1,0,0])
        suport.trasladar([0,-0.02,-0.05])
        this.addChild(suport)

        let weight = new Cube(0.15,0.15,0.15, colors.stoneGrey, material);
        weight.trasladar([-0.14,0,0])
        this.addChild(weight)

        this.rotar(Math.PI/2, [0,0,1])
    }

}

export {CatapultConterbalance}