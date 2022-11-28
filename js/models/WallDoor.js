import {Cube} from "../object3D/Cube.js";
import {Object3D} from "../object3D/Object3D.js";
import colors from "../constants/colors.js";
import {app} from "../main.js";
import {Material} from "../materials/Material.js";

class Door extends Object3D {

    constructor() {
        super(null, null, null, null);

        let h = app.wallHigth*0.7;

        let material = new Material("../../assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);

        let door = new Cube(1/5,h,0.025, colors.wood, material);
        door.trasladar([0,h/2,0]);
        this.addChild(door)
    }

}

export {Door}