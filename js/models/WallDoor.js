import {Cube} from "../object3D/Cube.js";
import {Object3D} from "../object3D/Object3D.js";
import colors from "../constants/colors.js";

class Door extends Object3D {

    constructor() {
        super(null, null, null);

        let door = new Cube(1/5,0.25,0.025, colors.wood);
        door.trasladar([0,0.25/2,0]);
        this.addChild(door)
    }

}

export {Door}