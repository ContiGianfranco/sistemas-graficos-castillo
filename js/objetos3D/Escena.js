import {Object3D} from "./Object3D.js";
import {Terreno} from "./Terreno.js";
import {Torre} from "./Torre.js";
import {Muralla} from "./Muralla.js";

class Escena extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){
        let terreno = new Terreno();
        terreno.init();
        this.addChild(terreno)
        //let torre = new Torre();
        //torre.init();
        //this.addChild(torre);
        let muralla = new Muralla();
        muralla.init();
        this.addChild(muralla);
    }
}

export {Escena}