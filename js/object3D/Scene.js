import {Object3D} from "./Object3D.js";
import {Terrain} from "../models/Terrain.js";
import {FullWall} from "../models/FullWall.js";
import {Castle} from "../models/Castle.js";
import {Catapult} from "../models/Catapult.js";

class Scene extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){
        let catapult = new Catapult();
        catapult.escalar([0.3,0.3,0.3])
        catapult.trasladar([2/0.3,0.085,2/0.3])
        this.addChild(catapult);

        let terreno = new Terrain();
        this.addChild(terreno);

        let muralla = new FullWall();
        muralla.init();
        this.addChild(muralla);

        this.addChild(new Castle());
    }
}

export {Scene}