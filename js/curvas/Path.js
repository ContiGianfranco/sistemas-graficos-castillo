import {getCurve, getNormalCurve} from "./curva_bezier.js";

class Path{
    constructor(segments, delta) {
        this.segments = segments;
        this.delta = delta;
    }

    getPathPosition(){
        let positions = [];

        for (let i=0; i < this.segments.length; i++){
            positions = positions.concat(getCurve(this.segments[i], this.delta));
        }

        return positions;
    }

    getPathNormals(){
        let normals = [];

        for (let i=0; i < this.segments.length; i++){
            normals = normals.concat(getNormalCurve(this.segments[i], this.delta));
        }

        return normals;
    }
}

export {Path}