import React, { useRef, ReactNode } from "react";

interface ScrollButtonProps {
  target: string; // Селектор целевого блока
  children?: ReactNode; // Позволяет передавать внутрь кнопки любой контент (иконки, текст)
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ target, children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(target, {
        duration: 1.5,
      });
    }
  };

  return (
    <button ref={buttonRef} className="next-section active" onClick={handleScroll}>
      {children}
    </button>
  );
};

export default ScrollButton;
