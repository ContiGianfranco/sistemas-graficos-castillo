import {Object3D} from "./Object3D.js";
import {Terrain} from "../models/Terrain.js";
import {FullWall} from "../models/FullWall.js";
import {Castle} from "../models/Castle.js";
import {CatapultSystem} from "../models/CatapultSystem.js";

class Scene extends Object3D {

    constructor() {
        super(null,null,null,null, null);
    }

    init(){
        let catapult = new CatapultSystem();
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

    animate(time){
        this.childes[0].animate(time);
    }
}

export {Scene}