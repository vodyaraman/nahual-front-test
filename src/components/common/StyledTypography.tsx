import React from "react";
import Typography from "@mui/material/Typography";

interface StyledTypographyProps {
    children: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "body1" | "body2" | "caption";
    color?: "primary" | "secondary" | "default";
    className?: string;
}

const StyledTypography: React.FC<StyledTypographyProps> = ({
    children,
    variant = "h2",
    color = "primary",
    className = "",
}) => {
    return (
        <Typography
            variant={variant}
            color={color}
            className={className}
        >
            {children}
        </Typography>
    );
};

export default StyledTypography;

