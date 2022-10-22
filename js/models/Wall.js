import {Path} from "../curvas/Path.js";
import {SweptSurface} from "../curvas/SweptSurface.js";
import colors from "../constants/colors.js";
import {app} from "../main.js";

class Wall extends SweptSurface {

    constructor() {

        let h = app.wallHigth*0.7;

        let controlPoints1 = [
            [[-0.05,0,0],[-0.06,h*(2/7),0],[-0.0,h*0.75,0],[-0.05,h,0]],
            [[-0.05,h,0],[-0.05,h+0.01,0],[-0.05,h+0.04,0],[-0.05,h+0.05,0]],
            [[-0.05,h+0.05,0],[-0.045,h+0.05,0],[-0.035,h+0.05,0],[-0.03,h+0.05,0]],
            [[-0.03,h+0.05,0],[-0.03,h+0.04,0],[-0.03,h+0.03,0],[-0.03,h+0.025,0]],
            [[-0.03,h+0.025,0],[-0.02,h+0.025,0],[0.02,h+0.025,0],[0.03,h+0.025,0]],
            [[0.03,h+0.025,0],[0.03,h+0.03,0],[0.03,h+0.04,0],[0.03,h+0.05,0]],
            [[0.03,h+0.05,0],[0.035,h+0.05,0],[0.045,h+0.05,0],[0.05,h+0.05,0]],
            [[0.05,h+0.05,0],[0.05,h+0.04,0],[0.05,h+0.01,0],[0.05,h,0]],
            [[0.05,h,0],[0.0,h*0.75,0],[0.06,h*(2/7),0],[0.035,0,0]]
        ];
        let shape = new Path(controlPoints1, 0.1);

        let controlPoints2 = [
            [[-0.5,0,0],[-0.25,0,0],[0.25,0,0],[0.5,0,0]]
        ];
        let path = new Path(controlPoints2, 0.1);

        super(shape, path);

        this.color = colors.stoneGrey;
    }

}

export {Wall}