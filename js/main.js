import {Terreno} from "./objetos3D/Terreno.js";

var mat4=glMatrix.mat4;
var vec3=glMatrix.vec3;

var gl = null,
    canvas = null,

    glProgram = null,
    fragmentShader = null,
    vertexShader = null;

var vertexPositionAttribute = null,
    trianglesVerticeBuffer = null,
    vertexNormalAttribute = null,
    trianglesNormalBuffer = null,
    trianglesIndexBuffer = null;

var modelMatrix = mat4.create();
var viewMatrix = mat4.create();
var projMatrix = mat4.create();
var normalMatrix = mat4.create();
var rotate_angle = 0;

let terrain = null;


function initWebGL(){

    canvas = document.getElementById("my-canvas");

    try{
        gl = canvas.getContext("webgl");
    }catch(e){
        alert(  "Error: Your browser does not appear to support WebGL.");
    }

    if(gl) {

        setupWebGL();
        initShaders();
        setupBuffers();
        setupVertexShaderMatrix();
        tick();

    }else{
        alert(  "Error: Your browser does not appear to support WebGL.");
    }

}

function setupWebGL(){
    gl.enable(gl.DEPTH_TEST);
    //set the clear color
    gl.clearColor(0.1, 0.1, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, canvas.width, canvas.height);

    // Matrix de Proyeccion Perspectiva

    mat4.perspective(projMatrix,45, canvas.width / canvas.height, 0.1, 100.0);

    mat4.identity(viewMatrix);
    mat4.translate(viewMatrix,viewMatrix, [0.0, -1.0, -5.0]);

    terrain = new Terreno();
}

function initShaders(){
    //get shader source
    var fs_source = document.getElementById('shader-fs').innerHTML,
        vs_source = document.getElementById('shader-vs').innerHTML;

    //compile shaders
    vertexShader = makeShader(vs_source, gl.VERTEX_SHADER);
    fragmentShader = makeShader(fs_source, gl.FRAGMENT_SHADER);

    //create program
    glProgram = gl.createProgram();

    //attach and link shaders to the program
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    //use program
    gl.useProgram(glProgram);
}

function makeShader(src, type){
    //compile the vertex shader
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("Error compiling shader: " + gl.getShaderInfoLog(shader));
    }
    return shader;
}

function getPos(alfa,beta){

    return [alfa-0.5,0,beta-0.5];
}

function getNrm(alfa,beta){

    if (alfa==Math.PI && beta==2*Math.PI){
        return vec3.fromValues(0,1,0)
    }

    var p=getPos(alfa,beta);
    var v=vec3.create();
    vec3.normalize(v,p);

    var delta=0.05;
    var p1=getPos(alfa,beta);
    var p2=getPos(alfa,beta+delta);
    var p3=getPos(alfa+delta,beta);

    var v1=vec3.fromValues(p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]);
    var v2=vec3.fromValues(p3[0]-p1[0],p3[1]-p1[1],p3[2]-p1[2]);

    vec3.normalize(v1,v1);
    vec3.normalize(v2,v2);

    var n=vec3.create();
    vec3.cross(n,v1,v2);
    return n;
}

function setupBuffers(){
    var pos=[];
    var normal=[];
    var rows=256;
    var cols=256;

    for (var i=0;i<rows;i++){
        for (var j=0;j<cols;j++){

            var alfa=j/(cols-1);
            var beta=(i/(rows-1));

            var p=getPos(alfa,beta);

            pos.push(p[0]);
            pos.push(p[1]);
            pos.push(p[2]);

            var n=getNrm(alfa,beta);

            normal.push(n[0]);
            normal.push(n[1]);
            normal.push(n[2]);
        }

    }

    trianglesVerticeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);


    trianglesNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.STATIC_DRAW);

    var index=[];

    for (var i=0;i<rows-1;i++){
        index.push(i*cols);
        for (var j=0;j<cols-1;j++){
            index.push(i*cols+j);
            index.push((i+1)*cols+j);
            index.push(i*cols+j+1);
            index.push((i+1)*cols+j+1);
        }
        index.push((i+1)*cols+cols-1);
    }


    trianglesIndexBuffer = gl.createBuffer();
    trianglesIndexBuffer.number_vertex_point = index.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);
}

function setupVertexShaderMatrix(){
    var modelMatrixUniform = gl.getUniformLocation(glProgram, "modelMatrix");
    var viewMatrixUniform  = gl.getUniformLocation(glProgram, "viewMatrix");
    var projMatrixUniform  = gl.getUniformLocation(glProgram, "projMatrix");
    var normalMatrixUniform  = gl.getUniformLocation(glProgram, "normalMatrix");

    gl.uniformMatrix4fv(modelMatrixUniform, false, modelMatrix);
    gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
    gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
    gl.uniformMatrix4fv(normalMatrixUniform, false, normalMatrix);
}

function drawScene(){
    setupVertexShaderMatrix();

    let m1 = glMatrix.mat4.create();
    let m2 = glMatrix.mat4.create();
    terrain.rotar(0.1,[0.0, 1.0, 1.0]);
    terrain.draw(m1, m2);

    vertexPositionAttribute = gl.getAttribLocation(glProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    vertexNormalAttribute = gl.getAttribLocation(glProgram, "aVertexNormal");
    gl.enableVertexAttribArray(vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffer);
    gl.vertexAttribPointer(vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, trianglesIndexBuffer);
    gl.drawElements( gl.TRIANGLE_STRIP, trianglesIndexBuffer.number_vertex_point, gl.UNSIGNED_SHORT, 0);
}

function animate(){

    rotate_angle += 0.1;
    mat4.identity(modelMatrix);
    mat4.rotate(modelMatrix,modelMatrix, rotate_angle, [0.0, 1.0, 1.0]);


    mat4.identity(normalMatrix);
    mat4.multiply(normalMatrix,viewMatrix,modelMatrix);
    mat4.invert(normalMatrix,normalMatrix);
    mat4.transpose(normalMatrix,normalMatrix);

}

function tick(){

    requestAnimationFrame(tick);
    drawScene();
    animate();
}

window.onload=initWebGL;

export {gl, glProgram}