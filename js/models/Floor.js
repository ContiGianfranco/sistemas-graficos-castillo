import {Cube} from "../object3D/Cube.js";
import {Object3D} from "../object3D/Object3D.js";
import colors from "../constants/colors.js";
import {Window} from "./Window.js";
import {app} from "../main.js";
import {Material} from "../materials/Material.js";

const windowSpacing = 0.15;

class Floor extends Object3D {

    constructor() {
        super(null,null,null,null,null);

        let w = app.width;
        let l = app.length;


        let texture = new Material("../../assets/textures/medieval_blocks_03_1k.blend/textures/medieval_blocks_03_diff_1k.jpg", 11.0, 5.);
        let floor = new Cube(l,0.19,w, colors.khaki, texture);
        floor.trasladar([0,0.19/2,0])
        this.addChild(floor)

        let detail = new Cube(l+0.01,0.01,w+0.01, colors.greenCopperOxide, texture);
        detail.trasladar([0,0.19+0.01/2,0]);
        this.addChild(detail)

        this.setWindowsOnZ([0,0.19/2,w/2])
        this.setWindowsOnX([0,0.19/2,l/2])

        let delta = windowSpacing;

        while ((delta+0.05) < (l/2-0.05)){

            this.setWindowsOnZ([delta,0.19/2,w/2])
            this.setWindowsOnZ([-delta,0.19/2,w/2])

            delta +=windowSpacing;
        }

        delta = windowSpacing;

        while ((delta+0.05) < (w/2-0.05)){

            this.setWindowsOnX([delta,0.19/2,l/2])
            this.setWindowsOnX([-delta,0.19/2,l/2])

            delta +=windowSpacing;
        }

    }

    setWindowsOnZ(pos){
        let window = new Window();
        window.trasladar([pos[0], pos[1], pos[2]])
        this.addChild(window);

        window = new Window();
        window.trasladar([pos[0], pos[1], -pos[2]])
        this.addChild(window);
    }

    setWindowsOnX(pos){
        let window = new Window();
        window.rotar(Math.PI/2,[0,1,0])
        window.trasladar([pos[0], pos[1], pos[2]])
        this.addChild(window);

        window = new Window();
        window.rotar(Math.PI/2,[0,1,0])
        window.trasladar([pos[0], pos[1], -pos[2]])
        this.addChild(window);
    }

}

export {Floor}