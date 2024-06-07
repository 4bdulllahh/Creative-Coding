let spaceship;
let asteroids = [];
let bullets = [];
let gameState = 'title'; // Possible states: title, playing, gameover, win
let score = 0;
let winScore = 350;
let bulletCooldown = 0;
let highScore = 0;

function setup() {
  createCanvas(800, 600);
  spaceship = new Spaceship();
  for (let i = 0; i < 15; i++) {
    asteroids.push(new Asteroid());
  }
  loadHighScore();
}

function draw() {
  background(0);
  
  if (gameState === 'title') {
    showTitleScreen();
  } else if (gameState === 'playing') {
    playGame();
  } else if (gameState === 'gameover') {
    showGameOverScreen();
  } else if (gameState === 'win') {
    showWinScreen();
  }
}

function showTitleScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text('Asteroids Game', width / 2, height / 2 - 20);
  textSize(16);
  text('Press ENTER to Start', width / 2, height / 2 + 20);
  text('High Score: ' + highScore, width / 2, height / 2 + 50);
}

function playGame() {
  spaceship.update();
  spaceship.display();

  // Update and display bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();
    
    // Remove bullet if it goes off-screen
    if (bullets[i].offscreen()) {
      bullets.splice(i, 1);
      continue;
    }

    // Check collision with asteroids
    for (let j = asteroids.length - 1; j >= 0; j--) {
      if (bullets[i] && bullets[i].hits(asteroids[j])) {
        let newAsteroids = asteroids[j].breakup();
        asteroids.splice(j, 1);
        asteroids = asteroids.concat(newAsteroids);
        bullets.splice(i, 1);
        score += 10;
        break;
      }
    }
  }

  // Update and display asteroids
  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].update();
    asteroids[i].display();

    if (spaceship.hits(asteroids[i])) {
      gameState = 'gameover';
      saveHighScore();
    }
  }

  // Add new asteroids if needed
  if (asteroids.length < 15) {
    asteroids.push(new Asteroid());
  }

  // Display score
  fill(255);
  textSize(24);
  text('Score: ' + score, 10, 30);

  // Check for win condition
  if (score >= winScore) {
    gameState = 'win';
    saveHighScore();
  }

  // Handle bullet cooldown
  if (bulletCooldown > 0) {
    bulletCooldown--;
  }
}

function showGameOverScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text('Game Over', width / 2, height / 2 - 20);
  textSize(16);
  text('Press ENTER to Restart', width / 2, height / 2 + 20);
  text('High Score: ' + highScore, width / 2, height / 2 + 50);
}

function showWinScreen() {
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text('You Win!', width / 2, height / 2 - 20);
  textSize(16);
  text('Press ENTER to Continue', width / 2, height / 2 + 20);
  text('High Score: ' + highScore, width / 2, height / 2 + 50);
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (gameState === 'title' || gameState === 'gameover' || gameState === 'win') {
      gameState = 'playing';
      score = 0;
      asteroids = [];
      bullets = [];
      for (let i = 0; i < 15; i++) {
        asteroids.push(new Asteroid());
      }
    }
  }

  if (gameState === 'playing') {
    if (keyCode === RIGHT_ARROW) {
      spaceship.setRotation(0.1);
    } else if (keyCode === LEFT_ARROW) {
      spaceship.setRotation(-0.1);
    } else if (keyCode === UP_ARROW) {
      spaceship.setBoosting(true);
    }

    if (key === ' ' && bulletCooldown === 0) {
      bullets.push(new Bullet(spaceship.pos, spaceship.heading));
      bulletCooldown = 10;
    }
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    spaceship.setRotation(0);
  } else if (keyCode === UP_ARROW) {
    spaceship.setBoosting(false);
  }
}

class Spaceship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = false;
  }

  update() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99); // Friction
    this.edges();
    this.heading += this.rotation;
  }

  boost() {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < this.r + asteroid.r;
  }

  display() {
    fill(0);
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    beginShape();
    vertex(0, -this.r);
    vertex(-this.r, this.r);
    vertex(this.r, this.r);
    endShape(CLOSE);
    pop();
  }

  setRotation(angle) {
    this.rotation = angle;
  }

  setBoosting(boosting) {
    this.isBoosting = boosting;
  }

  edges() {
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    else if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
    else if (this.pos.y < -this.r) this.pos.y = height + this.r;
  }
}

class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }
    if (r) {
      this.r = r * 0.5;
    }
 else {
      this.r = random(15, 50);
    }
    this.vel = p5.Vector.random2D();
    this.total = floor(random(5, 15));
    this.offset = [];
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }
  }

  breakup() {
    let newAsteroids = [];
    if (this.r > 15) {
      for (let i = 0; i < 2; i++) {
        newAsteroids.push(new Asteroid(this.pos, this.r));
      }
    }
    return newAsteroids;
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  display() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    else if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
    else if (this.pos.y < -this.r) this.pos.y = height + this.r;
  }
}

class Bullet {
  constructor(pos, heading) {
    this.pos = createVector(pos.x, pos.y);
    this.vel = p5.Vector.fromAngle(heading);
    this.vel.mult(10);
  }

  update() {
    this.pos.add(this.vel);
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }

  offscreen() {
    return (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0);
  }

  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroid.r;
  }
}

function loadHighScore() {
  let data = localStorage.getItem('highScore');
  if (data) {
    highScore = parseInt(data);
  }
}

function saveHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
  }
}
