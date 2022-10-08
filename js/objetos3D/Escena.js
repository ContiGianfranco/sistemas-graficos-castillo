import {Object3D} from "./Object3D.js";
import {Terreno} from "./Terreno.js";
import {Torre} from "./Torre.js";

class Escena extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){
        this.addChild(new Terreno())
        let torre = new Torre();
        torre.init();
        this.addChild(torre);
    }
}

export {Escena}