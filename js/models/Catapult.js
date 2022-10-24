import {Object3D} from "../object3D/Object3D.js";
import {CatapultFrame} from "./CatapultFrame.js";
import {CatapultBody} from "./CatapultBody.js";
import {app} from "../main.js";

class Catapult extends Object3D {

    constructor() {
        super(null, null, null);

        let frame = new CatapultFrame();
        frame.rotar(app.catapult,[0,1,0])
        frame.trasladar([0,0.35,0.18])
        this.addChild(frame);

        let body = new CatapultBody();
        body.rotar(app.catapult,[0,1,0])
        this.addChild(body);
    }

}

export {Catapult}