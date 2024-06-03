function setup() {
  createCanvas(400, 400);
  background(0, 0, 150);

  let cnv3 = createGraphics(width, height); // creating sub canvas to create text inside the shape
  cnv3.noStroke(); // it removes the border of the shape
  cnv3.fill(255, 255, 0); // color of the shape (yellow)
  
  // Create a rhombus shape
  cnv3.beginShape();
  cnv3.vertex(100, 50);  // Top point
  cnv3.vertex(200, 150); // Right point
  cnv3.vertex(100, 250); // Bottom point
  cnv3.vertex(0, 150);   // Left point
  cnv3.endShape(CLOSE);

  cnv3.erase(); // it erases the text part in the shape
  cnv3.fill(0, 0, 0); // set text color to black
  cnv3.textSize(20); // font size
  cnv3.textAlign(CENTER, CENTER); // center the text
  cnv3.text('This is', 100, 130); // inserts the text and sets the position of the text 
  cnv3.textSize(20); // font size
  cnv3.text('not an Image', 100, 170); // inserts the text and sets the position of the text 
  cnv3.noErase();

  image(cnv3, 100, 75); // inserts sub canvas inside the main canvas and sets position of sub canvas 
}
