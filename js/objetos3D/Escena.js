import {Object3D} from "./Object3D.js";
import {Terreno} from "./Terreno.js";
import {MurallaCompleta} from "./MurallaCompleta.js";
import {Path} from "../curvas/Path.js";
import {SweptSurface} from "../curvas/SweptSurface.js";

class Escena extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){

        let controlPoints1 = [
            [[0,0.375,0],[0.01,0.375,0],[0.07,0.375,0],[0.08,0.375,0]],
            [[0.08,0.375,0],[0.08,0.38,0],[0.08,0.39,0],[0.08,0.40,0]],
            [[0.08,0.4,0],[0.085,0.4,0],[0.095,0.4,0],[0.1,0.4,0]],
            [[0.1,0.4,0],[0.1,0.39,0],[0.1,0.36,0],[0.1,0.35,0]],
            [[0.1,0.35,0],[0.05,0.3,0],[0.11,0.1,0],[0.1,0,0]]
        ];
        let shape = new Path(controlPoints1, 0.1);

        let controlPoints2 = [
            [[-0.5,0,0],[-0.25,0,0],[0.25,0,0],[0.5,0,0]]
        ];
        let path = new Path(controlPoints2, 0.1);

        this.addChild(new SweptSurface(shape, path))

        let terreno = new Terreno();

        this.addChild(terreno)
        let muralla = new MurallaCompleta();
        muralla.init();

        this.addChild(muralla);
    }
}

export {Escena}