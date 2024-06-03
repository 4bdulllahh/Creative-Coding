function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(135, 206, 235); // Sky blue background

  // Draw the grass
  fill(34, 139, 34);
  rect(0, height * 3/4, width, height / 4);

  // Draw the road
  fill(50);
  rect(0, height * 7/8, width, height / 8);

  // Draw the car
  drawCar(width / 2 - 100, height * 7/8 - 60);

  // Draw the sun
  fill(255, 223, 0);
  ellipse(100, 100, 80, 80);
}

function drawCar(x, y) {
  // Car body
  fill(255, 0, 0);
  rect(x, y, 200, 50);

  // Car roof
  rect(x + 50, y - 30, 100, 30);

  // Car windows
  fill(135, 206, 250);
  rect(x + 60, y - 25, 40, 25);
  rect(x + 120, y - 25, 40, 25);

  // Car wheels
  fill(0);
  ellipse(x + 50, y + 50, 40, 40);
  ellipse(x + 150, y + 50, 40, 40);
}
