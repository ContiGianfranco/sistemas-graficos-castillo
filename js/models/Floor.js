import {Cube} from "../object3D/Cube.js";
import {Object3D} from "../object3D/Object3D.js";
import colors from "../constants/colors.js";

class Floor extends Object3D {

    constructor() {
        super(null,null,null);

        let floor = new Cube(0.7,0.19,0.7, colors.khaki);
        floor.trasladar([0,0.19/2,0])
        this.addChild(floor)

        let detail = new Cube(0.71,0.01,0.71, colors.greenCopperOxide);
        detail.trasladar([0,0.19+0.01/2,0]);
        this.addChild(detail)
    }

}

export {Floor}