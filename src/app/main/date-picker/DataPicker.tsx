'use client';
import StyledButton from '@/components/common/StyledButton';
import { useRef, useEffect, useState } from 'react';

export default function Timeline() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollOffset, setScrollOffset] = useState(15); // Смещение для прокрутки
    const dayWidth = 40; // Ширина одного дня в пикселях
    const canvasWidth = 600; // Фиксированная ширина canvas
    const canvasHeight = 130; // Фиксированная высота canvas
    const [centerDate, setCenterDate] = useState(new Date()); // Центр временной шкалы

    const isDragging = useRef(false); // Флаг для проверки, выполняется ли drag (мышь или свайп)
    const dragStartX = useRef(0); // Начальная позиция drag (для мыши и сенсора)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const gradient = ctx.createLinearGradient(0, 0, canvasWidth, 0);

        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const drawTimeline = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Цвета для тёмной темы
            gradient.addColorStop(0, "rgba(0, 0, 0, 0.2)");
            gradient.addColorStop(0.1, "rgba(0, 0, 0, 0.3)");
            gradient.addColorStop(0.9, "rgba(0, 0, 0, 0.3)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.2)");

            const textColor = '#fff';
            const lineColor = '#555';
            const arrorColor = '#fff';

            // Фон холста
            ctx.globalCompositeOperation = "destination-in";

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "source-over";

            const visibleDays = Math.ceil(canvasWidth / dayWidth + 2); // Количество дней на экране
            const startIndex = Math.floor(scrollOffset / dayWidth); // Начальный индекс дня
            const startDay = new Date(startDate);
            startDay.setDate(startDay.getDate() + startIndex - 6); // Первая видимая дата

            const centerIndex = Math.floor(canvasWidth / 2 / dayWidth); // Индекс дня в центре экрана
            const centerDay = new Date(startDay);
            centerDay.setDate(startDay.getDate() + centerIndex);

            // Обновление центральной даты
            setCenterDate(centerDay);

            // Основная линия
            ctx.beginPath();
            ctx.moveTo(0, 110); // Линия по центру холста
            ctx.lineTo(canvasWidth / 2 - 10, 110);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Основная линия
            ctx.beginPath();
            ctx.moveTo(canvasWidth / 2 + 10, 110); // Линия по центру холста
            ctx.lineTo(canvasWidth, 110);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Линия по центру холста
            ctx.beginPath();
            ctx.moveTo(canvasWidth / 2, 100);
            ctx.lineTo(canvasWidth / 2 - 10, 120);
            ctx.lineTo(canvasWidth / 2 + 10, 120);
            ctx.lineTo(canvas.width / 2, 100);
            ctx.strokeStyle = arrorColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Отрисовка дат
            for (let i = 0; i < visibleDays; i++) {
                const currentDay = new Date(startDay);
                currentDay.setDate(startDay.getDate() + i); // Текущая дата

                //const x = i * dayWidth + 20;
                const x = i * dayWidth + 35 - (scrollOffset % dayWidth); // Координата x
                const y = 75; // Координата y (центр квадрата по вертикали)

                const rectWidth = 30; // Ширина квадрата
                const rectHeight = 25; // Высота квадрата
                const cornerRadius = 5; // Радиус закругления углов

                // Рисуем закругленный квадрат
                ctx.beginPath();
                ctx.moveTo(x - rectWidth / 2 + cornerRadius, y - rectHeight / 2);
                ctx.lineTo(x + rectWidth / 2 - cornerRadius, y - rectHeight / 2);
                ctx.quadraticCurveTo(x + rectWidth / 2, y - rectHeight / 2, x + rectWidth / 2, y - rectHeight / 2 + cornerRadius);
                ctx.lineTo(x + rectWidth / 2, y + rectHeight / 2 - cornerRadius);
                ctx.quadraticCurveTo(x + rectWidth / 2, y + rectHeight / 2, x + rectWidth / 2 - cornerRadius, y + rectHeight / 2);
                ctx.lineTo(x - rectWidth / 2 + cornerRadius, y + rectHeight / 2);
                ctx.quadraticCurveTo(x - rectWidth / 2, y + rectHeight / 2, x - rectWidth / 2, y + rectHeight / 2 - cornerRadius);
                ctx.lineTo(x - rectWidth / 2, y - rectHeight / 2 + cornerRadius);
                ctx.quadraticCurveTo(x - rectWidth / 2, y - rectHeight / 2, x - rectWidth / 2 + cornerRadius, y - rectHeight / 2);
                ctx.closePath();

                // Заливаем квадрат цветом
                ctx.fillStyle = '#000';
                ctx.fill();

                // Отрисовка текста
                ctx.fillStyle = textColor;
                ctx.font = '600 16px Roboto';
                ctx.textAlign = 'center';
                ctx.fillText(`${currentDay.getDate()}`, x, 80);
            }
        };

        const drawWeeks = () => {
            // Вычисляем начальную дату недели
            const weekWidth = dayWidth * 7;
            const startIndex = Math.floor(scrollOffset / weekWidth);
            const startWeekDate = new Date(startDate);
            startWeekDate.setDate(startWeekDate.getDate() + startIndex * 7);

            const visibleWeeks = Math.ceil(canvasWidth / weekWidth) + 1;

            for (let i = 0; i < visibleWeeks; i++) {
                const currentWeekStart = new Date(startWeekDate);
                currentWeekStart.setDate(startWeekDate.getDate() + i * 7);

                const xStart = i * weekWidth - (scrollOffset % weekWidth) - 55;
                const yBase = 40;

                // Подписываем номер недели и год
                const weekNumber = Math.ceil(
                    (currentWeekStart.getTime() - new Date(currentWeekStart.getFullYear(), 0, 1).getTime()) /
                    (7 * 24 * 60 * 60 * 1000)
                );

                ctx.fillStyle = '#fff';
                ctx.font = '14px Roboto';
                ctx.textAlign = 'center';
                ctx.fillText(
                    `Неделя ${weekNumber}`,
                    xStart + weekWidth / 2,
                    yBase - 20
                );

                // Рисуем фигурные скобки
                ctx.beginPath();
                ctx.moveTo(xStart + 10, yBase); // Начало левой стороны
                ctx.lineTo(xStart + 250, yBase);
                ctx.closePath();

                ctx.strokeStyle = '#999';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        };

        drawTimeline();
        drawWeeks();

        const startDrag = (startX: number) => {
            isDragging.current = true;
            dragStartX.current = startX;
        };

        const moveDrag = (currentX: number) => {
            if (!isDragging.current) return;
            const deltaX = dragStartX.current - currentX;
            dragStartX.current = currentX;
            setScrollOffset((prev) => {
                const newOffset = prev + deltaX;
                if (newOffset < 15) return 15; // Запрет на перетаскивание левее 28
                return newOffset;
            });
        };


        const stopDrag = () => {
            isDragging.current = false;
        };

        const handleMouseDown = (e: MouseEvent) => startDrag(e.clientX);
        const handleMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
        const handleMouseUp = () => stopDrag();

        const handleTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX);
        const handleTouchMove = (e: TouchEvent) => moveDrag(e.touches[0].clientX);
        const handleTouchEnd = () => stopDrag();

        const handleWheel = (e: WheelEvent) => {
            setScrollOffset((prev) => {
                const newOffset = prev + e.deltaY;
                if (newOffset < 15) return 15; // Запрет прокрутки левее 28
                return newOffset;
            });
        };


        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mouseleave', handleMouseUp);

        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd);

        canvas.addEventListener('wheel', handleWheel);

        return () => {
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
        <div className='main-content-canvas-wrapper'>
            <div className="current-day">
                Текущая дата: {centerDate.toDateString()}
            </div>
            <div className="timeline-header">
                {`${centerDate.getFullYear()} ${centerDate.toLocaleString('default', { month: 'long' }).toUpperCase()}`}
            </div>
            <canvas ref={canvasRef} className="main-content-canvas" />
            <StyledButton variant={'outlined'} color={'secondary'} sx={{className: 'timeline-date', width: '280px'}}>
                Сделать предсказание на {centerDate.toDateString()}!
            </StyledButton>
        </div>
    );
}
