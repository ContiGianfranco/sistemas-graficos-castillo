import {Scene} from "./objetos3D/Scene.js";

let mat4=glMatrix.mat4;

let gl = null,
    canvas = null,

    glProgram = null,
    fragmentShader = null,
    vertexShader = null;

let viewMatrix = mat4.create();
let projMatrix = mat4.create();

let escena = null;

let app = {
    'castleSides': 5
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

    mat4.identity(viewMatrix);
    mat4.rotate(viewMatrix,viewMatrix, 0.6,[1.0, 0.0, 0.0])
    mat4.translate(viewMatrix,viewMatrix, [0.0, -1, -2]);

    reloadScene();
}

function reloadScene(){
    escena = new Scene();
    escena.init();
}

function initShaders(){
    //get shader source
    let fs_source = document.getElementById('shader-fs').innerHTML,
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

function animate(){
    escena.rotar(0.01,[0.0, 1.0, 0.0]);
}

function tick(){
    requestAnimationFrame(tick);
    drawScene();
    animate();
}

function GUI (){

    let gui = new dat.GUI();

    // definimos una carpeta comandos en la variable f1
    let f1 = gui.addFolder('Castillo');

    f1.add(app, 'castleSides',4,8).name("Lados de la muralla").step(1).onChange(reloadScene)

    f1.open(); // hace que la carpeta f1 inicie abierta

}

window.onload=initWebGL;

export {gl, glProgram, app}