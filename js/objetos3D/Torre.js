import {Object3D} from "./Object3D.js";
import {gl} from "../main.js";
import {cubicCurve} from "../curvas/curva_bezier.js";
import {Almena} from "./Almena.js";

function getPos(alfa,beta){

    let controlPoints1 = [[0.1,0,0.35],[0.05,0,0.3],[0.15,0,0.1],[0.1,0,0]]

    let point = cubicCurve(beta, controlPoints1)


    let x = point.x*Math.cos(alfa*2*Math.PI);
    let y = point.x*Math.sin(alfa*2*Math.PI);
    let z = point.z;

    return [x,z,y];
}

function getNrm(alfa,beta){

    var p=getPos(alfa,beta);
    var v=glMatrix.vec3.create();
    glMatrix.vec3.normalize(v,p);

    var delta=0.001;
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

class Torre extends Object3D {

    constructor() {

        let pos = [];
        let normal=[];
        let rows=50;
        let cols=50;

        for (let i=0;i<rows;i++){
            for (let j=0;j<cols;j++){

                let alfa=j/(cols-1);
                let beta=(i/(rows-1));

                let p=getPos(alfa,beta);

                pos.push(p[0]);
                pos.push(p[1]);
                pos.push(p[2]);

                let n=getNrm(alfa,beta);

                normal.push(n[0]);
                normal.push(n[1]);
                normal.push(n[2]);
            }

        }

        let trianglesVerticeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
        trianglesVerticeBuffer.itemSize = 3;
        trianglesVerticeBuffer.numItems = pos.length / 3;


        let trianglesNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);
        trianglesNormalBuffer.itemSize = 3;
        trianglesNormalBuffer.numItems = normal.length / 3;

        let index=[];

        for (let i=0;i<rows-1;i++){
            index.push(i*cols);
            for (let j=0;j<cols-1;j++){
                index.push(i*cols+j);
                index.push((i+1)*cols+j);
                index.push(i*cols+j+1);
                index.push((i+1)*cols+j+1);
            }
            index.push((i+1)*cols+cols-1);
        }


        let trianglesIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
        trianglesIndexBuffer.number_vertex_point = index.length;
        trianglesIndexBuffer.itemSize = 1;
        trianglesIndexBuffer.numItems = index.length;

        super(trianglesVerticeBuffer,trianglesIndexBuffer,trianglesNormalBuffer);
    }

    init(){
        let almena = new Almena();
        almena.init();
        this.addChild(almena);
    }

}

export {Torre}