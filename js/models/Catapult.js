import {Object3D} from "../object3D/Object3D.js";
import {CatapultFrame} from "./CatapultFrame.js";
import {CatapultBody} from "./CatapultBody.js";
import {Path} from "../curvas/Path.js";
import {Sphere} from "../object3D/Sphere.js";
import colors from "../constants/colors.js";
import {Material} from "../materials/Material.js";

class Catapult extends Object3D {

    constructor() {
        super(null, null, null, null, null);

        let frame = new CatapultFrame();
        frame.trasladar([0,0.35,0.18])
        this.addChild(frame);

        let body = new CatapultBody();
        this.addChild(body);

        let material = new Material("../../docs/assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);

        let sphere = new Sphere(0,colors.stoneGrey, material);
        this.addChild(sphere);

        let path = new Path([
            [[0,0.823,-0.195],[0,5,2.5],[0,-1,10]]
        ], 0.05)
        this.route = path.getPathPosition();
        this.routePos = 0;
    }

    animate(time){
        let material = new Material("../../docs/assets/textures/large_sandstone_blocks_01_1k.blend/textures/large_sandstone_blocks_01_diff_1k.jpg", 7., 7.);

        if (time === 0){
            this.childes[0].animate(time);
            this.childes[2] = new Sphere(0, colors.stoneGrey, material);
            this.routePos = 0;
        } else if (time < 1){
            this.childes[0].animate(time);
        } else {
            this.childes[0].animate(1);
            if (this.route.length > this.routePos){
                let sphere = new Sphere(0.05, colors.stoneGrey, material);
                let pos = this.route[this.routePos];
                sphere.trasladar([pos.x, pos.y, pos.z])
                this.childes[2] = sphere;

                this.routePos += 1
            }
        }
    }
}

export {Catapult}