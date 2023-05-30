var monster_colors = ["#0d1b2a", "#1b263b", "#415a77", "#778da9"];

class Monster {
  constructor(args) {
    this.size = args.size || random(50, 100);
    this.position = args.position || createVector(random(width), random(height));
    this.velocity = args.velocity || createVector(random(-1, 1), random(-1, 1));
    this.color = args.color || random(monster_colors);
    this.rotation = random(TWO_PI);
    this.angle = 0;
    this.speed = random(0.01, 0.05);
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    fill(this.color);
    noStroke();

    // Body
    ellipse(0, 0, this.size);

    // Arms
    for (let i = -1; i <= 1; i += 2) {
      push();
      rotate(this.angle * i);
      rect(this.size / 2, -this.size / 4, this.size / 4, this.size / 2);
      pop();
    }

    // Eyes
    fill(255);
    ellipse(-this.size / 4, -this.size / 4, this.size / 8);
    ellipse(this.size / 4, -this.size / 4, this.size / 8);

    // Mouth
    fill(0);
    rect(-this.size / 4, this.size / 4, this.size / 2, this.size / 8);

    pop();
  }

  update() {
    this.position.add(this.velocity);
    this.angle += this.speed;

    if (this.position.x <= 0 || this.position.x >= width || this.position.y <= 0 || this.position.y >= height) {
      this.position = createVector(random(width), random(height));
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.rotation = random(TWO_PI);
      this.angle = 0;
      this.speed = random(0.01, 0.05);
    }
  }
}
