import {Object3D} from "../object3D/Object3D.js";
import {app} from "../main.js";
import {Catapult} from "./Catapult.js";

class CatapultSystem extends Object3D {

    constructor() {
        super(null, null, null);

        let catapult = new Catapult();
        catapult.rotar(app.catapult,[0,1,0])
        this.addChild(catapult);
    }

    animate(time){
        this.childes[0].animate(time)
    }
}

export {CatapultSystem}