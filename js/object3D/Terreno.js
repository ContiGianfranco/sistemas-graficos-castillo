import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";

class Terreno extends RevolutionCurve {

    constructor() {

        let controlPoints = [
            [[0,0,0],[0.25,0,0],[0.75,0,0],[1.15,0,0]],
            [[1.15,0,0],[1.15,-0.3,0],[1.5,-0.3,0],[1.5,0,0]],
            [[1.5,0,0],[3,0,0],[4,0,0.0],[5,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        super(path);
    }
}

export {Terreno}