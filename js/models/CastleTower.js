import {Object3D} from "../objetos3D/Object3D.js";
import {CastleTowerMainBody} from "./CastleTowerMainBody.js";
import {CastleTowerRoof} from "./CastleTowerRoof.js";

class CastleTower extends Object3D {

    constructor() {
        super(null, null, null);

        this.addChild(new CastleTowerMainBody());

        let roof = new CastleTowerRoof();
        roof.trasladar([0,0.65,0])
        this.addChild(roof)
    }

}

export {CastleTower}