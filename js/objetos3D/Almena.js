import {Object3D} from "./Object3D.js";
import {cubicCurve} from "../curvas/curva_bezier.js";
import {RevolutionCurve} from "./RevolutionCurve.js";

function getPos(alfa,beta){

    let controlPoints1 = [[0.1,0,0.40],[0.1,0,0.39],[0.1,0,0.36],[0.1,0,0.35]]
    let controlPoints2 = [[0.08,0,0.40],[0.09,0,0.40],[0.09,0,0.40],[0.1,0,0.40]]
    let controlPoints3 = [[0.08,0,0.375],[0.08,0,0.375],[0.08,0,0.40],[0.08,0,0.40]]
    let controlPoints4 = [[0.0,0,0.375],[0.0,0,0.375],[0.08,0,0.375],[0.08,0,0.375]]

    let point;

    if (beta <= 1/4) {
        point = cubicCurve(beta*4, controlPoints1);
    } else if (beta <= 2/4){
        point = cubicCurve((beta-1/4)*4, controlPoints2);
    } else if (beta <= 3/4){
        point = cubicCurve((beta-2/4)*4, controlPoints3);
    } else {
        point = cubicCurve((beta-3/4)*4, controlPoints4);
    }

    let x = point.x*Math.cos(alfa*2*Math.PI);
    let y = point.x*Math.sin(alfa*2*Math.PI);
    let z = point.z;

    return [x,z,y];
}

function getNrm(alfa,beta){

    var p=getPos(alfa,beta);
    var v=glMatrix.vec3.create();
    glMatrix.vec3.normalize(v,p);

    var delta=0.005;
    var p1=getPos(alfa,beta);
    var p2=getPos(alfa,beta+delta);
    var p3=getPos(alfa+delta,beta);

    var v1=glMatrix.vec3.fromValues(p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]);
    var v2=glMatrix.vec3.fromValues(p3[0]-p1[0],p3[1]-p1[1],p3[2]-p1[2]);

    glMatrix.vec3.normalize(v1,v1);
    glMatrix.vec3.normalize(v2,v2);

    var n=glMatrix.vec3.create();
    glMatrix.vec3.cross(n,v2,v1);
    return n;
}

class Almena extends Object3D {

    constructor() {
        super(null,null,null);
    }

    init(){
        let controlPoints1 = [[0.1,0,0.40],[0.1,0,0.39],[0.1,0,0.36],[0.1,0,0.35]];
        let almenaFront = new RevolutionCurve(controlPoints1);
        this.addChild(almenaFront);

        let controlPoints2 = [[0.08,0,0.40],[0.09,0,0.40],[0.09,0,0.40],[0.1,0,0.40]];
        let almenaTop1 = new RevolutionCurve(controlPoints2);
        this.addChild(almenaTop1);

        let controlPoints3 = [[0.08,0,0.375],[0.08,0,0.375],[0.08,0,0.40],[0.08,0,0.40]];
        let almenaBack = new RevolutionCurve(controlPoints3);
        this.addChild(almenaBack);

        let controlPoints4 = [[0.0,0,0.375],[0.0,0,0.375],[0.08,0,0.375],[0.08,0,0.375]];
        let almenaTop2 = new RevolutionCurve(controlPoints4);
        this.addChild(almenaTop2);
    }

}

export {Almena}