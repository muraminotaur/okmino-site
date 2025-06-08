//constants
const CELL_SIZE = 40;
const COLOR_R = 210;
const COLOR_G = 210;
const COLOR_B = 210;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 255;
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 0.5;

//variables
let colorWithAlpha;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
let allNeighbors = []; //array to store all neighbors

function setup(){
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('p5container');

  colorWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
  noFill();
  stroke(colorWithAlpha);
  strokeWeight(STROKE_WEIGHT);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}

function draw(){
  background(BACKGROUND_COLOR);

  // calc row + column of the cell the mouse is currently over
  let row = floor(mouseY / CELL_SIZE);
  let col = floor(mouseX / CELL_SIZE);

  //check if mouse has moved to different cell
  //if yes, getRandomNeighbors to display
  //if mouse is pressed, ignore this and grab all cells including the current one.
  if (row !== currentRow || col !== currentCol || mouseIsPressed) {
    currentRow = row;
    currentCol = col;

    let x = currentCol * CELL_SIZE;
    let y = currentRow * CELL_SIZE;

    
    allNeighbors.push(...getRandomNeighbors(row, col));
  }

  let x = col * CELL_SIZE;
  let y = row * CELL_SIZE;

  stroke(colorWithAlpha);
  rect(x, y, CELL_SIZE, CELL_SIZE);

  for (let neighbor of allNeighbors) {
    let neighborX = neighbor.col * CELL_SIZE;
    let neighborY = neighbor.row * CELL_SIZE;
    
    neighbor.opacity = max(0, neighbor.opacity - AMT_FADE_PER_FRAME); //opacity control is here
    
    stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
    rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
  }

  allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
}

function getRandomNeighbors(row, col) {
  let neighbors = []; // init empty array

  //determine spread size for onClick fade-out
  let cellSpreadSize = 1;
  if (mouseIsPressed) {cellSpreadSize = 5}
  // -1 -> left, 0 -> center, 1 -> right
  // goes row on top of center cell, then the center cell row, then the row below the center cell row. continues with columns.
  for (let dRow = -cellSpreadSize; dRow <= cellSpreadSize; dRow++) {
    for (let dCol = -cellSpreadSize; dCol <= cellSpreadSize; dCol++) {
      let neighborRow = row + dRow;
      let neighborCol = col + dCol;

      let isCurrentCell = dRow === 0 && dCol === 0;

      let isInBounds = 
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;

      //for fade-out
      let distance = Math.sqrt(Math.pow((neighborRow - row), 2) + Math.pow((neighborCol - col), 2));
      let calculatedAlpha = STARTING_ALPHA;
      // console.log("dRow: ", dRow, "dCol: ", dCol, "current cell: ", row, col, "distance: ", distance);

      if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
        //onClick behavior
        if (mouseIsPressed) {
          //bind the distance to the size of the spread, then adjust the range to rgb [0,255]
          calculatedAlpha = STARTING_ALPHA - (distance/cellSpreadSize * 255);
        }
        neighbors.push({
          row: neighborRow,
          col: neighborCol,
          opacity: calculatedAlpha,
        })
      }
    }
  }
  return neighbors;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = Math.ceil(windowHeight / CELL_SIZE);
  numCols = Math.ceil(windowWidth / CELL_SIZE);
}