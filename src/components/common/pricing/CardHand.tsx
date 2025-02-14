'use client';

import { useState, useEffect, useRef } from 'react';
import './CardHand.scss';

export const CardHand = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setActiveCard(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCardClick = (index: number) => {
    setActiveCard(prev => (prev === index ? null : index));
  };

  const renderCardContent = (index: number) => (
    <div className="cardHand__front">
      <div className="cardHand__content">
        <h3 className="cardHand__title">Тариф {index + 1}</h3>
        <div className="cardHand__symbols">
          <span>🔮</span>
          <span>✨</span>
          <span>🌟</span>
          <span>💫</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cardHand" ref={containerRef}>
      {/* Заголовок выбора тарифа */}
      {activeCard === null && (
        <h1 className="cardHand__prompt">Выберите тариф для ваших предсказаний</h1>
      )}

      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`cardHand__card ${activeCard === index ? 'cardHand__card--active' : ''}`}
          onClick={() => handleCardClick(index)}
          data-index={index}
        >
          <div className="cardHand__back" />
          {renderCardContent(index)}
        </div>
      ))}

      {/* Блок с описанием тарифа */}
      {activeCard !== null && (
        <div className="cardHand__description">
          <h2>Описание тарифа {activeCard + 1}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. {activeCard + 1}</p>
        </div>
      )}
    </div>
  );
};