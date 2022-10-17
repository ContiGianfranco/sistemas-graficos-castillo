import {Object3D} from "./Object3D.js";
import {Plane} from "./Plane.js";

class Cube extends Object3D {

    constructor(length, high, width, color) {
        super(null,null,null);

        let plane = new Plane(length, high, color);
        plane.rotar(Math.PI/2, [1,0,0]);
        plane.trasladar([0,width/2,0]);
        this.addChild(plane);

        plane = new Plane(length, width, color);
        plane.trasladar([0,high/2,0])
        this.addChild(plane);

        plane = new Plane(length, width, color);
        plane.rotar(Math.PI, [1,0,0]);
        plane.trasladar([0,high/2,0])
        this.addChild(plane);

        plane = new Plane(length, high, color);
        plane.rotar(-Math.PI/2, [1,0,0]);
        plane.trasladar([0,width/2,0])
        this.addChild(plane);

        plane = new Plane(high, width, color);
        plane.rotar(Math.PI/2, [0,0,1]);
        plane.trasladar([0,length/2,0])
        this.addChild(plane);

        plane = new Plane(high, width, color);
        plane.rotar(-Math.PI/2, [0,0,1]);
        plane.trasladar([0,length/2,0])
        this.addChild(plane);
    }

}

export {Cube}