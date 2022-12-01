import {Object3D} from "../object3D/Object3D.js";
import {CatapultArm} from "./CatapultArm.js";
import {Trapezoid} from "../object3D/Trapezoid.js";
import {Cylinder} from "../object3D/Cylinder.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";

class CatapultFrame extends Object3D {

    constructor() {
        super(null, null, null,null, null);

        let arm = new CatapultArm(0);
        this.addChild(arm)

        let material = new Material("../../docs/assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 3., 3.);

        let suport = new Cylinder(0.25,0.019,colors.black, material);
        suport.rotar(Math.PI/2,[0,0,1])
        this.addChild(suport)

        let scale = 6;

        let materialT = new Material("../../docs/assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.1*scale, 0.025*scale);
        let materialF = new Material("../../docs/assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor.png", 0.6, 1.2);
        let materialS = new Material("../../docs/assets/textures/WoodenPlanks01_MR_1K/WoodenPlanks01_1K_BaseColor_rotated.png",  0.4*scale,0.025*scale);

        let materials = {
            'topT': materialT,
            'bottomT': materialT,
            'frontT': materialF,
            'backT': materialF,
            'leftT': materialS,
            'rightT': materialS
        }

        suport = new Trapezoid(0.2, 0.1,0.4,0.025,colors.wood, materials);
        suport.rotar(Math.PI/2,[0,1,0])
        suport.trasladar([0,-0.15,0.1])
        this.addChild(suport);

        suport = new Trapezoid(0.2, 0.1,0.4,0.025,colors.wood, materials);
        suport.rotar(Math.PI/2,[0,1,0])
        suport.trasladar([0,-0.15,-0.1])
        this.addChild(suport);

        this.alfa = Math.PI/4
    }

    animate(time){
        let arm = new CatapultArm(time*this.alfa);
        arm.rotar(time*this.alfa, [1,0,0]);
        this.childes[0] = arm;
    }
}

export {CatapultFrame}