import {Path} from "../curvas/Path.js";
import {SweptSurface} from "../curvas/SweptSurface.js";

class Wall extends SweptSurface {

    constructor() {

        let controlPoints1 = [
            [[0,0.375,0],[0.01,0.375,0],[0.07,0.375,0],[0.08,0.375,0]],
            [[0.08,0.375,0],[0.08,0.38,0],[0.08,0.39,0],[0.08,0.40,0]],
            [[0.08,0.4,0],[0.085,0.4,0],[0.095,0.4,0],[0.1,0.4,0]],
            [[0.1,0.4,0],[0.1,0.39,0],[0.1,0.36,0],[0.1,0.35,0]],
            [[0.1,0.35,0],[0.05,0.3,0],[0.11,0.1,0],[0.1,0,0]]
        ];
        let shape = new Path(controlPoints1, 0.1);

        let controlPoints2 = [
            [[-0.5,0,0],[-0.25,0,0],[0.25,0,0],[0.5,0,0]]
        ];
        let path = new Path(controlPoints2, 0.1);

        super(shape, path);
    }

}

export {Wall}