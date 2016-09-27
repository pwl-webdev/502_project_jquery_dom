$(document).ready(function(){
	console.log("ready");
	var board = initBoard();
	//console.log(board);
	render(board);

	$( ".board" ).keypress(function(event) {
  		console.log( "Handler for .keypress() called.");
	});
});

var size = 40;
var middle = 19;
var snake = {
	position: [middle,middle],
	direction: "r",
	tail: [[middle, middle]]
};


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
	for(var i = 0; i < b.length; i++){
		for(var j = 0; j < b[i].length; j++){
			$('.board').append(`<div class="cell">${b[i][j]}</div>`);
		}
	}
}