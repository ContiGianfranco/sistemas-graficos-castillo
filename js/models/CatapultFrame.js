import {Object3D} from "../object3D/Object3D.js";
import {CatapultArm} from "./CatapultArm.js";
import {Trapezoid} from "../object3D/Trapezoid.js";
import {Cylinder} from "../object3D/Cylinder.js";
import colors from "../constants/colors.js";

class CatapultFrame extends Object3D {

    constructor() {
        super(null, null, null);

        let arm = new CatapultArm();
        this.addChild(arm)

        let suport = new Cylinder(0.25,0.019,colors.black);
        suport.rotar(Math.PI/2,[0,0,1])
        this.addChild(suport)

        suport = new Trapezoid(0.2, 0.05,0.4,0.025,colors.wood);
        suport.rotar(Math.PI/2,[0,1,0])
        suport.trasladar([0,-0.15,0.1])
        this.addChild(suport);

        suport = new Trapezoid(0.2, 0.05,0.4,0.025,colors.wood);
        suport.rotar(Math.PI/2,[0,1,0])
        suport.trasladar([0,-0.15,-0.1])
        this.addChild(suport);

        this.alfa = Math.PI/4
    }

}

export {CatapultFrame}