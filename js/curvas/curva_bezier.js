let Base0, Base1, Base2, Base3;

Base0=function(u) { return (1-u)*(1-u)*(1-u);}  // 1*(1-u) - u*(1-u) = 1-2u+u2  ,  (1-2u+u2) - u +2u2- u3 ,  1 - 3u +3u2 -u3

Base1=function(u) { return 3*(1-u)*(1-u)*u; } // 3*(1-u)*(u-u2) , 3*(u-u2-u2+u3), 3u -6u2+2u3

Base2=function(u) { return 3*(1-u)*u*u;} //3u2-3u3

Base3=function(u) { return u*u*u; }

function cubicCurve(u,controlPoints){

    const p0 = controlPoints[0];
    const p1 = controlPoints[1];
    const p2 = controlPoints[2];
    const p3 = controlPoints[3];

    let point = {};

    point.x=Base0(u)*p0[0]+Base1(u)*p1[0]+Base2(u)*p2[0]+Base3(u)*p3[0];
    point.y=Base0(u)*p0[1]+Base1(u)*p1[1]+Base2(u)*p2[1]+Base3(u)*p3[1];
    point.z=Base0(u)*p0[2]+Base1(u)*p1[2]+Base2(u)*p2[2]+Base3(u)*p3[2];

    return point;
}

function getCurve(controlPoints, delta){

    let points = [];

    for (let u=0; u<=1; u=u+delta){
        let point = cubicCurve(u, controlPoints);

        points.push(point);
    }

    return points;
}

export {cubicCurve}