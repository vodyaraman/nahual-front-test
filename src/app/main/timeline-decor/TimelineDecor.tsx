import React, { useEffect, useRef } from 'react';

class Fire {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private aFires: Flame[] = [];
  private aSpark: Spark[] = [];
  private aSpark2: Spark[] = [];
  private center: { x: number; y: number };
  private bRuning: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.height = 450;
    this.canvas.width = 450;

    // Центр канваса
    this.center = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 1.4,
    };
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

  private update() {
    this.aFires.push(new Flame(this.center));
    this.aSpark.push(new Spark(this.center));
    this.aSpark2.push(new Spark(this.center));

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

  private draw() {
    this.ctx.globalCompositeOperation = 'source-over';
    // Устанавливаем режим наложения (композиции) для рисования. 'source-over' — стандартный режим, при котором новое изображение накладывается поверх существующего.

    this.ctx.fillStyle = 'rgba( 0, 0, 0, 1 )';
    // Устанавливаем цвет заливки. 'rgba(0, 0, 0, 0)' — это прозрачный черный цвет.

    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    // Заливаем весь канвас цветом, заданным в fillStyle, чтобы очистить его перед отрисовкой следующего кадра. Размер прямоугольника совпадает с размерами канваса (ширина и высота окна браузера).

    const grd = this.ctx.createRadialGradient(
      this.center.x,
      this.center.y - 100,
      200,
      this.center.x,
      this.center.y - 100,
      0
    );
    // Создаем радиальный градиент. Он начинается с точки (center.x, center.y - 100) с радиусом 200 пикселей и заканчивается в той же точке с радиусом 0 пикселей.

    grd.addColorStop(0, 'rgb(10, 10, 10)'); // Этот цвет будет использоваться на внешнем крае градиента (радиус = 200).

    grd.addColorStop(1, 'rgb( 30, 10, 2 )'); // Этот цвет будет использоваться в центре градиента (радиус = 0).

    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y - 100, 200, 0, 2 * Math.PI);
    this.ctx.fillStyle = grd;
    this.ctx.fill();

    this.ctx.globalCompositeOperation = 'overlay';

    for (let i = this.aFires.length - 1; i >= 0; i--) {
      this.aFires[i].draw(this.ctx);
    }

    this.ctx.globalCompositeOperation = 'soft-light';

    for (let i = this.aSpark.length - 1; i >= 0; i--) {
      if (i % 2 === 0) this.aSpark[i].draw(this.ctx);
    }

    this.ctx.globalCompositeOperation = 'color-dodge';

    for (let i = this.aSpark2.length - 1; i >= 0; i--) {
      this.aSpark2[i].draw(this.ctx);
    }
  }
}

class Flame {
  private cx: number;
  private cy: number;
  private x: number;
  private y: number;
  private vy: number;
  private vx: number;
  private r: number;
  private life: number;
  alive: boolean = true;
  private c: { h: number; s: number; l: number; a: number; ta: number };

  constructor(center: { x: number; y: number }) {
    this.cx = center.x;
    this.cy = center.y;
    this.x = rand(this.cx - 25, this.cx + 25);
    this.y = rand(this.cy - 5, this.cy + 5);
    this.vy = rand(1, 3);
    this.vx = rand(-1, 1);
    this.r = rand(20, 30);
    this.life = rand(3, 6);

    // Пытаемся извлечь дату и создать цвет
    const date = this.extractDateFromDOM();
    if (date) {
      const { day, month, year } = date;

      // Уникальная логика вычисления цвета на основе даты
      const hue = (day * 10 + month * 20) % 360; // Оттенок
      const lightness = (50 + (year % 100)) % 100; // Яркость
      this.c = {
        h: hue,                         // Уникальный оттенок
        s: 100,                         // Насыщенность
        l: lightness,                   // Яркость
        a: 0,                           // Начальная прозрачность
        ta: rand(0.8, 0.9),             // Целевая прозрачность
      };
    } else {
      // Если дата недоступна, задаём стандартный цвет
      this.c = {
        h: 120,                         // Зелёный оттенок
        s: 100,
        l: 60,
        a: 0,
        ta: rand(0.8, 0.9),
      };
    }
  }

  // Метод для извлечения даты из DOM
  private extractDateFromDOM(): { day: number; month: number; year: number } | null {
    const dateElement = document.querySelector('.timeline-date'); // Ищем элемент с классом `timeline-date`
    if (dateElement) {
      const dateText = dateElement.textContent?.trim(); // Получаем текстовое содержимое элемента
      if (dateText) {
        // Извлекаем часть текста, соответствующую дате (например, "January 9, 2025")
        const match = dateText.match(/\b\w+ \d{1,2}, \d{4}\b/); // Регулярное выражение для поиска даты
        if (match) {
          const extractedDate = match[0]; // Например, "January 9, 2025"
          const date = new Date(extractedDate); // Преобразуем в объект Date
          if (!isNaN(date.getTime())) {
            return {
              day: date.getDate(), // День
              month: date.getMonth(), // Месяц (0–11)
              year: date.getFullYear(), // Год
            };
          }
        }
      }
    }
    return null; // Если дата не найдена или недействительна
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

  draw(ctx: CanvasRenderingContext2D) {
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
  private cx: number;
  private cy: number;
  private x: number;
  private y: number;
  private lx: number;
  private ly: number;
  private vy: number;
  private vx: number;
  private r: number;
  private life: number;
  alive: boolean = true;
  private c: { h: number; s: number; l: number; a: number };

  constructor(center: { x: number; y: number }) {
    this.cx = center.x;
    this.cy = center.y;
    this.x = rand(this.cx - 40, this.cx + 40);
    this.y = rand(this.cy, this.cy + 5);
    this.lx = this.x;
    this.ly = this.y;
    this.vy = rand(1, 3);
    this.vx = rand(-4, 4);
    this.r = rand(0, 1);
    this.life = rand(4, 5);
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

  draw(ctx: CanvasRenderingContext2D) {
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

const rand = (min: number, max: number): number => Math.random() * (max - min) + min;

const FireCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fire = new Fire(canvasRef.current);
      fire.start();

      return () => {
        fire.stop();
      };
    }
  }, []);

  return <canvas ref={canvasRef} className='fire-decor-canvas'></canvas>;
};

export default FireCanvas;
