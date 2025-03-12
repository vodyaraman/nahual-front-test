import React, { useRef, ReactNode } from "react";

// Стили
import './ScrollButton.scss';
import clsx from "clsx";

interface ScrollButtonProps {
  type: 'btn' | 'link',
  target: string; // Селектор целевого блока
  children?: ReactNode; // Позволяет передавать внутрь кнопки любой контент (иконки, текст)
  duration?: number;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ target, children, type, duration = 1.5 }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    if (window.__lenis) {

      const targetElement = document.querySelector(target);

      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        console.log(targetRect)
        window.__lenis.scrollTo(targetRect.bottom + 30, {
          duration,
        });
      }

    }
  };

  if (type === 'link') {
    return (
      <a href={target} className={'anchor-link'} onClick={handleScroll}>
        {children}
      </a>
    )
  }

  return (
    <button ref={buttonRef} className={'scroll-button'} onClick={handleScroll}>
      {children}
    </button>
  );
};

export default ScrollButton;
