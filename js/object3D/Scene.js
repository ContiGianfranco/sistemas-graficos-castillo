import {Object3D} from "./Object3D.js";
import {Terreno} from "./Terreno.js";
import {MurallaCompleta} from "./MurallaCompleta.js";
import {Castle} from "../models/Castle.js";

class Scene extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){
        let terreno = new Terreno();
        this.addChild(terreno);

        let muralla = new MurallaCompleta();
        muralla.init();
        this.addChild(muralla);

        this.addChild(new Castle());
    }
}

export {Scene}