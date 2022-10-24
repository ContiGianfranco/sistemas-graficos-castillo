import colors from "../constants/colors.js";
import {Cylinder} from "../object3D/Cylinder.js";

class CatapultAxis extends Cylinder {

    constructor() {
        super(0.4, 0.01, colors.black);

        let wheel = new Cylinder(0.02,0.08, colors.wood);
        wheel.trasladar([0,0.188,0]);
        this.addChild(wheel)

        wheel = new Cylinder(0.02,0.08, colors.wood);
        wheel.trasladar([0,-0.188,0]);
        this.addChild(wheel)

        this.rotar(Math.PI/2, [0,0,1])
    }

}

export {CatapultAxis}