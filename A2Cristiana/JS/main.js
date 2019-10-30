var svg = document.getElementById('svgJS');
var tile2 = document.getElementById('usingtile2');
var positionY = 0;
var positionX = 0;

var x = parseFloat(tile2.getAttributeNS(null, 'x'));
var y = parseFloat(tile2.getAttributeNS(null, 'y'));

// Clona um elemento em SVG quantas vezes quisermos
function clone(tile, n){
    for (i = 0; i < n ; i++){
        var NewT = tile.cloneNode(true);
        NewT.id = "newT"+ i;
        svg.appendChild(NewT);
    }
   }

// Regras para padrão formado com operações de simetria
//Rotação

function rotate(){

}

function pattern4x4(tile, x, y, rules) {
    clone(tile, 3)
    newT0.setAttributeNS(null, 'x', x + 200);
    newT1.setAttributeNS(null, 'x', x + 0);
    newT1.setAttributeNS(null, 'y', y + 200);
    newT2.setAttributeNS(null, 'x', x + 200);
    newT2.setAttributeNS(null, 'y', y + 200);
    newT3.setAttributeNS(null, 'x', x + 0);
    newT3.setAttributeNS(null, 'y', y + 0);
    rules()
}

pattern4x4(tile2, 0, 0);