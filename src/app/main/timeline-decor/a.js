import React, { useEffect, useRef } from "react";

class Fire {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.aFires = [];
    this.aSpark = [];
    this.aSpark2 = [];

    this.mouse = {
      x: this.canvas.width * 0.5,
      y: this.canvas.height * 0.75,
    };
  }

  init() {
    this.canvas.addEventListener('mousemove', this.updateMouse.bind(this), false);
  }

  run() {
    this.update();
    this.draw();

    if (this.bRuning) {
      requestAnimationFrame(this.run.bind(this));
    }
  }

  start() {
    this.bRuning = true;
    this.run();
  }

  stop() {
    this.bRuning = false;
  }

  update() {
    this.aFires.push(new Flame(this.mouse));
    this.aSpark.push(new Spark(this.mouse));
    this.aSpark2.push(new Spark(this.mouse));

    for (let i = this.aFires.length - 1; i >= 0; i--) {
      if (this.aFires[i].alive) this.aFires[i].update();
      else this.aFires.splice(i, 1);
    }

    for (let i = this.aSpark.length - 1; i >= 0; i--) {
      if (this.aSpark[i].alive) this.aSpark[i].update();
      else this.aSpark.splice(i, 1);
    }

    for (let i = this.aSpark2.length - 1; i >= 0; i--) {
      if (this.aSpark2[i].alive) this.aSpark2[i].update();
      else this.aSpark2.splice(i, 1);
    }
  }

  draw() {
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = "rgba( 15, 5, 2, 1 )";
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    this.grd = this.ctx.createRadialGradient(this.mouse.x, this.mouse.y - 200, 200, this.mouse.x, this.mouse.y - 100, 0);
    this.grd.addColorStop(0, "rgb( 15, 5, 2 )");
    this.grd.addColorStop(1, "rgb( 30, 10, 2 )");
    this.ctx.beginPath();
    this.ctx.arc(this.mouse.x, this.mouse.y - 100, 200, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.grd;
    this.ctx.fill();

    this.ctx.font = "15em Amatic SC";
    this.ctx.textAlign = "center";
    this.ctx.strokeStyle = "rgb(50, 20, 0)";
    this.ctx.fillStyle = "rgb(120, 10, 0)";
    this.ctx.lineWidth = 2;
    this.ctx.strokeText("Fire", this.canvas.width / 2, this.canvas.height * 0.72);
    this.ctx.fillText("Fire", this.canvas.width / 2, this.canvas.height * 0.72);

    this.ctx.globalCompositeOperation = "overlay";

    for (let i = this.aFires.length - 1; i >= 0; i--) {
      this.aFires[i].draw(this.ctx);
    }

    this.ctx.globalCompositeOperation = "soft-light";

    for (let i = this.aSpark.length - 1; i >= 0; i--) {
      if (i % 2 === 0) this.aSpark[i].draw(this.ctx);
    }

    this.ctx.globalCompositeOperation = "color-dodge";

    for (let i = this.aSpark2.length - 1; i >= 0; i--) {
      this.aSpark2[i].draw(this.ctx);
    }
  }

  updateMouse(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}

class Flame {
  constructor(mouse) {
    this.cx = mouse.x;
    this.cy = mouse.y;
    this.x = rand(this.cx - 25, this.cx + 25);
    this.y = rand(this.cy - 5, this.cy + 5);
    this.vy = rand(1, 3);
    this.vx = rand(-1, 1);
    this.r = rand(20, 30);
    this.life = rand(3, 6);
    this.alive = true;
    this.c = {
      h: Math.floor(rand(2, 40)),
      s: 100,
      l: rand(80, 100),
      a: 0,
      ta: rand(0.8, 0.9),
    };
  }

  update() {
    this.y -= this.vy;
    this.vy += 0.05;
    this.x += this.vx;

    if (this.x < this.cx) this.vx += 0.1;
    else this.vx -= 0.1;

    if (this.r > 0) this.r -= 0.1;

    if (this.r <= 0) this.r = 0;

    this.life -= 0.15;

    if (this.life <= 0) {
      this.c.a -= 0.05;
      if (this.c.a <= 0) this.alive = false;
    } else if (this.life > 0 && this.c.a < this.c.ta) {
      this.c.a += 0.08;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 3, 0, 2 * Math.PI);
    ctx.fillStyle = `hsla( ${this.c.h}, ${this.c.s}%, ${this.c.l}%, ${this.c.a / 20})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = `hsla( ${this.c.h}, ${this.c.s}%, ${this.c.l}%, ${this.c.a})`;
    ctx.fill();
  }
}

class Spark {
  constructor(mouse) {
    this.cx = mouse.x;
    this.cy = mouse.y;
    this.x = rand(this.cx - 40, this.cx + 40);
    this.y = rand(this.cy, this.cy + 5);
    this.lx = this.x;
    this.ly = this.y;
    this.vy = rand(1, 3);
    this.vx = rand(-4, 4);
    this.r = rand(0, 1);
    this.life = rand(4, 5);
    this.alive = true;
    this.c = {
      h: Math.floor(rand(2, 40)),
      s: 100,
      l: rand(40, 100),
      a: rand(0.8, 0.9),
    };
  }

  update() {
    this.lx = this.x;
    this.ly = this.y;

    this.y -= this.vy;
    this.x += this.vx;

    if (this.x < this.cx) this.vx += 0.2;
    else this.vx -= 0.2;

    this.vy += 0.08;
    this.life -= 0.1;

    if (this.life <= 0) {
      this.c.a -= 0.05;
      if (this.c.a <= 0) this.alive = false;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.lx, this.ly);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla( ${this.c.h}, ${this.c.s}%, ${this.c.l}%, ${this.c.a / 2})`;
    ctx.lineWidth = this.r * 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.lx, this.ly);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla( ${this.c.h}, ${this.c.s}%, ${this.c.l}%, ${this.c.a})`;
    ctx.lineWidth = this.r;
    ctx.stroke();
    ctx.closePath();
  }
}

const rand = (min, max) => Math.random() * (max - min) + min;

const FireCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fire = new Fire(canvasRef.current);
    fire.start();

    return () => {
      fire.stop();
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default FireCanvas;
