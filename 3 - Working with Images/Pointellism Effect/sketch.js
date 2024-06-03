var img;

// To retrieve the file, we use function preload()
function preload() {
  img = loadImage("Octo.jpeg"); // image file is stored in variable img
}

function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke(); // it removes the border of the shape
}

function draw() {
  img.resize(400, 400); // it fits image to given screen
  x = random(width); // it gets x axis from random value of width
  y = random(height); // it gets y axis from random value of height
  var c = img.get(x, y); // it gets color data from variable x and y
  fill(c[0], c[1], c[2], 60); // fills the color to shape with opacity of 60
  
  // Diamond shape
  beginShape();
  vertex(x, y - 10);  // Top point
  vertex(x + 10, y);  // Right point
  vertex(x, y + 10);  // Bottom point
  vertex(x - 10, y);  // Left point
  endShape(CLOSE);
}
