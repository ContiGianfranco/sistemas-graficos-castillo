import {Scene} from "./object3D/Scene.js";
import {Camara} from "./camara/Camara.js";

import vertexShaderSource from '../shaders/vertexShaders.glsl';

let mat4=glMatrix.mat4;

let gl = null,
    canvas = null,

    glProgram = null,
    fragmentShader = null,
    vertexShader = null;

let viewMatrix = mat4.create();
let projMatrix = mat4.create();

let escena = null;

let time = 0;
let isAnimated = false;

let app = {
    'castleSides': 5,
    'doorAngle': Math.PI/3,
    'shaderMode': 'Texturas',
    'wallHigth': 0.4,
    'width': 0.7,
    'length': 0.7,
    'floors': 3,
    'catapult': 3.9,
    'animate': function(){
        isAnimated=true;
    }
}

function initWebGL(){

    canvas = document.getElementById("my-canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    try{
        gl = canvas.getContext("webgl");
    }catch(e){
        alert(  "Error: Your browser does not appear to support WebGL.");
    }

    if(gl) {

        setupWebGL();
        GUI();
        initShaders();
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

    window.camara = new Camara(canvas, viewMatrix);

    reloadScene();
}

function reloadScene(){
    escena = new Scene();
    escena.init();
    escena.rotar(-Math.PI/2,[0,1,0])
}

function initShaders(){
    //get shader source
    let fs_source = document.getElementById('shader-fs').innerHTML;

    //compile shaders
    vertexShader = makeShader(vertexShaderSource, gl.VERTEX_SHADER);
    fragmentShader = makeShader(fs_source, gl.FRAGMENT_SHADER);

    //create program
    glProgram = gl.createProgram();

    glProgram.samplerUniform = gl.getUniformLocation(glProgram, "uSampler");

    //attach and link shaders to the program
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    //use program
    gl.useProgram(glProgram);

    setUpShaderMode();
}

function makeShader(src, type){
    //compile the vertex shader
    let shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("Error compiling shader: " + gl.getShaderInfoLog(shader));
    }
    return shader;
}

function setupVertexShaderMatrix(){
    let viewMatrixUniform  = gl.getUniformLocation(glProgram, "viewMatrix");
    let projMatrixUniform  = gl.getUniformLocation(glProgram, "projMatrix");

    gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
    gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
}

function drawScene(){

    let m1 = glMatrix.mat4.create();
    let m2 = glMatrix.mat4.create();

    escena.draw(m1, m2);
}

function setUpShaderMode() {
    if (app.shaderMode === 'Default') {
        setUniformUnsignedInteger("shaderMode", 1)
    } else if (app.shaderMode === 'Normales') {
        setUniformUnsignedInteger("shaderMode", 0)
    } else if (app.shaderMode === 'Texturas'){
        setUniformUnsignedInteger("shaderMode", 2)
    }

}

function setUniformUnsignedInteger(key, value) {
    let tmp  = gl.getUniformLocation(glProgram, key);
    gl.uniform1i(tmp, value);
}

function updateCamara(){
    window.camara.setViewMatrix(viewMatrix);
    let viewMatrixUniform  = gl.getUniformLocation(glProgram, "viewMatrix");
    gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
}

function animate(){
    if (time>=10){
        time=0;
        isAnimated = false;
    } else {
        time+=0.15;
    }

    escena.animate(time)
}

function tick(){
    requestAnimationFrame(tick);
    drawScene();
    if (isAnimated){
        animate();
    }
    updateCamara();
}

function GUI (){

    let gui = new dat.GUI();

    // definimos una carpeta comandos en la variable f1
    let f1 = gui.addFolder('Castillo');

    f1.add(app, 'castleSides',4,8).name("Lados muralla").step(1).onChange(reloadScene)
    f1.add(app, 'wallHigth',0.2,1.8).name("Altura muralla").step(0.1).onChange(reloadScene)
    f1.add(app, 'doorAngle',0,Math.PI/2).name("Entrada").step(0.01).onChange(reloadScene)

    f1.add(app, 'floors',1,4).name("Numero de pisos").step(1).onChange(reloadScene)
    f1.add(app, 'width',0.2,1).name("Ancho").step(0.1).onChange(reloadScene)
    f1.add(app, 'length',0.2,1).name("Largo").step(0.1).onChange(reloadScene)

    let f2 = gui.addFolder('Catapulta');

    f2.add(app, 'catapult', 0,Math.PI*2).step(0.1).name("Direcion").onChange(reloadScene)
    f2.add(app, 'animate').name("Disparar");

    let f3 = gui.addFolder('Rendering');

    f3.add(app, 'shaderMode', ['Default', 'Normales', 'Texturas']).name("Render mode").onChange(setUpShaderMode)

}

window.onload=initWebGL;

export {gl, glProgram, app}