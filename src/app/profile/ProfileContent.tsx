'use client';

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import StyledTypography from "@/components/common/StyledTypography";

// Лениво загружаем компонент ProfileSettings
const ProfileSettings = dynamic(() => import("./settings/Settings"), { ssr: false });

export function ProfileContent() {
    const [activeSection, setActiveSection] = useState<"history" | "settings" | "support" | "billing">("history");
    const [indicatorStyle, setIndicatorStyle] = useState({ transform: "translateY(0px)" });

    const sections = [
        { key: "history", label: "📖 История предсказаний", content: <p>Здесь будет отображаться история ваших предсказаний.</p> },
        { key: "settings", label: "⚙️ Настройки профиля", content: <ProfileSettings /> },
        { key: "support", label: "🎧 Поддержка", content: <p>Здесь вы найдете ответы на часто задаваемые вопросы.</p> },
        { key: "billing", label: "💳 Биллинг", content: <p>Здесь будет отображаться информация о вашем биллинге.</p> },
    ] as const;

    const sectionRefs = {
        history: useRef<HTMLDivElement>(null),
        settings: useRef<HTMLDivElement>(null),
        support: useRef<HTMLDivElement>(null),
        billing: useRef<HTMLDivElement>(null),
    };

    const scrollToSection = (sectionKey: typeof sections[number]["key"]) => {
        setActiveSection(sectionKey);

        const offsetMap = {
            history: "0px",
            settings: "calc(6px + 100%)",
            support: "calc(14px + 200%)",
            billing: "calc(22px + 300%)",
        } as const;

        setIndicatorStyle({
            transform: `translateY(${offsetMap[sectionKey]})`,
        });

        sectionRefs[sectionKey]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <section className="profile-content">
            <header className="profile-header">
                <article>
                    <StyledTypography>Добро пожаловать, ИМЯ ФАМИЛИЯ</StyledTypography>
                    <nav className="profile-header-navigation">
                        <ul style={{ position: "relative" }}>
                            {/* Индикатор */}
                            <div
                                className="indicator"
                                style={{
                                    ...indicatorStyle,
                                }}
                            />
                            {sections.map(({ key, label }) => (
                                <li key={key}>
                                    <button
                                        onClick={() => scrollToSection(key)}
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
            <div className="profile-grid">
                {sections.map(({ key, content }) => (
                    <div ref={sectionRefs[key]} className="grid-item" id={key} key={key}>
                        <article>{content}</article>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProfileContent;
