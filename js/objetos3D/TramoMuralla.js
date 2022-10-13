import {Object3D} from "./Object3D.js";
import {Tower} from "../models/Tower.js";
import {Wall} from "../models/Wall.js";


class TramoMuralla extends Object3D {

    constructor() {

        super(null,null,null);
    }

    init(){
        let muralla = new Wall();
        muralla.escalar([1,0.7,1]);
        muralla.rotar(Math.PI/2, [0,1,0]);
        this.addChild(muralla);

        let torre = new Tower();
        torre.trasladar([0.0,0.0,.5]);
        this.addChild(torre);
    }

}

export {TramoMuralla}