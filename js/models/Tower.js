import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.2.js";

class Tower extends RevolutionCurve {

    constructor() {

        let controlPoints = [
            [[0,0.375,0],[0,0.375,0],[0.08,0.375,0],[0.08,0.375,0]],
            [[0.08,0.375,0],[0.08,0.375,0],[0.08,0.40,0],[0.08,0.40,0]],
            [[0.08,0.4,0],[0.09,0.4,0],[0.09,0.4,0],[0.1,0.4,0]],
            [[0.1,0.4,0],[0.1,0.4,0],[0.1,0.35,0],[0.1,0.35,0]],
            [[0.1,0.35,0],[0.05,0.3,0],[0.11,0.1,0],[0.1,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        super(path);
    }

}

export {Tower}