$(document).ready(function(){
	console.log("ready");
	var board = initBoard();
	//console.log(board);
	render(board);
	createFood(board);

	$(window).keypress(function(event) {
  		//console.log( "Handler for .keypress() called."+event.key);
  		changeDirection(event.key);
	});

	gameLoop(board);
});

var size = 40;
var middle = 19;
var timeStep = 10;
var animation;
var snake = {
	position: [middle,middle],
	direction: "r",
	tail: []
};
var food = {
	position: [0,0]
}

function gameLoop(board){
	var end = false;
		animation = window.setInterval(function(){
			if(move(board)){
				render(board);
			}
		}, timeStep);
}

function stopGame(){
	window.clearInterval(animation);
}

function createFood(board){
	do{
		food.position[0] = Math.floor(Math.random()*(size-1));
		food.position[1] = Math.floor(Math.random()*(size-1));
	} while(board[food.position[1]][food.position[0]] != " ");
	console.log("food "+food.position[0]+" "+food.position[1]);
	board[food.position[1]][food.position[0]] = "x";
}

function eatFood(board){
	if(snake.tail.length > 0){
		snake.tail.push([snake.tail[snake.tail.length-1][0],snake.tail[snake.tail.length-1][1]]);
	} else{
		snake.tail.push([snake.position[0],snake.position[1]]);
	}
	createFood(board);
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
	if(board[snake.position[1]][snake.position[0]] == "x"){
		eatFood(board);
	} else if(board[snake.position[1]][snake.position[0]] == "o"){
		stopGame();
		return false;
	}

	board[snake.position[1]][snake.position[0]] = "O";
	
	if(snake.tail.length > 0){
		var temp = snake.tail.pop();
		board[temp[1]][temp[0]] = " ";
		temp = [x,y];
		board[temp[1]][temp[0]] = "o";
		snake.tail.unshift(temp);
	} else{
		board[y][x] = " ";
	}
	return true;
}
/*function drawElements(board){
	board[snake.position[1]][snake.position[0]] = "O";
	for(var i = 0; i < snake.tail.length; i++){
		board[]
	}
}*/
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