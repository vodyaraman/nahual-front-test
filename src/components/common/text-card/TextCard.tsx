"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

// Компоненты
import ScrollButton from "../scroll-button/ScrollButton";

const TextCard = ({
  head = "",
  body = "",
  link = "",
  imageSrc = "",
  imageAlt,
  sx,
  children,
}: {
  head?: React.ReactNode;
  body?: React.ReactNode;
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  sx?: object;
  children?: React.ReactNode;
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (event.clientX - centerX) / rect.width;
    const offsetY = (event.clientY - centerY) / rect.height;

    setRotation({
      x: offsetY * -2.5,
      y: offsetX * 2.5,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className="card-wrapper"
      style={{
        perspective: "1000px",
        ...sx,
      }}
    >
      <article
        className="card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          {
            "--rotation-x": `${rotation.x}deg`,
            "--rotation-y": `${rotation.y}deg`,
          } as React.CSSProperties
        }
      >
        {imageSrc && (
          <div className="card-background">
            <Image src={imageSrc} alt={imageAlt || "Background"} layout="fill" objectFit="cover" />
          </div>
        )}
        <div className="card-content">
          {isLoading ? (
            <Skeleton
              variant="text"
              animation="wave"
              width="60%"
              height="1.5rem"
              style={{ marginBottom: "8px" }}
            />
          ) : (
            <h3 className="card-title">{head}</h3>
          )}
          {isLoading ? (
            <Skeleton
              variant="text"
              animation="wave"
              width="80%"
              height="1rem"
              style={{ marginBottom: "16px" }}
            />
          ) : (
            <p className="card-body">{body}</p>
          )}

          {/* Добавляем children */}
          {children && <div className="card-children">{children}</div>}

          <ScrollButton type="link" target={link} duration={3}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="30%"
                height="1.5rem"
                style={{ borderRadius: "5px" }}
              />
            ) : (
              "Learn More"
            )}
          </ScrollButton>
        </div>
      </article>
    </div>
  );
};

export default TextCard;
