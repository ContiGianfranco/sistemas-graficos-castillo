import {Object3D} from "./Object3D.js";
import {TramoMuralla} from "./TramoMuralla.js";


class MurallaCompleta extends Object3D {

    constructor() {

        super(null,null,null);
    }

    init(){
        let n = 6;
        let alfa = 0;
        for (let i=0;i<n;i++){
            let tramo = new TramoMuralla();
            tramo.init();
            tramo.rotar(alfa, [0.0,1.0,0.0])
            let d = 0.5/(Math.tan(Math.PI/n));
            tramo.trasladar([d,0.0,0.0]);
            this.addChild(tramo);
            alfa += 2*Math.PI/n
        }
    }

}

export {MurallaCompleta}