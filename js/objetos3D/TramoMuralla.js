import {Object3D} from "./Object3D.js";
import {Muralla} from "./Muralla.js";
import {Torre} from "./Torre.js";


class TramoMuralla extends Object3D {

    constructor() {

        super(null,null,null);
    }

    init(){
        let muralla = new Muralla();
        muralla.init();
        muralla.escalar([1,0.75,1])
        this.addChild(muralla);

        let torre = new Torre();
        torre.init();
        torre.trasladar([0.0,0.0,.5]);
        this.addChild(torre);
    }

}

export {TramoMuralla}