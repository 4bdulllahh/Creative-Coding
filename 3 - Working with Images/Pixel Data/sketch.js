var img, x, y;

// To retrieve the file, we use function preload()
function preload() {
  img = loadImage("Hill.jpeg"); // image file is stored in variable img
}

function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke(); // it removes the border of the shape
}

function draw() {
  background(0);
  x = mouseX;  // it gets x-axis value from position of the mouse
  y = mouseY;  // it gets y-axis value from position of the mouse
  img.resize(400, 400); // it fits image to given screen
  image(img, 0, 0); // position of the image
  var c = get(x, y); // it gets color data from mouse
  fill(c); // fills the color of the shape depending on where mouse points to particular color of the image

  // Draw hexagon at the cursor position
  drawHexagon(x, y, 20); // size of the hexagon is 20
}

function drawHexagon(x, y, radius) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let vx = x + cos(angle) * radius;
    let vy = y + sin(angle) * radius;
    vertex(vx, vy);
  }
  endShape(CLOSE);
}
