type SetupHandlers = (
    canvas: HTMLCanvasElement,
    setScrollOffset: React.Dispatch<React.SetStateAction<number>>,
    drawTimeline: () => void
  ) => () => void;
  
  export const setupEventHandlers: SetupHandlers = (canvas, setScrollOffset, drawTimeline) => {
    const isDragging = { current: false }; // Флаг для проверки drag
    const dragStartX = { current: 0 }; // Начальная позиция drag
    const localOffset = { current: 0 }; // Локальное смещение без обновления React-состояния
  
    // --- Начало drag/swipe ---
    const startDrag = (startX: number) => {
      isDragging.current = true;
      dragStartX.current = startX; // Сохраняем начальную позицию
    };
  
    // --- Перемещение drag/swipe ---
    const moveDrag = (currentX: number) => {
      if (!isDragging.current) return; // Если не drag, выходим
  
      const deltaX = dragStartX.current - currentX; // Разница между начальной позицией и текущей
      dragStartX.current = currentX; // Обновляем начальную точку для плавного drag/swipe
  
      localOffset.current = Math.max(localOffset.current + deltaX, 0); // Локально обновляем смещение
      drawTimeline(); // Перерисовываем временную линию с новым смещением
    };
  
    // --- Завершение drag/swipe ---
    const stopDrag = () => {
      if (!isDragging.current) return; // Если не было drag, ничего не делаем
      isDragging.current = false; // Завершаем drag/swipe
  
      setScrollOffset(localOffset.current); // Обновляем глобальное состояние только после завершения drag
    };
  
    // --- Обработчики мыши ---
    const handleMouseDown = (e: MouseEvent) => {
      startDrag(e.clientX);
    };
    const handleMouseMove = (e: MouseEvent) => {
      moveDrag(e.clientX);
    };
    const handleMouseUp = () => {
      stopDrag();
    };
  
    // --- Обработчики touch ---
    const handleTouchStart = (e: TouchEvent) => {
      startDrag(e.touches[0].clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      moveDrag(e.touches[0].clientX);
    };
    const handleTouchEnd = () => {
      stopDrag();
    };
  
    // --- Прокрутка колесом ---
    const handleWheel = (e: WheelEvent) => {
      const deltaX = e.deltaX;
      localOffset.current = Math.max(localOffset.current + deltaX, 0); // Локально обновляем смещение
      drawTimeline(); // Перерисовываем временную линию
      setScrollOffset(localOffset.current); // Обновляем глобальное состояние
    };
  
    // Устанавливаем события
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
  
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);
  
    canvas.addEventListener('wheel', handleWheel);
  
    // Возвращаем функцию для очистки событий
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
  };
  