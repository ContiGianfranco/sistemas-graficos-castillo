precision highp float;

varying vec3 vPosWorld;
varying vec3 vNormal;
uniform vec3 uViewerPosition;
uniform float uGlossiness;

vec3 directPhong(vec3 lightVec, vec4 textureColor) {

    // Iluminacion ambiental de Phong
    vec3 ka = vec3(0.16,0.33,0.78);
    vec3 ia = vec3(1.0,1.0,1.0);
    vec3 ambientIllumination = ka * ia * 1.0 / 10.0;

    // Iluminacion difusa de Phong
    vec3 kd = textureColor.xyz;
    vec3 id = vec3(1.0,1.0,1.0);
    vec3 diffuseIllumination = clamp(dot(lightVec, vNormal), 0.0, 1.0)*kd*id;

    // Iluminacion especular de Phong
    vec3 ks = vec3(1.0,1.0,1.0);
    vec3 is = vec3(1.0,1.0,1.0);
    vec3 viewerVector = normalize(uViewerPosition-vPosWorld);
    vec3 reflectionVector = normalize(2.0*vNormal*dot(lightVec, vNormal) - lightVec);
    float RdotV = clamp(dot(reflectionVector, viewerVector), 0.0, 1.0);
    vec3 specularIllumination = pow(RdotV, uGlossiness)*ks*is;

    vec3 phongIllumination = ambientIllumination + (diffuseIllumination + specularIllumination);
    return phongIllumination;
}
