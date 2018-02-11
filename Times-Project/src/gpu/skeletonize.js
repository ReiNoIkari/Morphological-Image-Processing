/**************************************
 *
 * Jean-Christophe Taveau
 * 2017/02/06
 ***************************************/

// Use of Literal Strings only available in ES6

// Vertex Shader

const shader_vs = `#version 300 es
    in vec3 aVertexPosition;
    in vec3 aVertexColor;

    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjMatrix;

    out vec3 vColor;
    out vec4 eye;

    void main(void) {
        gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0);
        eye = normalize(- uViewMatrix * uModelMatrix * vec4(aVertexPosition, 1.0));
        gl_PointSize = 30.0;
        vColor = aVertexColor;
    }
`;


// Fragment Shader

const shader_fs = `#version 300 es
    precision mediump float;

    in vec3 vColor;
    out vec4 outputColor;
    const vec3 light = normalize(vec3(0.5,-0.5,0.5));
    const float shininess = 20.0;
    in vec4 eye;



    void main(void) {
        float C = 0.5;
        float r = 0.5;
        float x = gl_PointCoord.x-C;
        float y = gl_PointCoord.y-C;
        if (pow(x,2.0)+pow(y,2.0) > pow(r,2.0)){
            discard;
        }
        float z = sqrt(r*r-x*x-y*y);
        vec3 normal = vec3(x,y,z);
        normal = normalize(normal);
        float kd = dot(normal,light);
        vec3 reflection = normalize(reflect(-light,normal));
        float spAngle = clamp(max(dot(reflection, eye.xyz),0.0),0.0,1.0);
        float ks = pow(spAngle,shininess);
        outputColor = vec4(0.8*ks,0.8*ks,0.8*ks,1.0)+vec4(kd*vColor,1.0);
    }
`;
