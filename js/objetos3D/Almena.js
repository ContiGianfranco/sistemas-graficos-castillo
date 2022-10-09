import {Object3D} from "./Object3D.js";
import {RevolutionCurve} from "./RevolutionCurve.js";

class Almena extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){
        let controlPoints1 = [[0.1,0,0.40],[0.1,0,0.39],[0.1,0,0.36],[0.1,0,0.35]];
        let almenaFront = new RevolutionCurve(controlPoints1);
        this.addChild(almenaFront);

        let controlPoints2 = [[0.08,0,0.40],[0.09,0,0.40],[0.09,0,0.40],[0.1,0,0.40]];
        let almenaTop1 = new RevolutionCurve(controlPoints2);
        this.addChild(almenaTop1);

        let controlPoints3 = [[0.08,0,0.375],[0.08,0,0.375],[0.08,0,0.40],[0.08,0,0.40]];
        let almenaBack = new RevolutionCurve(controlPoints3);
        this.addChild(almenaBack);

        let controlPoints4 = [[0.0,0,0.375],[0.0,0,0.375],[0.08,0,0.375],[0.08,0,0.375]];
        let almenaTop2 = new RevolutionCurve(controlPoints4);
        this.addChild(almenaTop2);
    }

}

export {Almena}