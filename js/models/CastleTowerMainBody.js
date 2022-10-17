import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";
import colors from "../constants/colors.js";

class CastleTowerMainBody extends RevolutionCurve {

    constructor() {

        let controlPoints = [
            [[0.07,0.65,0],[0.07,0.6,0],[0.07,0.55,0],[0.07,0.5,0]],
            [[0.07,0.5,0],[0.07,0.46,0],[0.05,0.43,0],[0.05,0.4,0]],
            [[0.05,0.4,0],[0.05,0.3,0],[0.05,0.1,0],[0.05,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        super(path);

        this.color = colors.khaki;
    }

}

export {CastleTowerMainBody}