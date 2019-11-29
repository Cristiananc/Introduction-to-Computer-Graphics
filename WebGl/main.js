var canvas = document.getElementById('my_canvas');
var gl = canvas.getContext('experimental-webgl');
 
var vertices = [];
var indices = [];
    
//Definindo a geometria e guardando em objetos buffer
var vertex_buffer = gl.createBuffer();
 
//Buffer vertíce
 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

 //Unbind the buffer
 gl.bindBuffer(gl.ARRAY_BUFFER, null)

 //Indíce
 var index_buffer = gl.createBuffer();
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

 //Vertex shader
 var vertexCode = 'attribute vec3 coordinates;' +
    'void main(void) {' +
       'gl_Position = vec4(coordinates, 1.0);' +
    '}';
 var vertexShader = gl.createShader(gl.VERTEX_SHADER);

 gl.shaderSource(vertexShader, vertexCode);
 gl.compileShader(vertexShader);

 //Repito os comandos agora para o fragment shader
 var fragmentCode = 'void main(void) {' +
    'gl_FragColor = vec4(1, 0.5, 0.0, 1); }';

 var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
 
 gl.shaderSource(fragmentShader, fragmentCode);
 gl.compileShader(fragmentShader);

 //Crio um programa combinando o vertex shader e o fragment shader
 var program = gl.createProgram();
 gl.attachShader(program, vertexShader);
 gl.attachShader(program, fragmentShader);

 gl.linkProgram(program);
 gl.useProgram(program);

 //Associo shaders aos objetos buffer
 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

 var coord = gl.getAttribLocation(program, "coordinates");
 

 //Antes de desenhar as primitivas é preciso fazer algumas operações
 
 gl.clearColor(0.5,0.5,0.5,1) //Método para mudar a cor de fundo
 gl.enable(gl.DEPTH_TEST);
 gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

 //View Port
 gl.viewport(0,0, canvas.width, canvas.height);

 //Desenho