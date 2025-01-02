import React from "react";
import { Button } from "@mui/material";

type StyledButtonProps = {
  variant: "contained" | "outlined";
  color: "secondary" | "primary";
  onClick?: () => void;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset"; // Добавлен проп `type`
  disabled?: boolean; // Добавлен проп `disabled`
  sx?: object; // Дополнительные стили
};

const defaultSx = {
  fontSize: "0.75rem",
  padding: "6px 12px",
  borderRadius: "8px",
  lineHeight: "1.5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "auto",
  width: '100%',
};

export default function StyledButton({
  variant,
  color,
  onClick,
  children,
  href,
  type = "button",
  disabled = false,
  sx = {},
}: StyledButtonProps) {
  const mergedSx = { ...defaultSx, ...sx }; // Объединяем стили

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none" }}>
        <Button
          variant={variant}
          color={color}
          disableElevation
          disabled={disabled} // Обработка пропса `disabled`
          sx={mergedSx} // Применение стилей
        >
          {children}
        </Button>
      </a>
    );
  }
  return (
    <Button
      variant={variant}
      color={color}
      disableElevation
      onClick={onClick}
      type={type} // Обработка пропса `type`
      disabled={disabled} // Обработка пропса `disabled`
      sx={mergedSx} // Применение стилей
    >
      {children}
    </Button>
  );
}
