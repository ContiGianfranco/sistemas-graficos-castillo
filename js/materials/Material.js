import {gl, glProgram} from "../main.js";

function setUniformFloat(key, value) {
    let tmp  = gl.getUniformLocation(glProgram, key);
    gl.uniform1f(tmp, value);
}

function initTexture(file){

    let texture = gl.createTexture();
    texture.image = new Image();

    texture.image.onload = function () {

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 			// invierto el ejeY
        gl.bindTexture(gl.TEXTURE_2D, texture); 						// activo la textura

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);	// cargo el bitmap en la GPU

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);					// selecciono filtro de magnificacion
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);	// selecciono filtro de minificacion

        gl.generateMipmap(gl.TEXTURE_2D);		// genero los mipmaps
        gl.bindTexture(gl.TEXTURE_2D, null);

    }
    texture.image.src = file;

    return texture;
}

class Material {
    constructor(path, uScale, vScale) {
        this.texture = initTexture(path);
        this.scale = {u: uScale, v: vScale}
    }

    apply(){
        setUniformFloat("uScale", this.scale.u);
        setUniformFloat("vScale", this.scale.v);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(glProgram.samplerUniform, 0);
    }
}

export {Material}