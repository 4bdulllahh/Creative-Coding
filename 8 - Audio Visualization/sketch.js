let mic;
let hexagons = [];
let colorIndex = 0;

function setup() {
  createCanvas(800, 800);
  noStroke();

  // Create an audio input
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);

  // Get the volume level
  let vol = mic.getLevel();

  // Add a new hexagon at the mouse position with a rainbow color
  let hexColor = color((colorIndex % 360), 100, 100);
  hexagons.push(new Hexagon(mouseX, mouseY, random(10, 50), hexColor));

  // Update and display hexagons
  for (let hex of hexagons) {
    hex.update(vol);
    hex.display();
  }

  // Remove the oldest hexagon if there are too many
  if (hexagons.length > 100) {
    hexagons.shift();
  }

  // Increment color index for the rainbow effect
  colorIndex += 1;
}

class Hexagon {
  constructor(x, y, size, col) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseSize = size;
    this.color = col;
  }

  update(vol) {
    // Change size based on volume
    this.size = this.baseSize + vol * 200;
  }

  display() {
    fill(this.color);
    push();
    translate(this.x, this.y);
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = TWO_PI / 6 * i;
      let x = cos(angle) * this.size;
      let y = sin(angle) * this.size;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

function setup() {
  createCanvas(800, 800);
  noStroke();
  colorMode(HSB, 360, 100, 100); // Use HSB color mode for rainbow effect

  // Create an audio input
  mic = new p5.AudioIn();
  mic.start();
}
