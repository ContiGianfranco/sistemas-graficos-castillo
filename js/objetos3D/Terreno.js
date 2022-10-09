import {Object3D} from "./Object3D.js";
import {RevolutionCurve} from "./RevolutionCurve.js";

class Terreno extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){
        let controlPoints1 = [[1.5,0,0],[1.5,0,0],[5,0,0.0],[5,0,0]];
        let territorio = new RevolutionCurve(controlPoints1);
        this.addChild(territorio);

        let controlPoints2 = [[1,0,0],[1.1,0,-0.3],[1.4,0,-0.3],[1.5,0,0]];
        let fosa = new RevolutionCurve(controlPoints2);
        this.addChild(fosa);

        let controlPoints3 = [[0,0,0],[0,0,0],[1,0,0],[1,0,0]];
        let terreno = new RevolutionCurve(controlPoints3);
        this.addChild(terreno);
    }

}

export {Terreno}