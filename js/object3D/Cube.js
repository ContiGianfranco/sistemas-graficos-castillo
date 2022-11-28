import {Object3D} from "./Object3D.js";
import {Plane} from "./Plane.js";

class Cube extends Object3D {

    constructor(length, high, width, color, material) {


        super(null,null,null, null, null);
        let plane = new Plane(length, width, color, material);
        plane.trasladar([0,high/2,0])

        this.addChild(plane);
        plane = new Plane(length, width, color, material);
        plane.rotar(Math.PI, [1,0,0]);
        plane.trasladar([0,high/2,0])
        this.addChild(plane);

        plane = new Plane(length, high, color, material);
        plane.rotar(Math.PI/2, [1,0,0]);
        plane.trasladar([0,width/2,0]);
        this.addChild(plane);

        plane = new Plane(length, high, color, material);
        plane.rotar(-Math.PI/2, [1,0,0]);
        plane.trasladar([0,width/2,0])
        this.addChild(plane);


        plane = new Plane(width, high, color, material);
        plane.rotar(-Math.PI/2, [0,1,0]);
        plane.rotar(Math.PI/2, [1,0,0]);
        plane.trasladar([0,length/2,0])
        this.addChild(plane);

        plane = new Plane(width, high, color, material);
        plane.rotar(-Math.PI/2, [0,1,0]);
        plane.rotar(-Math.PI/2, [1,0,0]);
        plane.trasladar([0,length/2,0])
        this.addChild(plane);
    }

}

export {Cube}