let numX, numY;
let modSize;
let palette = ["#44b4a8", "#ee5873", "#f1ac9d"];
let colors = ['pink','yellow','purple'];
let rand;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 100); // Background Color in HSB
  noStroke();
  numX = 8;
  numY = 16;
  modSize = windowWidth / 8;
  frameRate(1);
}

function draw() {
  background(0, 0, 100);
  
  // Code 1: Drawing shapes with random size and color
  for (let y = 0; y < numY; y++) {
    for (let x = 0; x < numX; x++) {
      let posX = x * modSize + modSize / 2;
      let posY = y * modSize + modSize / 2;
      let randomColor = random(palette);
      fill(randomColor);
      let size = random(30, 30);
      let shape = floor(random(0, 3));
      if (shape == 0) {
        ellipse(posX, posY, size, size);
      }
      if (shape == 1) {
        rect(posX, posY, size, size);
      }
    }
  }
  
  // Code 2: Drawing colored rectangles
  for (let x = 0; x < width; x += 100) {
    for (let y = 0; y < height; y += 100) {
      rand = int(random(3));
      fill(colors[rand]);
      rect(x, y, 100, 100);
    }
  }
  
  // Drawing a new pattern
  for (let y = 0; y < height; y += 50) {
    for (let x = 0; x < width; x += 50) {
      drawPattern(x, y);
    }
  }
  noLoop();
}

function mousePressed() {
  loop();
}

/*-------New Pattern-------*/
function drawPattern(x, y) {
  fill(random(255), random(255), random(255)); // Random color
  let offset = 10;
  beginShape();
  vertex(x + offset, y + offset);
  bezierVertex(x + 40, y + 10, x + 10, y + 40, x + 40, y + 40);
  bezierVertex(x + 10, y + 60, x + 40, y + 90, x + offset, y + offset);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
