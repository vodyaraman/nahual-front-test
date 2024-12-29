import React from "react";
import { Button } from "@mui/material";

type StyledButtonProps = {
    variant: "contained" | "outlined";
    color: "secondary" | "primary";
    onClick?: () => void;
    children: React.ReactNode;
    href?: string;
};

const buttonStyles = {
    fontSize: "0.75rem",
    padding: "6px 12px",
    borderRadius: "8px",
    lineHeight: "1.5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "auto",
};

export default function StyledButton({
    variant,
    color,
    onClick,
    children,
    href,
}: StyledButtonProps) {
    if (href) {
        return (
            <a href={href} style={{ textDecoration: "none" }}>
                <Button
                    variant={variant}
                    color={color}
                    style={buttonStyles}
                    disableElevation
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
            style={buttonStyles}
            disableElevation
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
