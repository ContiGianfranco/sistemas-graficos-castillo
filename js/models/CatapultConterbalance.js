import colors from "../constants/colors.js";
import {Cylinder} from "../object3D/Cylinder.js";
import {Trapezoid} from "../object3D/Trapezoid.js";
import {Cube} from "../object3D/Cube.js";
import {Material} from "../materials/Material.js";

class CatapultConterbalance extends Cylinder {

    constructor() {
        let material = new Material("../../assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 1., 2.);

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

        material = new Material("../../assets/textures/ConcreteWall01_MR_1K/ConcreteWall01_1K_BaseColor.png", 1., 1.);

        let materials = {
            'topT': material,
            'bottomT': material,
            'frontT': material,
            'backT': material,
            'leftT': material,
            'rightT': material
        }

        let weight = new Cube(0.15,0.15,0.15, colors.stoneGrey, materials);
        weight.trasladar([-0.14,0,0])
        this.addChild(weight)

        this.rotar(Math.PI/2, [0,0,1])
    }

}

export {CatapultConterbalance}