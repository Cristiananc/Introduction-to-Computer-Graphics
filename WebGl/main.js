var canvas = document.getElementById('my_canvas');
var gl = canvas.getContext('experimental-webgl');
 
//Geometria
var vertices = [
    //Face frontal
    -1, -1, 1,  -1, 1, 1,   1, -1, 1,   1, 1, 1, 
    //Face lateral direita
    1, -1, 1,   1, -1, -1,  1, 1, -1,   1, 1, 1,
    //Face debaixo
    1, -1, 1,   1, -1, -1,  -1,-1,-1,   -1,-1,1,
    //Face lateral esquerda
    -1,-1,1,    -1,-1,-1,   -1,1,-1,    -1,1,1,
    //Face de cima
    -1, 1, 1,   1, 1, 1,    1, 1, -1,   -1,1,-1,  
    //Face de trás
    -1, 1, -1,  1,1,-1,     1,-1,-1,    -1,-1,-1    
];

var indices = [
    0, 1, 2,    1, 2, 3,      4, 5, 6,        6, 7, 4,
    8, 9, 10,   10, 11, 8,    12, 13, 15,     15, 14, 13,
    16,17,18,   18, 19, 16,   20, 21, 22,     22,23,20        
];

var cores = [
    5,3,7, 5,3,7, 5,3,7, 5,3,7,
    1,1,3, 1,1,3, 1,1,3, 1,1,3,
    0,0,1, 0,0,1, 0,0,1, 0,0,1,
    1,0,0, 1,0,0, 1,0,0, 1,0,0,
    1,1,0, 1,1,0, 1,1,0, 1,1,0,
    0,1,0, 0,1,0, 0,1,0, 0,1,0
/*    255,243,0,   255,243,0,   255,243,0,    255,243,0,
    232, 95, 12,    232, 95, 12,    232, 95, 12,    232, 95, 12,
    225, 0, 255,    225, 0, 255,    225, 0, 255,    225, 0, 255,
    12, 116, 232,   12, 116, 232,   12, 116, 232,   12, 116, 232,
    3, 255, 39,     3, 255, 39,     3, 255, 39,     3, 255, 39,
    64, 224, 208,   64, 224, 208,   64, 224, 208,   64, 224, 208
*/
];
    
//Buffer vertíces
 var vertex_buffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

//Buffer indíces
 var index_buffer = gl.createBuffer();
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
 
 //Buffer Cores
 var cores_buffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, cores_buffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cores), gl.STATIC_DRAW);

 //Shader Vertíces
 var vertexCode = 'attribute vec3 coordinates;' +
    'attribute vec3 color;' +
    'varying vec3 vColor;' +

    'void main(void) {' +
       'gl_Position = vec4(coordinates, 1.0);' +
       'vColor = color;' +
    '}';

 var vertexShader = gl.createShader(gl.VERTEX_SHADER);
 gl.shaderSource(vertexShader, vertexCode);
 gl.compileShader(vertexShader);

 //Repito os comandos agora para o fragment shader
 var fragmentCode = 'precision mediump float;' +
 'varying vec3 vColor; ' +
    'void main(void) {' +
        'gl_FragColor = vec4(vColor, 1.);' +
    '}';

 var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
 gl.shaderSource(fragmentShader, fragmentCode);
 gl.compileShader(fragmentShader);

 //Crio um programa combinando o vertex shader e o fragment shader
 var program = gl.createProgram();
 gl.attachShader(program, vertexShader);
 gl.attachShader(program, fragmentShader);
 gl.linkProgram(program);

 //Associo shaders aos objetos buffer
 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 var coord = gl.getAttribLocation(program, "coordinates");
 gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(coord);

 //Repito o processo para aplicar cores
 gl.bindBuffer(gl.ARRAY_BUFFER, cores_buffer);
 var cor = gl.getAttribLocation(program, "color");
 gl.vertexAttribPointer(cor, 3, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(cor);
 
 gl.useProgram(program);

 //Antes de desenhar as primitivas é preciso fazer algumas operações
 
 gl.enable(gl.DEPTH_TEST);
 gl.clearDepth(1.0);
 gl.clearColor(2, 5 ,0.5, 1) //Método para mudar a cor de fundo

 //View Port
 gl.viewport(0,0, canvas.width, canvas.height);
 gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

 //Desenho
 //gl.bindBuffer(gl.ARRAY_BUFFER, index_buffer);
 gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
