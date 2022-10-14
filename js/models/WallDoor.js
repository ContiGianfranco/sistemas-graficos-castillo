import {Cube} from "../objetos3D/Cube.js";
import {Object3D} from "../objetos3D/Object3D.js";

class Door extends Object3D {

    constructor() {
        super(null, null, null);

        let door = new Cube(1/5,0.25,0.025);
        door.trasladar([0,0.25/2,0]);
        this.addChild(door)
    }

}

export {Door}