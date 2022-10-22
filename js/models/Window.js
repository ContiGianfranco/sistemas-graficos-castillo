import {Cube} from "../object3D/Cube.js";
import colors from "../constants/colors.js";

class Window extends Cube {

    constructor() {
        super(0.05, 0.1, 0.025, colors.black);
    }

}

export {Window}