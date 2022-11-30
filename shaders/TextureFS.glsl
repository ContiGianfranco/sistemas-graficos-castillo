precision highp float;

uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosWorld;

vec3 lightVec;
vec3 diffColor;
vec3 color;

varying highp vec2 vUv;

vec2 uvScaled;

uniform float uScale;
uniform float vScale;
uniform sampler2D uSampler;

uniform vec3 uViewerPosition;
uniform float uGlossiness;
uniform float uKsFactor;

uniform vec3 directColor;
uniform vec3 ia;

// Iluminacion ambiental de Phong
vec3 phongAmbientIllumination(vec4 textureColor) {
    vec3 ka = textureColor.xyz;
    vec3 ambientIllumination = ka * ia * 0.1;

    return ambientIllumination;
}

vec3 directPhong(vec3 lightVec, vec4 textureColor) {

    // Iluminacion difusa de Phong
    vec3 kd = textureColor.xyz;
    vec3 id = directColor;
    vec3 diffuseIllumination = clamp(dot(lightVec, vNormal), 0.0, 1.0)*kd*id;

    // Iluminacion especular de Phong
    vec3 ks = vec3(1.0,1.0,1.0);
    vec3 is = directColor;
    vec3 viewerVector = normalize(uViewerPosition);
    vec3 reflectionVector = reflect(-lightVec, vNormal);
    float RdotV = clamp(dot(reflectionVector, viewerVector), 0.0, 1.0);
    vec3 specularIllumination = pow(RdotV, uGlossiness)*ks*is*uKsFactor;

    vec3 phongIllumination = diffuseIllumination + specularIllumination;
    return phongIllumination;
}

void main(void) {

    uvScaled.x = vUv.x * uScale;
    uvScaled.y = vUv.y * vScale;

    vec4 textureColor = texture2D(uSampler,uvScaled);
    vec3 sunDirection = normalize( vec3(1.0,1.0,1.0) );

    vec3 ambientIllumination = phongAmbientIllumination(textureColor);
    vec3 directIlumination = directPhong(sunDirection,textureColor);

    vec3 resultColor = ambientIllumination + directIlumination;

    gl_FragColor = vec4(resultColor.xyz,1.0);
}