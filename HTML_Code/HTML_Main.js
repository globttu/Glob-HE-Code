const canvas = document.getElementById('GlobRenderCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert('WebGL not supported');
    throw new Error("WebGL not supported");
}

// Vertex shader program
const vsSource = `
  attribute vec4 aVertexPosition;
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`;

// Fragment shader program
const fsSource = `
  void main(void) {
    gl_FragColor = vec4(0.3, 0.8, 1.0, 1.0);
  }
`;

function loadShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);

// Create shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

// Collect shader attributes/uniforms
const programInfo = {
    program: shaderProgram,
    attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
};

// Cube vertices
const cubeVertices = [
    // Front
    -1, -1,  1,
    1, -1,  1,
    1,  1,  1,
    -1,  1,  1,
    // Back
    -1, -1, -1,
    -1,  1, -1,
    1,  1, -1,
    1, -1, -1,
    // Top
    -1,  1, -1,
    -1,  1,  1,
    1,  1,  1,
    1,  1, -1,
    // Bottom
    -1, -1, -1,
    1, -1, -1,
    1, -1,  1,
    -1, -1,  1,
    // Right
    1, -1, -1,
    1,  1, -1,
    1,  1,  1,
    1, -1,  1,
    // Left
    -1, -1, -1,
    -1, -1,  1,
    -1,  1,  1,
    -1,  1, -1,
];

const cubeIndices = [
    0,  1,  2,     0,  2,  3,   // front
    4,  5,  6,     4,  6,  7,   // back
    8,  9, 10,     8, 10, 11,   // top
    12, 13, 14,    12, 14, 15,   // bottom
    16, 17, 18,    16, 18, 19,   // right
    20, 21, 22,    20, 22, 23,   // left
];

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeIndices), gl.STATIC_DRAW);

function drawScene(rotation) {
    gl.clearColor(0, 0, 0, 1);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;

    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, -6]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0, 1, 1]);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        3, gl.FLOAT, false, 0, 0
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}

// Matrix helper (load from CDN or manually include)
import { mat4 } from 'gl-matrix';

let rotation = 0;
function renderLoop() {
    /*rotation += 0.01;*/
    drawScene(rotation);
    requestAnimationFrame(renderLoop);
}
window.onload = () => {
    renderLoop();
}