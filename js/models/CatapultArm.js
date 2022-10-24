import colors from "../constants/colors.js";
import {Cube} from "../object3D/Cube.js";
import {CatapultConterbalance} from "./CatapultConterbalance.js";
import {Object3D} from "../object3D/Object3D.js";

class CatapultArm extends Object3D {

    constructor() {
        super(null,null,null);
        let cube = new Cube(0.05, 0.04, 0.8, colors.wood);
        cube.trasladar([0,0,-0.25])
        this.addChild(cube);

        cube = new Cube(0.15, 0.04, 0.17, colors.wood);
        cube.trasladar([0,0,-0.6]);
        this.addChild(cube);


        let balance = new CatapultConterbalance();
        balance.trasladar([0,0,0.13]);
        this.addChild(balance)
    }

}

export {CatapultArm}