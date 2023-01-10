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


function drawSnake(segments) {

}

function drawSegment(location) {
	
  checkIsCoord(location);
  
  c.fillStyle = settings.snakeColor;
  c.fillRect(board.startX + settings.gap * board.cellSize + (location.x * (board.cellSize + (board.cellSize * settings.gap))), settings.gap * board.cellSize + (location.y * (board.cellSize + (board.cellSize * settings.gap))), board.cellSize, board.cellSize); // gap + (cellSizeWithGap*x)
}

function drawGap(location, direction) { // v and v1 are the x or y cells it is between, direction can either be 
	checkIsDirection(direction);
  checkIsCoord(location);
  
  c.fillStyle=settings.snakeColor;
  
  if (direction==directions.right){
  	c.fillRect(board.cellSize*settings.gap+board.cellSize+board.startX + (location.x*(board.cellSize+(board.cellSize*settings.gap))),  settings.gap * board.cellSize + (location.y * (board.cellSize + (board.cellSize * settings.gap))), board.cellSize*settings.gap, board.cellSize);
  } else if (direction == directions.down) {
  	c.fillRect(board.startX+board.cellSize*settings.gap+((board.cellSize+board.cellSize*settings.gap))*location.x, 2*board.cellSize*settings.gap+(board.cellSize+(settings.gap*board.cellSize))*(location.y+1), board.cellSize, settings.gap*board.cellSize);
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
  
  drawSegment(genCoord(0, 0));
  drawGap(genCoord(0, 0), directions.down);
}

function genCoord(x, y) { // short for generate coordinate
  return {
    x: x,
    y: y
  }
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
