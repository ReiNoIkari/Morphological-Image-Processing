/**************************************
 *
 * Jean-Christophe Taveau
 * 2017/02/06
 ***************************************/

// Utilisation du code fourni dans le pdf du cours

// Vertex Shader
let gpuEnv = gpu.getGraphicContext('gpuframe');

let src_vs = `#version 300 es
    in vec2 a_vertex;
    in vec2 a_texCoord;

    uniform vec2 u_resolution;

    out vec2 v_texCoord;

    void main() {
        v_texCoord = a_texCoord;
        vec2 clipSpace = a_vertex * u_resolution * 2.0 - 1.0;
        gl_Position = vec4( clipSpace * vec2(1.0,-1.0), 0.0, 1.0);
    }
`;


// Fragment Shader

let src_fs = `#version 300 es
    precision mediump float;

    in vec2 v_texCoord;
    uniform sampler2D u_raster;

    //Declare an output for the fragment shader
    out vec4 outColor;

    void main() {
        outColor = texture(u_raster, v_texCoord);
    }
`;

let program = gpu.createProgram(gpuEnv,src_vs,src_fs);