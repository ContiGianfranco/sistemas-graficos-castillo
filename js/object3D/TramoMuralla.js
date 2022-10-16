import {Object3D} from "./Object3D.js";
import {Tower} from "../models/Tower.js";
import {Wall} from "../models/Wall.js";


class TramoMuralla extends Object3D {

    constructor(scale) {
        super(null,null,null);

        let muralla = new Wall();
        muralla.rotar(Math.PI/2, [0,1,0]);
        muralla.escalar([scale, 1, 1])
        this.addChild(muralla);

        let torre = new Tower();
        torre.trasladar([0.0,0.0,scale/2]);
        this.addChild(torre);
    }

}

export {TramoMuralla}