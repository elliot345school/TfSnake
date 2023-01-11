var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

// settings

var settings = {
  width: 20, // number of cells on the x or y axis
  gap: 0.1, // ratio of cell size to gap between cells
  snakeColor: "green"
}

var board = {
  startX: (canvas.width - canvas.height) / 2, // the beggining X of the part of the canvas where the game will be, not just numbers and stuff on the side
  gameWidth: canvas.height, // the width of the part of the canvas where the game will take place
  cellSize: canvas.height / (settings.width + ((settings.width + 2) * settings.gap))
};

var fps = 30;
var msPerFrame = (1 / fps) * 1000 // milliseconds in each frame

const directions = {
	up: "up",
  down: "down",
  left: "left",
  right: "right"
}

var a=setInterval(nextFrame, (1 / fps) * 1000); // setInterval accepts milliseconds, so seconds have to be multiplied by 1000

var snake=genSnake(genCoord(5, 5), 3);

function drawSnake(snake) {

	var segments = snake.segments;

	for (var i = 0;i<segments.length;i++) {
  	checkIsCoord(segments[i]);
  }
  
  for (var i = 0; i<segments.length-1;i++) {
  	drawSegment(segments[i]);
    drawGap(segments[i], segments[i+1]);
  }
  
  drawSegment(segments[i]);
}

function drawSegment(location) {
	
  checkIsCoord(location);
  
  c.fillStyle = settings.snakeColor;
  c.fillRect(board.startX + settings.gap * board.cellSize + (location.x * (board.cellSize + (board.cellSize * settings.gap))), settings.gap * board.cellSize + (location.y * (board.cellSize + (board.cellSize * settings.gap))), board.cellSize, board.cellSize); // gap + (cellSizeWithGap*x)
}

function drawGap(location, location1) { // v and v1 are the x or y cells it is between, direction can either be 
  checkIsCoord(location);
  checkIsCoord(location1);
  
  var direction;
  
  if (location.x==location1.x) {
  	direction = directions.down;
    
    // if location 1 and 2 are in bottom to top series, reverse
    
    if (location.y>location1.y) {
    	var tempLocation=location1;
      var tempLocation1=location;
      
      location=tempLocation;
      location1=tempLocation1;
    }
  } else if (location.y==location1.y) {
  	direction=directions.right;
    
    if (location.x>location1.x) {
    	var tempLocation=location1;
      var tempLocation1=location;
      
      location=tempLocation;
      location1=tempLocation1;
    }
  } else {
  	throw new Error ("Drawing gap between two cells that are not connected");
  }
  
  c.fillStyle=settings.snakeColor;
  
  if (direction==directions.right){
  	c.fillRect(board.cellSize*settings.gap+board.cellSize+board.startX + (location.x*(board.cellSize+(board.cellSize*settings.gap))),  settings.gap * board.cellSize + (location.y * (board.cellSize + (board.cellSize * settings.gap))), board.cellSize*settings.gap, board.cellSize);
  } else if (direction == directions.down) {
  	c.fillRect(board.startX+board.cellSize*settings.gap+((board.cellSize+board.cellSize*settings.gap))*location.x, ((location.y+1) * (board.cellSize + (board.cellSize * settings.gap))), board.cellSize, settings.gap*board.cellSize);
  } else {
  	throw new Error("direction is not right or down");
  }
}

function nextFrame() {
  tick();
  render();
}

function tick() {
	
}

function render() {

  // emptying display  
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // adding border of actual game
  c.fillStyle = "black";
  c.strokeRect(board.startX, 0, board.gameWidth, board.gameWidth);
  
  drawSnake(snake);
  snake.move();
}

function genCoord(x, y) { // short for generate coordinate
  return {
    x: x,
    y: y
  }
}

function genSnake(coord, startLength) {

	checkIsCoord(coord);

	var segments = [];
  
  for (var i=0;i<startLength;i++){
  	segments.push(genCoord(coord.x-i, coord.y));
  }
  
  return {
  	headLocation: coord,
    segments: segments,
    move: function (direction) {
    	
    }
  };
}

// throws error if the given value is not a coordinate
// usefull if programmer keeps using (0, 0) in a function instead of genCoord(0, 0)

function checkIsCoord(coord) {
	if (coord.x==undefined) {
  	throw new Error("Not a coord");
  }
}
function checkIsDirection(direction) {
	if (direction!=directions.up&&direction!=directions.down&&direction!=directions.left&&direction!=directions.right) {
  	throw new Error ("Not a direction");
  }
}
