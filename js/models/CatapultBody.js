import colors from "../constants/colors.js";
import {Cube} from "../object3D/Cube.js";
import {CatapultAxis} from "./CatapultAxis.js";

class CatapultBody extends Cube {

    constructor() {
        super(0.35, 0.04, 0.75, colors.wood);

        let axis = new CatapultAxis();
        axis.trasladar([0, 0, 0.35]);
        this.addChild(axis);

        axis = new CatapultAxis();
        axis.trasladar([0, 0, -0.35]);
        this.addChild(axis);
    }

}

export {CatapultBody}