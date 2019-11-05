var svg = document.getElementById('svgJS');
var tile2 = document.getElementById('usingtile2');
var svgInterativo = document.getElementById('svgInterativo');

var  svgns = "http://www.w3.org/2000/svg";
var  xlinkns = "http://www.w3.org/1999/xlink";

var x = parseFloat(tile2.getAttributeNS(null, 'x'));
var y = parseFloat(tile2.getAttributeNS(null, 'y'));

// Conta quantas vezes eu chamo a função clone e usa pra diferenciar os ids
var count = 0;

// Cria a tag use no SVG (Não esquecer da # antes do id do elemento)
function createUse (idElem, svg) {
    var use = document.createElementNS(svgns, "use");
    use.setAttributeNS(xlinkns, "xlink:href", idElem);
    svg.appendChild(use);
}

//Cria grupos 
function createGroups(id, svg){
    var g = document.createElementNS(svgns, "g");
    g.setAttributeNS(null, 'id', id);
    svg.appendChild(g);
}

// Clona um elemento em SVG quantas vezes quisermos
function clone(tile, n, group){
    count++ 
    for (i = 0; i < n ; i++){
        NewT = tile.cloneNode(true);
        NewT.id = "newT"+ i + count;
        group.appendChild(NewT);
    }
}   

// Regras para padrão formado com operações de simetria
var r90 = "rotate(90, 200, 200)";
var r180 = "rotate(180, 200, 200)";
var r270 = "rotate(270, 200, 200)";
var scaleHalf = "translate( 0 0) translate(800 0) scale( 0.5 ) translate( -800 0)"
var flipH = "translate (400 0) scale( -1 1 )"

var r90p4 =  "rotate(90, 400, 400)";
var r180p4 =  "rotate(180, 400, 400)";
var r270p4 =  "rotate(270, 400, 400)";


// Aplica um conjunto de regras de transformação para formar um padrão 4x4
function pattern4x4(tile, group, r1, r2, r3, id1, id2, id3, id4) {
    clone(tile, 4, group)
    let n0 = document.getElementById(id1);
    let n1 = document.getElementById(id2);
    let n2 = document.getElementById(id3);
    let n3 = document.getElementById(id4);

    n1.setAttributeNS(null, 'transform', r1);
    n2.setAttributeNS(null, 'transform', r2);
    n3.setAttributeNS(null, 'transform', r3);
}

createGroups('g1', svg);
createUse("#g1", svg);
var g1 = document.getElementById('g1');

pattern4x4(tile2, g1, r90, r180, r270, 'newT01', 'newT11', 'newT21', 'newT31');

// Faço uma transformação de escala e repito as rotações anteriores
createGroups('g2',svg);
createUse("#g2", svg);
var g2 = document.getElementById('g2');
clone(g1, 1, g2);

createGroups('g3',svg);
createUse("#g3", svg);
var g3 = document.getElementById('g3');
pattern4x4(g2, g3, r90p4, r180p4, r270p4, 'newT03','newT13','newT23','newT33');
g3.setAttributeNS(null, 'transform', scaleHalf);

// Ref : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

// Transformação flip aleatória
function horizontalFlip (n){
    for (i = 0; i < n; i++){
        random = getRandomInt(0, 4);
        aux = "newT" + random + 3;
        let element = document.getElementById(aux);
        element.setAttributeNS(null, 'transform', flipH);
        console.log(element)
    }
}
//horizontalFlip(1);
var example = document.getElementById('newT03');
example.setAttributeNS(null, 'transform', flipH);

//SVG Interativo
// Ref : https://github.com/lucasmoschen/Computer_Graphics/blob/master/docs/Exercises/file.js
class Rectangle {
    constructor(id, group, x, y, width, height, color){
        this.id = id;
        this.group = group;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.setAttributes();
    }
    setAttributes(){
        let element = document.createElementNS(svgns, 'rect')
        this.group.appendChild(element);
        element.setAttributeNS(null, 'id', this.id);
        element.setAttributeNS(null, 'x', this.x);
        element.setAttributeNS(null, 'y', this.y);
        element.setAttributeNS(null, 'width', this.width);
        element.setAttributeNS(null, 'height', this.height);
        element.setAttributeNS(null, 'fill', this.color);        
    }
}

class Polygon {
    constructor(id, group, points, color){
        this.id = id;
        this.group = group;
        this.points = points;
        this.color = color;
        this.setAttributes();
    }
    setAttributes(){
        let element = document.createElementNS(svgns, 'polygon')
        this.group.appendChild(element);
        element.setAttributeNS(null, 'id', this.id);
        element.setAttributeNS(null, 'points', this.points);
        element.setAttributeNS(null, 'fill', this.color);  
    }
}
class Circle {
    constructor(id, group, cx, cy, r, color){
        this.id = id;
        this.group = group;
        this.cx = cx;
        this.cy = cy;
        this.r = r;
        this.color = color;
        this.setAttributes();
    }
    setAttributes(){
        let element = document.createElementNS(svgns, 'circle')
        this.group.appendChild(element);
        element.setAttributeNS(null, 'id', this.id);
        element.setAttributeNS(null, 'cx', this.cx);
        element.setAttributeNS(null, 'cy', this.cy);
        element.setAttributeNS(null, 'r', this.r);
        element.setAttributeNS(null, 'fill', this.color);  
    }
}

// Criando diferente tiles utilizando classes
createGroups('T1', svgInterativo);
createUse('#T1', svgInterativo);
var t1 = document.getElementById('T1');
new Rectangle('t1background',t1, 0, 0, 100, 100, 'rgb(173,255,47)');
new Polygon('t1p', t1, "0 0 100 100 0 100", "rgb(255,69,0)");

createGroups('T2', svgInterativo);
createUse('#T2', svgInterativo);
var t2 = document.getElementById('T2');
new Rectangle('t2background',t2, 200, 0, 100, 100, 'rgb(173,255,47)');
new Rectangle('t2q',t2, 245, 0, 10, 100, 'rgb(255,69,0)');

createGroups('T3', svgInterativo);
createUse('#T3', svgInterativo);
var t3 = document.getElementById('T3');
new Rectangle('t3background',t3, 400, 0, 100, 100, 'rgb(173,255,47)');
new Rectangle('t3q',t3, 400, 0, 45, 100, 'rgb(255,69,0)');

createGroups('T4', svgInterativo);
createUse('#T4', svgInterativo);
var t4 = document.getElementById('T4');
new Rectangle('t4background',t4, 600, 0, 100, 100, 'rgb(173,255,47)');
new Circle('t4q',t4, 650, 50, 25, 'rgb(255,69,0)');
console.log(t4)

// Montar a construção aleatória e se possível adicionar checkbox