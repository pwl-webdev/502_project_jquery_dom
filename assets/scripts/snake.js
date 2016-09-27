$(document).ready(function(){
	console.log("ready");
	var board = initBoard();
	//console.log(board);
	render(board);

	$(window).keypress(function(event) {
  		//console.log( "Handler for .keypress() called."+event.key);
  		changeDirection(event.key);
	});

	gameLoop(board);
});

var size = 40;
var middle = 19;
var timeStep = 500;
var animation;
var snake = {
	position: [middle,middle],
	direction: "r",
	tail: [[middle, middle]]
};

function gameLoop(board){
	var end = false;
	//while(!end){
		animation = window.setInterval(function(){
			if(move(board)){
				render(board);
			}
		}, timeStep);
	//}
}

function stopGame(){
	window.clearInterval(animation);
}

function move(board){
	var x = snake.position[0];
	var y = snake.position[1];
	switch(snake.direction){
		case "r":
			snake.position = [x+1,y];
			if(x+1 == size){
				stopGame();
				return false;
			}
			break;
		case "l":
			snake.position = [x-1,y];
			if(x-1 < 0){
				stopGame();
				return false;
			}
			break;
		case "u":
			snake.position = [x,y-1];
			if(y-1 < 0){
				stopGame();
				return false;
			}
			break;
		case "d":
			snake.position = [x,y+1];
			if(y+1 == size){
				stopGame();
				return false;
			}
			break;
	}
	console.log(" x "+snake.position[0]+" y "+snake.position[1]);
	board[y][x] = " ";
	board[snake.position[1]][snake.position[0]] = "O";
	return true;
}

function changeDirection(k){
	switch(k){
		case "ArrowUp":
			if(snake.direction != "d"){
				snake.direction = "u";	
			};
			break;
		case "ArrowDown":
			if(snake.direction != "u"){
				snake.direction = "d";
			};
			break;
		case "ArrowLeft":
			if(snake.direction != "r"){
				snake.direction = "l";
			};
			break;
		case "ArrowRight":
			if(snake.direction != "l"){
				snake.direction = "r"
			}
			break;
	}
	console.log(" --> current snake direction "+snake.direction);
}

function initBoard(){
	var b = new Array(size);
	for(var i = 0; i < size; i++){
		b[i] = new Array(size);
		for(var j = 0; j < size; j++){
			b[i][j] = (" ");
		}
	}
	b[middle][middle] = "O";
	return b;
};

function render(b){
	$('.board').empty();
	for(var i = 0; i < b.length; i++){
		for(var j = 0; j < b[i].length; j++){
			$('.board').append(`<div class="cell">${b[i][j]}</div>`);
		}
	}
}