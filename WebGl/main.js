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
    0, 1, 2,    1, 2, 3,      4, 5, 6,        4, 6, 7,
    8, 9, 10,   10, 11, 8,    12, 13, 15,     15, 14, 13,
    16,17,18,   18, 19, 16,   20, 21, 22,     22,23,20        
]; 

var cores = [
    1,0,0, 1,0,0, 1,0,0, 1,0,0,
    0,0,1, 0,0,1, 0,0,1, 0,0,1,
    1,1,3, 1,1,3, 1,1,3, 1,1,3,
    1,0,1, 1,0,1, 1,0,1, 1,0,1,
    1,1,0, 1,1,0, 1,1,0, 1,1,0,
    0,1,0, 0,1,0, 0,1,0, 0,1,0
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
 var vertexCode = 'attribute vec3 position;' +
    'uniform mat4 Pmatrix;' +
    'uniform mat4 Vmatrix;' +
    'uniform mat4 Mmatrix;' +
    'attribute vec3 color;' +
    'varying vec3 vColor;' +

    'void main(void) {' +
       'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.0);' +
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
 var Pmatrix = gl.getUniformLocation(program, "Pmatrix");
 var Vmatrix = gl.getUniformLocation(program, "Vmatrix");
 var Mmatrix = gl.getUniformLocation(program, "Mmatrix");

 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 var position = gl.getAttribLocation(program, "position");
 gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(position);

 //Repito o processo para aplicar cores
 gl.bindBuffer(gl.ARRAY_BUFFER, cores_buffer);
 var cor = gl.getAttribLocation(program, "color");
 gl.vertexAttribPointer(cor, 3, gl.FLOAT, false, 0, 0);
 gl.enableVertexAttribArray(cor);
 
 gl.useProgram(program);

 /* Matrizes e Rotação */
 
 function projecao(angle, a, zMin, zMax) {
     var ang = Math.tan((angle*.5)*Math.PI/180); 
     return [
         1/(a*ang), 0, 0, 0,
         0, 1/(ang), 0, 0,
         0, 0, - (zMax + zMin)/(zMax - zMin), -1,
         0, 0, -(2*zMax*zMin)/(zMax - zMin), 0
     ];
 }

 var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
 var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

 var matriz_Projecao = projecao(45, canvas.width/canvas.height, 1, 100);

 //Translação de z
 view_matrix[14] = view_matrix[14] - 8;

 function rotacaoX(m, ang){
    var c = Math.cos(ang);
    var s = Math.sin(ang);
    var mv1 = m[1], mv5 = m[5], mv9 = m[9];

    m[1] = m[1]*c - m[2]*s;
    m[5] = m[5]*c - m[6]*s;
    m[9] = m[9]*c - m[10]*s;
    m[2] = m[2]*c + mv1*s;
    m[6] = m[6]*c + mv5*s;
    m[10] = m[10]*c + mv9*s;
 }

 function rotacaoY(m, ang){
     var c = Math.cos(ang);
     var s = Math.sin(ang);
     var mv0 = m[0], mv4 = m[4], mv8 = m[8];

     m[0] = c*m[0] + s*m[2];
     m[4] = c*m[4] + s*m[6];
     m[8] = c*m[8] + s*m[10];
     m[2] =  c*m[2] - s*mv0;
     m[6] =  c*m[6] - s*mv4;
     m[10] =  c*m[10] - s*mv8;
 }

 function rotacaoZ(m, ang){
    var c = Math.cos(ang);
    var s = Math.sin(ang);
    var mv0 = m[0], mv4 = m[4], mv8 = m[8];

    m[0] = c*m[0] - s*m[1];
    m[4] = c*m[4] - s*m[5];
    m[8] = c*m[8] - s*m[9];
    m[1] = c*m[1] + s*mv0;
    m[5] = c*m[5] + s*mv4;
    m[9] = c*m[9] + s*mv8;
}

 //Antes de desenhar as primitivas é preciso fazer algumas operações
 var tempoAnterior = 0;

 function draw(tempo){
     var dt = tempo - tempoAnterior;
     rotacaoX(mov_matrix, dt*0.005);
     rotacaoY(mov_matrix, dt*0.002);
     rotacaoZ(mov_matrix, dt*0.003);
     tempoAnterior = tempo;

    gl.enable(gl.DEPTH_TEST);
    //gl.enable(gl.LEQUAL);
    gl.clearDepth(1.0);
    gl.clearColor(0, 0, 0 , 1) //Método para mudar a cor de fundo
   
    //View Port
    gl.viewport(0,0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   
    gl.uniformMatrix4fv(Pmatrix, false, matriz_Projecao);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);

    //Desenho
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(draw);
}
 draw(0);

 /* Referências:
 http://www.ic.uff.br/~aconci/Manipu3D.pdf
 https://www.tutorialspoint.com/webgl/webgl_cube_rotation.htm
 */