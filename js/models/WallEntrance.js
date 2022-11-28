import {Cube} from "../object3D/Cube.js";
import {Object3D} from "../object3D/Object3D.js";
import {Wall} from "./Wall.js";
import {Door} from "./WallDoor.js";
import {app} from "../main.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";

class WallEntrance extends Object3D {

    constructor() {
        super(null,null,null,null,null);

        let h = app.wallHigth*0.7;

        let material = new Material("../../assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);

        let side = new Cube(1/15,h,0.11, colors.stoneGrey, material);
        side.trasladar([-2/15,h/2,0])
        this.addChild(side)

        side = new Cube(1/15,h,0.11, colors.stoneGrey, material);
        side.trasladar([2/15,h/2,0])
        this.addChild(side)

        let top = new Cube(1/3,1/15,0.11, colors.stoneGrey, material);
        top.trasladar([0,h+0.025,0])
        this.addChild(top)

        let wall = new Wall();
        wall.escalar([1/3,1,1]);
        wall.trasladar([1,0,0]);
        this.addChild(wall);

        wall = new Wall();
        wall.escalar([1/3,1,1]);
        wall.trasladar([-1,0,0]);
        this.addChild(wall);


        let alfa = app.doorAngle;
        let door = new Door();
        door.rotar(alfa, [1,0,0])
        this.addChild(door);
    }

}

export {WallEntrance}