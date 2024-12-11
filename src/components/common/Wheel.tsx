"use client";
import { Box } from "@mui/material";
import { templates } from "@/components/shared";

const Wheel = () => (
  <Box
    className="wheel-container"
    sx={{
      ...templates.flexCenter,
      ...templates.absolute,
      width: "100%",
      opacity: 0.1,
      padding: 0,
      animation: "fadeInUp 1s ease",
      zIndex: '-1'
    }}
  >
    <Box
      component="img"
      className="outer-wheel"
      src="/outer-wheel.png"
      alt=""
      sx={{
        ...templates.fixed,
        width: "calc(400px + 15rem)",
        height: "calc(400px + 15rem)",
        top: "10%",
        ...templates.transition,
      }}
    />
    <Box
      component="img"
      className="core-wheel"
      src="/core-wheel.png"
      alt=""
      sx={{
        ...templates.fixed,
        width: "11rem",
        height: "11rem",
        top: "42%",
        ...templates.transition,
      }}
    />
  </Box>
);

export default Wheel;
