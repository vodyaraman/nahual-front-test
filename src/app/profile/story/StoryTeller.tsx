import React, { useState } from "react";
import "./Story.scss";
import { historyData } from "@/data/historyData";
import StyledButton from "@/components/common/StyledButton";
import StyledTypography from "@/components/common/StyledTypography";
import { Typography } from "@mui/material";

export default function StoryTeller() {
    const [predictions, setPredictions] = useState(historyData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(predictions.length / itemsPerPage);

    const handleSuccessToggle = (id: string) => {
        setPredictions((prevPredictions) =>
            prevPredictions.map((item) =>
                item.id === id ? { ...item, success: !item.success } : item
            )
        );
    };

    const calculateSuccessPercentage = () => {
        const total = predictions.length;
        const successful = predictions.filter((item) => item.success).length;
        return total > 0 ? ((successful / total) * 100).toFixed(2) : "0.00";
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const paginatedPredictions = predictions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <article className="story-content">
            <aside className="story-content__header">
                <StyledTypography variant="h2">История предсказаний</StyledTypography>
                <p className="story-content__stats">
                    Успешные предсказания: <b>{calculateSuccessPercentage()}%</b>
                </p>
            </aside>
            {paginatedPredictions.map((item) => (
                <div className="story-content__item" key={item.id}>
                    <Typography variant="body1">{item.response}</Typography>
                    <time>
                        {new Date(item.timestamp).toLocaleString()}
                    </time>
                    <label className="switcher">
                        <span>Успешно:</span>
                        <input
                            type="checkbox"
                            checked={item.success}
                            onChange={() => handleSuccessToggle(item.id)}
                        />
                        <span className="story-slider"></span>
                    </label>
                </div>
            ))}
            <footer className="story-content__footer">
                <StyledButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant={"contained"}
                    color={"secondary"}
                    sx={{ color: '#000' }}
                >
                    Предыдущая
                </StyledButton>
                <div>
                    Страница <br/> {currentPage} из {totalPages}
                </div>
                <StyledButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant={"contained"}
                    color={"secondary"}
                    sx={{ color: '#000' }}
                >
                    Следующая
                </StyledButton>
            </footer>
        </article>
    );
}
