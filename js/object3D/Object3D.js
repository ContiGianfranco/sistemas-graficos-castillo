import {gl, glProgram} from "../main.js";


class Object3D {
    constructor(vertexBuffer,indexBuffer,normalBuffer, uvBuffer) {
        this.vertexBuffer=vertexBuffer;
        this.indexBuffer=indexBuffer;
        this.normalBuffer=normalBuffer;
        this.trianglesUvBuffer = uvBuffer;

        this.modelMatrix=glMatrix.mat4.create();
        this.normalMatrix=glMatrix.mat4.create();

        this.childes=[];
    }

    draw(matrix,normal){
        let modelMatrix = glMatrix.mat4.create();
        let normalMatrix = glMatrix.mat4.create();

        glMatrix.mat4.multiply(modelMatrix,matrix,this.modelMatrix);
        glMatrix.mat4.multiply(normalMatrix,normal,this.normalMatrix);

        // setupVertexShaderMatrix
        let modelMatrixUniform = gl.getUniformLocation(glProgram, "modelMatrix");
        let normalMatrixUniform = gl.getUniformLocation(glProgram, "normalMatrix");

        gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrix);
        gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);

        if (this.vertexBuffer && this.indexBuffer && this.normalBuffer){
            if (this.color){
                gl.uniform3f(gl.getUniformLocation(glProgram, "uColor"), this.color[0], this.color[1], this.color[2]);
            }

            if (this.material){
                this.material.apply();
            }

            let vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
            gl.enableVertexAttribArray(vertexPositionAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

            let vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
            gl.enableVertexAttribArray(vertexNormalAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(vertexNormalAttribute, this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

            let vertexUvAttribute = gl.getAttribLocation(glProgram, "aVertexUv");
            gl.enableVertexAttribArray(vertexUvAttribute);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglesUvBuffer);
            gl.vertexAttribPointer(vertexUvAttribute, 2, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.drawElements(gl.TRIANGLE_STRIP, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }

        for (let i = 0;i < this.childes.length; i++){
            this.childes[i].draw(modelMatrix,normalMatrix);
        }
    }

    rotar(angulo,eje){
        glMatrix.mat4.rotate(this.modelMatrix,this.modelMatrix,angulo,eje);
        glMatrix.mat4.rotate(this.normalMatrix,this.normalMatrix,angulo,eje);
    }

    escalar(escala){
        glMatrix.mat4.scale(this.modelMatrix,this.modelMatrix,escala);
    }

    trasladar(pos){
        glMatrix.mat4.translate(this.modelMatrix,this.modelMatrix,pos);
    }

    addChild(child){
        this.childes.push(child);
    }
}

export {Object3D}