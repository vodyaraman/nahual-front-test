"use client";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import "./Wheel.scss";

const Wheel = () => {
  const [isLoading, setIsLoading] = useState(true);

  const outerWheelRef = useRef<HTMLDivElement | null>(null);
  const coreWheelRef = useRef<HTMLDivElement | null>(null);

  const lastAngleRef = useRef(0);
  const accumulatedAngleRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const wheel = outerWheelRef.current;
      const playWheel = coreWheelRef.current;
      if (!wheel || !playWheel) return;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      const currentAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      const angleDiff = currentAngle - lastAngleRef.current;

      if (Math.abs(angleDiff) > 180) {
        accumulatedAngleRef.current += angleDiff > 0 ? angleDiff - 360 : angleDiff + 360;
      } else {
        accumulatedAngleRef.current += angleDiff;
      }

      wheel.style.transform = `rotate(${accumulatedAngleRef.current}deg)`;
      playWheel.style.transform = `rotate(${-accumulatedAngleRef.current}deg)`;

      lastAngleRef.current = currentAngle;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Скелетоны */}
      {isLoading && (
        <>
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{
              position: "fixed",
              width: "calc(400px + 15rem)",
              height: "calc(400px + 15rem)",
              top: "10%",
              zIndex: -1,
              transition: "all 0.3s ease",
            }}
          />
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{
              position: "fixed",
              width: "11rem",
              height: "11rem",
              top: "54%",
              zIndex: -1,
              transition: "all 0.3s ease",
            }}
          />
        </>
      )}

      {/* Основной контент */}
      <Box
        className={`wheel-container ${isLoading ? "" : "loaded"}`}
        sx={{
          transition: "opacity 0.5s ease",
        }}
      >
        <Box
          component="img"
          ref={outerWheelRef}
          className="outer-wheel"
          src="/outer-wheel.png"
          alt=""
        />
        <Box
          component="img"
          ref={coreWheelRef}
          className="core-wheel"
          src="/core-wheel.png"
          alt=""
        />
      </Box>
    </Box>
  );
};

export default Wheel;
