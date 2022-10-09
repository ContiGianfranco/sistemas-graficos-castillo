import {Object3D} from "./Object3D.js";
import {SuperficieDeBarrido} from "./SuperficieDeBarrido.js";


class Muro extends Object3D {

    constructor() {

        super(null,null,null);
    }

    init(){
        let controlPoints1 = [[0.05,0,0.35],[0.0,0,0.3],[0.06,0,0.1],[0.05,0,0]]
        let front = new SuperficieDeBarrido(controlPoints1);
        this.addChild(front);

        let controlPoints2 = [[0.05,0,0.38],[0.05,0,0.38],[0.05,0,0.35],[0.05,0,0.35]]
        let almenaFront = new SuperficieDeBarrido(controlPoints2);
        this.addChild(almenaFront);

        let controlPoints3 = [[0.03,0,0.38],[0.03,0,0.38],[0.05,0,0.38],[0.05,0,0.38]]
        let almenaTop = new SuperficieDeBarrido(controlPoints3);
        this.addChild(almenaTop);

        let controlPoints4 = [[0.03,0,0.35],[0.03,0,0.35],[0.03,0,0.38],[0.03,0,0.38]]
        let almenaBack = new SuperficieDeBarrido(controlPoints4);
        this.addChild(almenaBack);

        let controlPoints5 = [[0.0,0,0.35],[0.0,0,0.35],[0.03,0,0.35],[0.03,0,0.35]]
        let almenaFlor = new SuperficieDeBarrido(controlPoints5);
        this.addChild(almenaFlor);
    }

}

export {Muro}