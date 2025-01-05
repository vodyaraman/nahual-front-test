'use client'
 
import { useEffect, useRef } from 'react';

const MainContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Рисуем сияющий круг
    const drawGlowingCircle = (x: number, y: number, radius: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 300;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.closePath();
    };

    // Очищаем холст перед рисованием
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем три тани
    drawGlowingCircle(200, 200, 1, 'red'); // Первая тани
    drawGlowingCircle(400, 300, 1, 'blue'); // Вторая тани
    drawGlowingCircle(600, 200, 1, 'green'); // Третья тани

    // Убираем тень для последующих элементов
    ctx.shadowBlur = 0;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        margin: '0 auto',
        border: '1px solid #000',
      }}
    />
  );
};

export default MainContent;
