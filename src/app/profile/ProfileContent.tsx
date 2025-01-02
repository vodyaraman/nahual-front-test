'use client';

import { useState, useRef } from "react";
import TextCard from "@/components/common/text-card/TextCard";
import ProfileSettings from "./settings/Settings";

export function ProfileContent() {
    const [activeSection, setActiveSection] = useState<keyof typeof sectionRefs>("history");
    const [indicatorStyle, setIndicatorStyle] = useState({ transform: "translateY(0px)" });

    const sectionRefs = {
        history: useRef<HTMLDivElement>(null),
        settings: useRef<HTMLDivElement>(null),
        support: useRef<HTMLDivElement>(null),
    };

    const scrollToSection = (section: keyof typeof sectionRefs) => {
        setActiveSection(section);

        // Устанавливаем фиксированное смещение для индикатора
        const offsetMap = {
            history: "5px",
            settings: "55px",
            support: "105px",
        };

        setIndicatorStyle({
            transform: `translateY(${offsetMap[section]})`,
        });

        // Прокручиваем к секции
        sectionRefs[section]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <section className="profile-content">
            <header className="profile-header">
                <TextCard head="Добро пожаловать, ИМЯ ФАМИЛИЯ!">
                    <nav className="profile-header-navigation">
                        <ul style={{ position: "relative" }}>
                            {/* Индикатор */}
                            <div
                                className="indicator"
                                style={{
                                    ...indicatorStyle,
                                }}
                            />
                            <li>
                                <button
                                    onClick={() => scrollToSection("history")}
                                    className={activeSection === "history" ? "active" : ""}
                                >
                                    История
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("settings")}
                                    className={activeSection === "settings" ? "active" : ""}
                                >
                                    Настройки
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("support")}
                                    className={activeSection === "support" ? "active" : ""}
                                >
                                    Поддержка
                                </button>
                            </li>
                        </ul>
                    </nav>
                </TextCard>
            </header>
            <div className="profile-grid">
                {/* Якорь "История" */}
                <div ref={sectionRefs.history} className="grid-item" id="history">
                    <TextCard>
                        <p>Здесь будет отображаться история ваших предсказаний.</p>
                    </TextCard>
                </div>

                {/* Якорь "Настройки" */}
                <div ref={sectionRefs.settings} className="grid-item" id="settings">
                    <TextCard>
                        <ProfileSettings />
                    </TextCard>
                </div>

                {/* Якорь "Поддержка" */}
                <div ref={sectionRefs.support} className="grid-item" id="support">
                    <TextCard>
                        <p>Здесь вы найдете ответы на часто задаваемые вопросы.</p>
                    </TextCard>
                </div>
            </div>
        </section>
    );
}

export default ProfileContent;
