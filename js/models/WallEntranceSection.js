import {Tower} from "./Tower.js"
import {WallEntrance} from "./WallEntrance.js";
import {Object3D} from "../objetos3D/Object3D.js";


class WallEntranceSection extends Object3D {

    constructor() {
        super(null,null,null);

        let entrance = new WallEntrance();
        entrance.rotar(Math.PI/2, [0,1,0]);
        this.addChild(entrance);

        let torre = new Tower();
        torre.trasladar([0.0,0.0,.5]);
        this.addChild(torre);
    }

}

export {WallEntranceSection}