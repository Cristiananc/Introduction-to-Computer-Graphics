			//Iniciando meu primeiro canvas com a imagem de interação com o usuário
			var canvas1 = document.getElementById("canvas1");
            var ctx = canvas1.getContext("2d");
			
			// Função que desenha a imagem e chama a função de desenho com o mouse
            function drawBackground(canvas1,ctx,onload){
            var myImage = new Image();
            myImage.crossOrigin = '';

            myImage.onload = function(){
                ctx.drawImage(myImage,0,0,canvas1.width,canvas1.height);
                var ImageData = ctx.getImageData(0,0,canvas1.width,canvas1.height);
                var data = ImageData.data;
                console.log(data);
                onload(canvas1, ctx);
            };    
            myImage.src = 'https://i.ibb.co/WD9dh51/teste1.png';
            
			}
			// Variaveís que guardarão minhas coordenados (x,y) do mouse
            var coordsX = [];
            var coordsY = [];

            // Referência: https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
            function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
            };
		}
		//Desenha os circulos quando há um clique e finaliza quando ocorre um segundo clique
        function drawing(canvas1, ctx){
            var mouseClicked = false, mouseReleased = true;
            canvas1.addEventListener("click", onMouseClick, false);
            canvas1.addEventListener("mousemove", onMouseMove, false);
            function onMouseClick(e) {
                mouseClicked = !mouseClicked;
            }
            function onMouseMove(e) {
            if (mouseClicked) {
                var pos = getMousePos(canvas1,e);
                ctx.beginPath();
				ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2, false);
				//Tentativa de guardar as coordenadas do mouse
				// Obs: o pos.y não funciona no caso da coordenada Y
                coordsX.push((pos.x));
                coordsY.push((e.offsetY));
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.fill();
    		}
		}
    }

        drawBackground(canvas1,ctx,drawing);

        //  Reinicia a imagem sem os desenhos dos círculos 
        var button1 = document.getElementById('reiniciar');
            reiniciar.addEventListener('click', onClick1);

        function onClick1() {
            drawBackground(canvas1,ctx,onload);
            //Reinicia as variavéis 
            coordsX = [];
            coordsY = [];
        }
        
        // Tentativa de reiniciar a imagem binária
        function restart(data){
            for (let i = 0; i < 300; i++){
                for(let j = 0; j < 500; j++){
                    setPixel(data, i, j, 0);
                }
            }
        }

		// Segundo canvas a ser utilizado
                var canvas = document.getElementById("rect");
                var ctx1 = canvas.getContext("2d");

                ctx1.fillRect(0,0,300,500);
				ctx1.fillStyle = 'rgb(255,255,255)';

                var imageData1 = ctx1.getImageData(0, 0, canvas.width, canvas.height);
                console.log(imageData1);
                data1 = imageData1.data;

        //Atribuindo uma cor (no trabalho uso branco ou preto) 
        //aos pixels selecionados para todos os canais no image.data
                function setPixel(imageData, x, y, cor) {
                index = (x + y * imageData.width) * 4;
                    imageData.data[index+0] = cor;
                    imageData.data[index+1] = cor;
                    imageData.data[index+2] = cor;
                    imageData.data[index+3] = 1;
                }
                function binary(imageData1, coordsX, coordsY, cor){
                    for (let i = 0; i < coordsX.length; i += 1){
                    setPixel(imageData1,coordsX[i], coordsY[i], cor);
                    }
                }

                function binary2(imageData, coordsX, coordsY, cor){
                    for (let i = 0; i < coordsX.length; i += 1){
						setPixel(imageData, coordsX[i],coordsY[i], cor);
                        setPixel(imageData, coordsX[i] + 1,coordsY[i], cor);
                        setPixel(imageData, coordsX[i],coordsY[i] + 1,cor);
                        setPixel(imageData, coordsX[i] - 1,coordsY[i], cor);
						setPixel(imageData, coordsX[i],coordsY[i] - 1,cor);
						setPixel(imageData, coordsX[i] - 1,coordsY[i] - 1, cor);
						setPixel(imageData, coordsX[i] - 1,coordsY[i] + 1, cor);
						setPixel(imageData, coordsX[i] + 1,coordsY[i] + 1, cor);
						setPixel(imageData, coordsX[i] + 1,coordsY[i] - 1, cor);
                    }
                }
// Canvas 3 com os vizinhos pintados num quadrado 3x3
            var canvas2 = document.getElementById("canvas3");
            var ctx2 = canvas2.getContext("2d");

            ctx2.fillRect(0,0,300,500);
            ctx2.fillStyle = 'rgb(255,255,255)';

            var imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
			console.log(imageData2);

            var button = document.getElementById('salvar');
                salvar.addEventListener('click', onClick);
			
			// Salva ao mesmo tempo nos dois canvas
                function onClick() {
                    binary(imageData1,coordsX, coordsY, 255);
                  // Atualiza o canvas com o novo dado dos pixels
                    ctx1.putImageData(imageData1, 0, 0);

                    binary2(imageData2, coordsX, coordsY, 255);
                    ctx2.putImageData(imageData2, 0, 0);
                }

			//Canvas 4 
			var canvas4 = document.getElementById("canvas4");
			var ctx4 = canvas4.getContext("2d");
			
			// Referência do código : 
//https://stackoverflow.com/questions/31694870/draw-a-rectangle-on-a-image-inside-a-canvas-using-mousemove-event-in-javascript
			
			// Variaveís que guardarão minhas coordenados (x,y) do mouse
			var coordsX1 = [];
			var coordsY2 = [];

			var rect = {};
			var drag = false;
			var myImage = null;
			var ghostcanvas;
			var gctx;
			var canvasValid = false;

			function init(onload) {

			ghostcanvas = document.createElement('canvas');
			ghostcanvas.height = canvas4.height;
			ghostcanvas.width = canvas4.width;
			gctx = ghostcanvas.getContext('2d');

			myImage = new Image();
			myImage.onload = function(){
			ctx4.drawImage(myImage,0,0,canvas4.width,canvas4.height);};    
			myImage.src = 'https://i.ibb.co/WD9dh51/teste1.png';
			onload();
		}

		function drawRect(){
		
		canvas4.addEventListener('mousedown', mouseDown, false);
		canvas4.addEventListener('mouseup', mouseUp, false);
		canvas4.addEventListener('mousemove', mouseMove, false);

			function mouseDown(e) {
				rect.startX = e.pageX - this.offsetLeft;
				rect.startY = e.pageY - this.offsetTop;
				drag = true;
			}

			function mouseUp() { drag = false; }

			function mouseMove(e) {
				if (drag) {
					ctx4.clearRect(0, 0, 300, 500);
					ctx4.drawImage(myImage, 0, 0, canvas4.width, canvas4.height);
					rect.w = (e.pageX - this.offsetLeft) - rect.startX;
					rect.h = (e.pageY - this.offsetTop) - rect.startY;
					draw();
				}
			}
			function draw(){
			ctx4.fillStyle = 'rgb(255,255,255)';
			ctx4.fillRect(rect.startX, rect.startY, rect.w, rect.h);
			//coordsX1.push();
			//coordsY2.push();
			}
		}
			init(drawRect);

			// Canvas 5
			var canvas5 = document.getElementById("canvas5");
			var ctx5 = canvas5.getContext("2d");

			ctx5.fillRect(0,0,300,500);
            ctx5.fillStyle = 'rgb(255,255,255)';
            drawing(canvas1, ctx5);

        
			
			