import React from "react";
import StyledTypography from "@/components/common/StyledTypography";
import { SECTIONS } from "./ProfileContent";

interface ProfileHeaderProps {
    activeSection: "history" | "settings" | "support" | "billing";
    handleSectionClick: (key: "history" | "settings" | "support" | "billing") => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ activeSection, handleSectionClick }) => {
    const getIndicatorStyle = () => {
        const offsets = {
            history: "0px",
            settings: "calc(6px + 100%)",
            support: "calc(14px + 200%)",
            billing: "calc(22px + 300%)",
        };
        return { transform: `translateY(${offsets[activeSection]})` };
    };

    return (
        <header className="profile-header">
            <article>
                <StyledTypography variant="body1" className="profile-title">
                    Добро пожаловать,<br /> <b>ИМЯ ФАМИЛИЯ Имя</b>
                </StyledTypography>
                <nav className="profile-header-navigation">
                    <ul style={{ position: "relative" }}>
                        {/* Индикатор */}
                        <div className="indicator" style={getIndicatorStyle()} />
                        {SECTIONS.map(({ key, label }) => (
                            <li key={key}>
                                <button
                                    onClick={() => handleSectionClick(key)}
                                    className={activeSection === key ? "active" : ""}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </article>
        </header>
    );
};

export default ProfileHeader;
