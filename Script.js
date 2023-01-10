
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

// settings

var settings = {
  width: 20, // number of cells on the x or y axis
  gap: 0.1 // ratio of cell size to gap between cells
}

var board = {
  startX: (canvas.width - canvas.height) / 2, // the beggining X of the part of the canvas where the game will be, not just numbers and stuff on the side
  gameWidth: canvas.height, // the width of the part of the canvas where the game will take place
  cellSize: canvas.height / (settings.width + ((settings.width + 2) * settings.gap))
};

var fps = 30;
var msPerFrame = (1 / fps) * 1000 // milliseconds in each frame

setInterval(nextFrame, (1 / fps) * 1000); // setInterval accepts milliseconds, so seconds have to be multiplied by 1000


function drawSnake(segments) {

}

function drawSegment(location) {

  c.fillStyle = "green";
  c.fillRect(board.startX + settings.gap * board.cellSize + (location.x * (board.cellSize + (board.cellSize * settings.gap))), settings.gap * board.cellSize + (location.y * (board.cellSize + (board.cellSize * settings.gap))), board.cellSize, board.cellSize); // gap + (cellSizeWithGap*x)
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

  //drawSegment(genCoord(2, 3));
}

function genCoord(x, y) { // short for generate coordinate
  return {
    x: x,
    y: y
  }
}
