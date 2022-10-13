import {Object3D} from "../objetos3D/Object3D.js";
import {gl} from "../main.js";

class SweptSurface extends Object3D {

    constructor(shape, path) {
        let pos = [];
        let normal=[];

        let pathPositions = path.getPathPosition();
        let pathNormals = path.getPathNormals();
        let pathTangents = path.getPathTangents();

        let shapePositions = shape.getPathPosition();
        let shapeNormals = shape.getPathNormals();

        let rows = shapePositions.length;
        let cols = pathPositions.length;

        for (let i=0;i<rows;i++){
            for (let j=0;j<cols;j++){

                let pathPosition = pathPositions[j];

                let pathNormal = pathNormals[j];
                glMatrix.vec3.normalize(pathNormal, pathNormal);

                let pathTangent = glMatrix.vec3.fromValues(pathTangents[j].x, pathTangents[j].y, pathTangents[j].z);
                glMatrix.vec3.normalize(pathTangent, pathTangent);

                let pathBinormal = glMatrix.vec3.create();
                glMatrix.vec3.cross(pathBinormal, pathTangent, pathNormal);
                glMatrix.vec3.normalize(pathBinormal, pathBinormal);

                let mat = glMatrix.mat4.fromValues(
                    pathBinormal[0], pathBinormal[1], pathBinormal[2], 0,
                    pathNormal[0], pathNormal[1], pathNormal[2], 0,
                    pathTangent[0], pathTangent[1], pathTangent[2], 0,
                    pathPosition.x, pathPosition.y, pathPosition.z, 1
                )

                let rMat = glMatrix.mat4.fromValues(
                    pathBinormal[0], pathBinormal[1], pathBinormal[2], 0,
                    pathNormal[0], pathNormal[1], pathNormal[2], 0,
                    pathTangent[0], pathTangent[1], pathTangent[2], 0,
                    0, 0, 0, 1
                )

                let vector = shapePositions[i];
                let shapePosition = glMatrix.vec3.fromValues(vector.x, vector.y, vector.z);

                glMatrix.vec3.transformMat4(shapePosition, shapePosition, mat);

                pos.push(shapePosition[0]);
                pos.push(shapePosition[1]);
                pos.push(shapePosition[2]);

                let shapeNormal = glMatrix.vec3.clone(shapeNormals[i]);

                glMatrix.vec3.transformMat4(shapeNormal, shapeNormal, rMat);

                normal.push(shapeNormal[0]);
                normal.push(shapeNormal[1]);
                normal.push(shapeNormal[2]);
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

}

export {SweptSurface}