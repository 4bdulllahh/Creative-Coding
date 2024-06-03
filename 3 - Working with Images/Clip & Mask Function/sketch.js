let img;

// To retrieve the file, we use function preload()
function preload() {
  img = loadImage('TreeSun.jpeg'); // image file is stored in variable img
}

function setup() {
  createCanvas(400, 400);
  background("#e7b26c"); // background color

  // Clip Function
  img.resize(200, 200); // resizing the image
  let cnv7 = createGraphics(200, 200); // creating sub canvas to create shape
  cnv7.noStroke(); // it removes the border of the shape

  // Create a cluster of shapes: circles and triangles
  cnv7.beginShape();
  cnv7.ellipse(50, 50, 80, 80); // Circle 1
  cnv7.ellipse(150, 50, 80, 80); // Circle 2
  cnv7.ellipse(100, 150, 100, 100); // Circle 3
  cnv7.triangle(50, 50, 100, 150, 0, 150); // Triangle 1
  cnv7.triangle(150, 50, 100, 150, 200, 150); // Triangle 2
  cnv7.endShape(CLOSE);
  cnv7.canvas.getContext("2d").clip(); // It creates cluster of shapes in sub canvas
  cnv7.image(img, 0, 0); // it inserts the image in the cluster of shapes
  image(cnv7, 100, 100); // inserts sub canvas inside the main canvas and sets position of sub canvas

  // Mask Function
  img.resize(200, 200); // resizing the image
  let cnv5 = createGraphics(200, 200); // creating sub canvas to create a combination of multiple shapes
  cnv5.noStroke(); // it removes the border of the shape

  // Create a cluster of shapes: circles and triangles
  cnv5.beginShape();
  cnv5.ellipse(50, 50, 80, 80); // Circle 1
  cnv5.ellipse(150, 50, 80, 80); // Circle 2
  cnv5.ellipse(100, 150, 100, 100); // Circle 3
  cnv5.triangle(50, 50, 100, 150, 0, 150); // Triangle 1
  cnv5.triangle(150, 50, 100, 150, 200, 150); // Triangle 2
  cnv5.endShape(CLOSE);
  cnv5.canvas.getContext("2d").clip();
  img.mask(cnv5); // it inserts the image in the combination of multiple shapes
  image(img, 100, 100); // inserts sub canvas inside the main canvas and sets position of sub canvas
}
