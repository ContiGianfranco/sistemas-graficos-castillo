import {Object3D} from "./Object3D.js";
import {TramoMuralla} from "./TramoMuralla.js";
import {WallEntranceSection} from "../models/WallEntranceSection.js";
import {app} from "../main.js";


class MurallaCompleta extends Object3D {

    constructor() {

        super(null,null,null);
    }

    init(){
        let n = app.castleSides;
        let alfa = 0;

        let section = new WallEntranceSection();
        section.rotar(alfa, [0.0,1.0,0.0])
        let d = 0.5/(Math.tan(Math.PI/n));
        section.trasladar([d,0.0,0.0]);
        this.addChild(section);
        alfa += 2*Math.PI/n;

        for (let i=0;i<n-1;i++){
            section = new TramoMuralla();
            section.init();
            section.rotar(alfa, [0.0,1.0,0.0])
            let d = 0.5/(Math.tan(Math.PI/n));
            section.trasladar([d,0.0,0.0]);
            this.addChild(section);
            alfa += 2*Math.PI/n;
        }
    }

}

export {MurallaCompleta}