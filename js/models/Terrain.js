import {Path} from "../curvas/Path.js";
import {RevolutionCurve} from "../curvas/RevolutionCurve.js";
import colors from '../constants/colors.js';
import {Plane} from "../object3D/Plane.js";
import {BlendTextureMaterial} from "../materials/BlendTextureMaterial.js";

class Terrain extends RevolutionCurve {

    constructor() {

        let controlPoints = [
            [[0,0,0],[0.25,0,0],[0.75,0,0],[1.15,0,0]],
            [[1.15,0,0],[1.15,-0.3,0],[1.5,-0.3,0],[1.5,0,0]],
            [[1.5,0,0],[3,0,0],[4,0,0.0],[5,0,0]]
        ];
        let path = new Path(controlPoints, 0.1);

        let paths = [
            "../../assets/textures/terrain/tierra.jpg",
            "../../assets/textures/terrain/roca.jpg",
            "../../assets/textures/terrain/pasto.jpg"
        ]

        let material = new BlendTextureMaterial(paths, 3., 1.);

        super(path, material);
        this.color = colors.grassGreen;

        let water = new Plane(3,3, colors.brightBlue, material);
        water.trasladar([0,-0.05,0])
        this.addChild(water)
    }
}

export {Terrain}