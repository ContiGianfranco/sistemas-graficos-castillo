import {Object3D} from "./Object3D.js";
import {Terreno} from "./Terreno.js";
import {MurallaCompleta} from "./MurallaCompleta.js";
import {Tower} from "../models/Tower.js";

class Escena extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){
        this.addChild(new Tower())

        let terreno = new Terreno();
        terreno.init();

        this.addChild(terreno)
        let muralla = new MurallaCompleta();
        muralla.init();

        this.addChild(muralla);
    }
}

export {Escena}