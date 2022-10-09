import {Object3D} from "./Object3D.js";
import {SuperficieDeBarrido} from "./SuperficieDeBarrido.js";
import {Muro} from "./Muro.js";


class Muralla extends Object3D {

    constructor() {

        super(null,null,null);
    }

    init(){
        let wallFront = new Muro();
        wallFront.init();
        this.addChild(wallFront);

        let wallBack = new Muro();
        wallBack.init();
        wallBack.rotar(Math.PI, [0.0,1.0,0.0])
        this.addChild(wallBack);

    }

}

export {Muralla}