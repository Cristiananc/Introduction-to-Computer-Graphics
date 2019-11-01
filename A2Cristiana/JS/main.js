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
var r90 = "rotate(90, 200, 200)";
var r180 = "rotate(180, 200, 200)";
var r270 = "rotate(270, 200, 200)";

function pattern4x4(tile, x, y) {
    clone(tile, 4)
    newT0.setAttributeNS(null, 'x', x);
    newT0.setAttributeNS(null, 'y', y);

    newT1.setAttributeNS(null, 'transform', r90);
    newT2.setAttributeNS(null, 'transform', r180);
    newT3.setAttributeNS(null, 'transform', r270);

}

pattern4x4(tile2, 0, 0);

