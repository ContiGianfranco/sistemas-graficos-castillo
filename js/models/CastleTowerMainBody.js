import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";
import colors from "../constants/colors.js";
import {app} from "../main.js";

class CastleTowerMainBody extends RevolutionCurve {

    constructor() {

        let h = 0.2*(app.floors-1)+0.1;

        let controlPoints = [
            [[0.07,h+0.2,0],[0.07,h+0.19,0],[0.07,h+0.11,0],[0.07,h+0.1,0]],
            [[0.07,h+0.1,0],[0.07,h+0.06,0],[0.05,h+0.03,0],[0.05,h,0]],
            [[0.05,h,0],[0.05,h*0.75,0],[0.05,h*0.25,0],[0.05,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        super(path);

        this.color = colors.khaki;
    }

}

export {CastleTowerMainBody}