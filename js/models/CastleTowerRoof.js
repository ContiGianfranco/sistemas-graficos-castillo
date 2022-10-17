import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";
import colors from "../constants/colors.js";

class CastleTowerRoof extends RevolutionCurve {

    constructor() {

        let controlPoints = [
            [[0,0.20,0],[0.025,0.1,0],[0.05,0.025,0],[0.1,0,0]],
            [[0.1,0,0],[0.075,0,0],[0.025,0,0],[0,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        super(path);

        this.color = colors.brightBlue;
    }

}

export {CastleTowerRoof}