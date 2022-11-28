import {Scene} from "./object3D/Scene.js";
import {Camara} from "./camara/Camara.js";

let mat4=glMatrix.mat4;

let gl = null,
    canvas = null;

export let viewMatrix = mat4.create();
export let projMatrix = mat4.create();

let escena = null;

let time = 0;
let isAnimated = false;

let app = {
    'castleSides': 5,
    'doorAngle': Math.PI/3,
    'wallHigth': 0.4,
    'width': 0.7,
    'length': 0.7,
    'floors': 3,
    'catapult': 3.9,
    'animate': function(){
        isAnimated=true;
    }
}

async function initWebGL() {

    canvas = document.getElementById("my-canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    try {
        gl = canvas.getContext("webgl");
    } catch (e) {
        alert("Error: Your browser does not appear to support WebGL.");
    }

    if (gl) {

        setupWebGL();
        GUI();
        await initShaders();
        tick();

    } else {
        alert("Error: Your browser does not appear to support WebGL.");
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

const compileShader = async (
    src, type
) => {
    const shaderSrc = await Promise.all([
        fetch(src)
            .then((value)=> {
                return value.text()
            })
    ]);



    //compile shaders
    return makeShader(shaderSrc, type);
}

async function initShaders() {
    let fs_source = document.getElementById('shader-fs').innerHTML;

    let textureFragmentShader = makeShader(fs_source, gl.FRAGMENT_SHADER)
    let vertexShader = await compileShader('../shaders/vertexShaders.glsl', gl.VERTEX_SHADER)

    window.glTextureProgram = gl.createProgram();

    gl.attachShader(glTextureProgram, vertexShader);
    gl.attachShader(glTextureProgram, textureFragmentShader);
    gl.linkProgram(glTextureProgram);

    if (!gl.getProgramParameter(glTextureProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the textures shader program.");
    }
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

export function setupVertexShaderMatrix(program){
    let viewMatrixUniform  = gl.getUniformLocation(program, "viewMatrix");
    let projMatrixUniform  = gl.getUniformLocation(program, "projMatrix");

    gl.uniformMatrix4fv(viewMatrixUniform, false, viewMatrix);
    gl.uniformMatrix4fv(projMatrixUniform, false, projMatrix);
}

function drawScene(){

    let m1 = glMatrix.mat4.create();
    let m2 = glMatrix.mat4.create();

    escena.draw(m1, m2);
}

function updateCamara(){
    window.camara.setViewMatrix(viewMatrix);
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

}

window.onload= await initWebGL;

export {gl, app}