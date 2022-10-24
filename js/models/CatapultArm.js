import colors from "../constants/colors.js";
import {Cube} from "../object3D/Cube.js";
import {CatapultConterbalance} from "./CatapultConterbalance.js";
import {Object3D} from "../object3D/Object3D.js";
import {Sphere} from "../object3D/Sphere.js";

class CatapultArm extends Object3D {

    constructor(alfa) {
        super(null,null,null);

        if (alfa < Math.PI/4){
            let sphere = new Sphere(0.05, colors.stoneGrey);
            sphere.trasladar([0,0.07,-0.6])
            this.addChild(sphere);
        }

        let cube = new Cube(0.05, 0.04, 0.8, colors.wood);
        cube.trasladar([0,0,-0.25])
        this.addChild(cube);

        cube = new Cube(0.15, 0.04, 0.17, colors.wood);
        cube.trasladar([0,0,-0.6]);
        this.addChild(cube);


        let balance = new CatapultConterbalance();
        balance.rotar(alfa, [0,1,0])
        balance.trasladar([-0.13*Math.sin(alfa),0,0.13*Math.cos(alfa)]);
        this.addChild(balance)
    }

}

export {CatapultArm}