'use client';
import { useRef, useEffect, useState } from 'react';

export default function Timeline() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollOffset, setScrollOffset] = useState(0); // Смещение для прокрутки
    const dayWidth = 40; // Ширина одного дня в пикселях
    const [centerDate, setCenterDate] = useState(new Date()); // Центр временной шкалы

    const isDragging = useRef(false); // Флаг для проверки, выполняется ли drag (мышь или свайп)
    const dragStartX = useRef(0); // Начальная позиция drag (для мыши и сенсора)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = 200;

        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const drawTimeline = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Цвета для тёмной темы
            const backgroundColor = '#000';
            const textColor = '#fff';
            const lineColor = '#555';

            // Фон холста
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const visibleDays = Math.ceil(canvas.width / dayWidth + 2); // Количество дней на экране
            const startIndex = Math.floor(scrollOffset / dayWidth); // Начальный индекс дня
            const startDay = new Date(startDate);
            startDay.setDate(startDay.getDate() + startIndex - 4); // Первая видимая дата

            const centerIndex = Math.floor(canvas.width / 1.8 / dayWidth); // Индекс дня в центре экрана
            const centerDay = new Date(startDay);
            centerDay.setDate(startDay.getDate() + centerIndex);

            // Обновление центральной даты
            setCenterDate(centerDay);

            // Основная линия
            ctx.beginPath();
            ctx.moveTo(0, 110); // Линия по центру холста
            ctx.lineTo(canvas.width, 110);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 120); // Линия по центру холста
            ctx.lineTo(canvas.width / 2, 100);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.stroke()

            // Отрисовка дат
            for (let i = 0; i < visibleDays; i++) {
                const currentDay = new Date(startDay);
                currentDay.setDate(startDay.getDate() + i); // Текущая дата
            
                const x = i * dayWidth - (scrollOffset % dayWidth) + (-18); // Координата x
                const y = 75; // Координата y (центр квадрата по вертикали)
            
                const rectWidth = 30; // Ширина квадрата
                const rectHeight = 25; // Высота квадрата
                const cornerRadius = 5; // Радиус закругления углов
            
                // Рисуем закругленный квадрат
                ctx.beginPath();
                ctx.moveTo(x - rectWidth / 2 + cornerRadius, y - rectHeight / 2); // Левый верхний угол (с учетом закругления)
                ctx.lineTo(x + rectWidth / 2 - cornerRadius, y - rectHeight / 2); // Верхняя линия
                ctx.quadraticCurveTo(x + rectWidth / 2, y - rectHeight / 2, x + rectWidth / 2, y - rectHeight / 2 + cornerRadius); // Правый верхний угол
                ctx.lineTo(x + rectWidth / 2, y + rectHeight / 2 - cornerRadius); // Правая линия
                ctx.quadraticCurveTo(x + rectWidth / 2, y + rectHeight / 2, x + rectWidth / 2 - cornerRadius, y + rectHeight / 2); // Правый нижний угол
                ctx.lineTo(x - rectWidth / 2 + cornerRadius, y + rectHeight / 2); // Нижняя линия
                ctx.quadraticCurveTo(x - rectWidth / 2, y + rectHeight / 2, x - rectWidth / 2, y + rectHeight / 2 - cornerRadius); // Левый нижний угол
                ctx.lineTo(x - rectWidth / 2, y - rectHeight / 2 + cornerRadius); // Левая линия
                ctx.quadraticCurveTo(x - rectWidth / 2, y - rectHeight / 2, x - rectWidth / 2 + cornerRadius, y - rectHeight / 2); // Левый верхний угол
                ctx.closePath();
            
                // Заливаем квадрат цветом
                ctx.fillStyle = '#333'; // Цвет фона квадрата
                ctx.fill();
            
                // Отрисовка текста
                ctx.fillStyle = textColor;
                ctx.font = '14px Roboto';
                ctx.textAlign = 'center';
                ctx.fillText(`${currentDay.getDate()}`, x, 80);
            }            
        };

        drawTimeline();

        // --- Общая логика начала drag/swipe ---
        const startDrag = (startX: number) => {
            isDragging.current = true;
            dragStartX.current = startX; // Сохраняем начальную позицию
        };

        const moveDrag = (currentX: number) => {
            if (!isDragging.current) return; // Если не drag, выходим

            const deltaX = dragStartX.current - currentX; // Разница между начальной позицией и текущей
            dragStartX.current = currentX; // Обновляем начальную точку для плавного drag/swipe

            setScrollOffset((prev) => {
                const newOffset = prev + deltaX;
                return Math.max(newOffset, 0); // Ограничиваем прокрутку назад
            });
        };

        const stopDrag = () => {
            isDragging.current = false; // Завершаем drag/swipe
        };

        // --- Обработка мыши ---
        const handleMouseDown = (e: MouseEvent) => startDrag(e.clientX);
        const handleMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
        const handleMouseUp = () => stopDrag();

        // --- Обработка touch ---
        const handleTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX);
        const handleTouchMove = (e: TouchEvent) => moveDrag(e.touches[0].clientX);
        const handleTouchEnd = () => stopDrag();

        // --- Прокрутка колесом ---
        const handleWheel = (e: WheelEvent) => {
            const deltaY = e.deltaY;
            setScrollOffset((prev) => {
                const newOffset = prev + deltaY;
                return Math.max(newOffset, 0);
            });
        };

        // Добавляем обработчики событий
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp); // Завершаем drag, если мышь покинула холст

        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd);

        canvas.addEventListener('wheel', handleWheel);

        return () => {
            // Удаляем обработчики событий
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mouseleave', handleMouseUp);

            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);

            canvas.removeEventListener('wheel', handleWheel);
        };
    }, [scrollOffset]);

    return (
        <div className="main-container">
            <div className="current-day">
                Текущая дата: {centerDate.toDateString()}
            </div>
            <div className="timeline-header">
                {`${centerDate.toLocaleString('default', { month: 'long' })} ${centerDate.getFullYear()}`}
            </div>
            <canvas ref={canvasRef} className="main-content-canvas" />
        </div>
    );
}
