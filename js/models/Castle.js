import {Object3D} from "../objetos3D/Object3D.js";
import {Floor} from "./Floor.js";
import {CastleTower} from "./CastleTower.js";

class Castle extends Object3D {

    constructor() {
        super(null,null,null);

        let n = 3;

        for (let i=0; i<n; i++){
            let floor = new Floor();
            floor.trasladar([0,i*0.2,0]);
            this.addChild(floor);
        }


        for (let i=0; i<2; i++){
            for (let j=0; j<2; j++){
                let tower = new CastleTower();
                tower.trasladar([-0.35+0.7*i, 0, -0.35+0.7*j]);
                this.addChild(tower);
            }
        }
    }

}

export {Castle}