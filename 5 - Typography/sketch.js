var font;
var shapes1 = [];
var shapes2 = [];

function preload() {
  font = loadFont("ZtNeztoDEMO-Light.ttf");
}

function setup() {
  createCanvas(400, 400);
  background("#1f1f1f");
  fill(255); // text color
  noStroke(); // remove the border of the shapes

  // Generate points for the text
  var points1 = font.textToPoints('BATH SPA', 60, 175, 60, { sampleFactor: 0.20 });
  var points2 = font.textToPoints('UNIVERSITY', 60, 250, 50, { sampleFactor: 0.20 });

  // Create random shapes for each point of the first text
  for (var i = 0; i < points1.length; i++) {
    var p = points1[i];
    var shape1 = createRandomShape(p.x, p.y);
    shapes1.push(shape1);
  }

  // Create random shapes for each point of the second text
  for (var j = 0; j < points2.length; j++) {
    var q = points2[j];
    var shape2 = createRandomShape(q.x, q.y);
    shapes2.push(shape2);
  }
}

function draw() {
  // Draw shapes for the first text
  for (var k = 0; k < shapes1.length; k++) {
    var s1 = shapes1[k];
    drawShape(s1);
  }

  // Draw shapes for the second text
  for (var l = 0; l < shapes2.length; l++) {
    var s2 = shapes2[l];
    drawShape(s2);
  }
}

// Function to create a random shape
function createRandomShape(x, y) {
  var shapeType = int(random(0, 3)); // Randomly choose a shape type
  var shapeSize = random(0.5, 3); // Randomize size with smaller range
  var shapeColor = color(random(255), random(255), random(255)); // Randomize color

  return {
    x: x,
    y: y,
    type: shapeType,
    size: shapeSize,
    color: shapeColor
  };
}

// Function to draw a shape
function drawShape(shape) {
  fill(shape.color);

  switch (shape.type) {
    case 0:
      ellipse(shape.x, shape.y, shape.size, shape.size);
      break;
    case 1:
      rect(shape.x, shape.y, shape.size, shape.size);
      break;
    case 2:
      triangle(shape.x, shape.y, shape.x + shape.size, shape.y, shape.x + shape.size / 2, shape.y - shape.size);
      break;
    // Add more cases for additional shape types if desired
  }
}
