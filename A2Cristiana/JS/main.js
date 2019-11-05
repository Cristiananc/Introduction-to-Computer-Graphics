var svg = document.getElementById('svgJS');
var tile2 = document.getElementById('usingtile2');

var  svgns = "http://www.w3.org/2000/svg";
var  xlinkns = "http://www.w3.org/1999/xlink";

var x = parseFloat(tile2.getAttributeNS(null, 'x'));
var y = parseFloat(tile2.getAttributeNS(null, 'y'));

// Conta quantas vezes eu chamo a função clone e usa pra diferenciar os ids
var count = 0;

// Cria a tag use no SVG (Não esquecer da # antes do id do elemento)
function createUse (idElem) {
    var use = document.createElementNS(svgns, "use");
    use.setAttributeNS(xlinkns, "xlink:href", idElem);
    //use.setAttributeNS(null, 'id', idUse);
}

//Cria grupos 
function createGroups(id){
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
var flipH = "scale( -1 1 )"

var r90deg600 =  "rotate(90, 400, 400)";
var r180deg600 =  "rotate(180, 400, 400)";
var r270deg600 =  "rotate(270, 400, 400)";


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

createGroups('g1');
createUse("#g1");
var g1 = document.getElementById('g1');

pattern4x4(tile2, g1, r90, r180, r270, 'newT01', 'newT11', 'newT21', 'newT31');

// Faço uma transformação de escala e repito as rotações anteriores
createGroups('g2');
createUse("#g2");
var g2 = document.getElementById('g2');
clone(g1, 1, g2);

createGroups('g3');
createUse("#g3");
var g3 = document.getElementById('g3');

pattern4x4(g1, g3, r90deg600, r180deg600, r270deg600, 'newT03','newT13','newT23','newT33');
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

