"use client";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "@/components/common/Header";
import Background from "@/components/common/Background";
import Wheel from "@/components/common/Wheel";
import { templates } from "@/components/shared";
import Image from "next/image";

const Block = ({
  head = "Заголовок",
  body = "Текст",
  link = "/ссылка",
  imageSrc = "/block-background.png",
  imageAlt,
  sx,
}: {
  head?: React.ReactNode;
  body?: React.ReactNode;
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  sx?: object;
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [highlight, setHighlight] = useState({ x: 50, y: 50 });

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

    setHighlight({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setHighlight({ x: 50, y: 50 });
  };

  return (
    <Box
      sx={{
        perspective: "1000px",
      }}
    >
      <Box
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
          transformOrigin: "center bottom",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease",
          boxShadow: `0 0 20px rgba(255, 255, 255, 0.1), 
                      inset 0 0 30px rgba(255, 255, 255, 0.05), 
                      0 0 60px 40px rgba(255, 255, 255, 0.001)`,
          background: `radial-gradient(circle at ${highlight.x}% ${highlight.y}%, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.1))`,
          ...sx,
        }}
      >
        {imageSrc && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt || "Background"}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        )}
        <Box
          sx={{
            padding: "16px",
            color: "#F7E59D",
          }}
        >
          <Box
            component="h3"
            sx={{
              marginBottom: "8px",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {head}
          </Box>
          <Box
            component="p"
            sx={{
              marginBottom: "16px",
              fontSize: "1rem",
            }}
          >
            {body}
          </Box>
          <Box
            component="a"
            href={link}
            sx={{
              textDecoration: "none",
              color: "#00f",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Learn More
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Init = () => {
  return (
    <Box sx={{ ...templates.relative, width: "100%", height: "90vh", padding: '0 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'space-between' }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: "grid",
          alignItems: 'center',
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(1fr, 1fr))",
          padding: "20px",
        }}
      >
        <Block
          imageSrc="/block-background.png"
          head='NAHUAL VISIONS - это'
          body='Nahual Visions - наша платформа, предоставляющая уникальный алгоритм предсказаний, основанный на математической связи линий на Вашей руке и небесным календарём майя.'
          sx={{
            width: '39vh',
            height: '39vh'
          }} />
        <Block
          imageSrc="/block-background.png"
          head='Нетерпится начать?'
          body='зарегистрируйтесь, определите тариф использования или воспользуйтесь бесплатной попыткой, просто нажав на ладонь справа:'
          sx={{
            width: '39vh',
            height: '39vh'
          }} />
      </Box>

      <Box
        sx={{
          ...templates.fixed,
          width: "13rem",
          height: "13rem",
          top: '10%',
          left: 'calc(33% + 6rem)',
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          overflow: "visible",
          opacity: '0.9',
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "none",
            boxShadow: "0 0 20px 10px rgba(58,75,202, 1)",
            animation: "cosmicShadow 4s infinite alternate",
            "@keyframes cosmicShadow": {
              from: {
                boxShadow: "0 0 20px 10px rgba(58,75,202, 1)",
                opacity: 0.7,
              },
              to: {
                boxShadow: "0 0 40px 20px rgba(58,75,202, 0.3)",
                opacity: 0.3,
              },
            },
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "78%",
            height: "78%",
            borderRadius: "50%",
            background: "radial-gradient(circle, #f3ff6b, #F7E59D)",
            animation: "yellowGlow 2s infinite alternate",
            "@keyframes yellowGlow": {
              from: {
                transform: "scale(0.99)",
                opacity: 1,
              },
              to: {
                transform: "scale(1.01)",
                opacity: 0.7,
              },
            },
            zIndex: 2,
          }}
        />
        <Box
          component="img"
          className="playbutton"
          src="/playbutton.png"
          alt=""
          sx={{
            width: "100%",
            height: "100%",
            cursor: "grab",
            opacity: "1",
            zIndex: 3,
          }}
        />
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: "grid",
          alignItems: 'center',
          justifyContent: 'right',
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(1fr, 1fr))",
          padding: "20px",
        }}
      >
        <Block
          imageSrc="/block-background.png"
          head='NAHUAL VISIONS - это'
          body='Nahual Visions - наша платформа, предоставляющая уникальный алгоритм предсказаний, основанный на математической связи линий на Вашей руке и небесным календарём майя.'
          sx={{
            width: '39vh',
            height: '39vh'
          }} />
        <Block
          imageSrc="/block-background.png"
          head='Нетерпится начать?'
          body='зарегистрируйтесь, определите тариф использования или воспользуйтесь бесплатной попыткой, просто нажав на ладонь справа:'
          sx={{
            width: '39vh',
            height: '39vh'
          }} />
      </Box>
    </Box>
  );
};

export default function Home() {
  useEffect(() => {
    const wheel = document.querySelector(".outer-wheel") as HTMLElement | null;
    const playWheel = document.querySelector(".core-wheel") as HTMLElement | null;

    let lastAngle = 0;
    let accumulatedAngle = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (!wheel || !playWheel) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      const currentAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      const angleDiff = currentAngle - lastAngle;

      if (Math.abs(angleDiff) > 180) {
        accumulatedAngle += angleDiff > 0 ? angleDiff - 360 : angleDiff + 360;
      } else {
        accumulatedAngle += angleDiff;
      }

      wheel.style.transform = `rotate(${accumulatedAngle}deg)`;
      playWheel.style.transform = `rotate(${-accumulatedAngle}deg)`;

      lastAngle = currentAngle;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Box
      className="main"
      sx={{
        ...templates.relative,
        width: "100vw",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Header />
      <Background />
      <Wheel />
      <Init />
    </Box>
  );
}
