/**************************************
 *
 * Jean-Christophe Taveau
 * 2017/02/06
 ***************************************/

// Utilisation du code fourni dans le pdf du cours

//get a graphics context
let gpuEnv = gpu.getGraphicsContext('gpuframe'); // a mettre dans le html ?

// Vertex Shader
let src_vs = `#version 300 es
    //inputs : vertices + texture coordinates
    in vec2 a_vertex;
    in vec2 a_texCoord;
    
    //resolution = (1/w,1/h)
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
    precision highp float;

    in vec2 v_texCoord;
    uniform sampler2D u_raster;

    //Declare an output for the fragment shader
    out vec4 outColor;

    void main() {
        outColor = vec4(1.0 - texture(u_raster, v_texCoord).rgb, 1.0);
    }
`;

let program = gpu.createProgram(gpuEnv,src_vs,src_fs);

//Create an instance of gpuProcessor 
let gproc = gpu.createGPU(gpuEnv,raster.width,raster.height);

//Create geometry buffers (aka ArrayBuffer)
gproc.geometry({
    type: 'TRIANGLE_STRIP',
    num: 4,
    vertices: new Float32Array([
        0.0,0.0,0.0,0.0,
        0.0,h  ,0.0,1.0,
        w  ,0.0,1.0,0.0,
        w  ,h  ,1.0,1.0])
})

//Define attributes and create VertexArray object
gproc.attribute('a_vertex',2,'float',16,0) //X, Y
    .attribute('a_texCoord',2,'float',16,8) //S, T
    .packWith(program) //VAO (VertexArrayObject ?)

//Define vertices + texture coordinates
gproc.texture(raster,texUnit = 4); //texture(raster,unit=0, wrap='clamp',mini='nearest', mag= 'nearest')


//Load program and run 
//clear canvas 
gproc.clearCanvas([0.0,1.0,0.0,1.0]);
gproc.preprocess()
    .uniform('u_resolution',
            new Float32Array([1.0/raster.width,1.0/raster.height])
    )
    .uniform('u_raster',texUnit);
//Run the process
gproc.run();
