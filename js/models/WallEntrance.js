import {Cube} from "../objetos3D/Cube.js";
import {Object3D} from "../objetos3D/Object3D.js";
import {Wall} from "./Wall.js";
import {Door} from "./WallDoor.js";

class WallEntrance extends Object3D {

    constructor() {
        super(null,null,null);

        let side = new Cube(1/15,0.28,0.11);
        side.trasladar([-2/15,0.28/2,0])
        this.addChild(side)

        side = new Cube(1/15,0.28,0.11);
        side.trasladar([2/15,0.28/2,0])
        this.addChild(side)

        let top = new Cube(1/3,1/15,0.11);
        top.trasladar([0,0.28,0])
        this.addChild(top)

        let wall = new Wall();
        wall.escalar([1/3,1,1]);
        wall.trasladar([1,0,0]);
        this.addChild(wall);

        wall = new Wall();
        wall.escalar([1/3,1,1]);
        wall.trasladar([-1,0,0]);
        this.addChild(wall);


        let alfa = 3.14/4;
        let door = new Door();
        door.rotar(alfa, [1,0,0])
        this.addChild(door);
    }

}

export {WallEntrance}