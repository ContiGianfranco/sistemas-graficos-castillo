import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";
import colors from '../constants/colors.js';
import {Plane} from "../object3D/Plane.js";
import {Material} from "../materials/Material.js";

class Terrain extends RevolutionCurve {

    constructor() {

        let controlPoints = [
            [[0,0,0],[0.25,0,0],[0.75,0,0],[1.15,0,0]],
            [[1.15,0,0],[1.15,-0.3,0],[1.5,-0.3,0],[1.5,0,0]],
            [[1.5,0,0],[3,0,0],[4,0,0.0],[5,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        super(path);

        this.color = colors.grassGreen;
        this.material = new Material("../../assets/textures/Grass01_MR_1K/Grass01_1K_BaseColor.png", 60., 20.);

        let water = new Plane(3,3, colors.brightBlue);
        water.trasladar([0,-0.05,0])
        this.addChild(water)
    }
}

export {Terrain}