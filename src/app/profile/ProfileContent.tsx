'use client';

import { useEffect, useRef, useState } from "react";
import TextCard from "@/components/common/text-card/TextCard";
import ProfileSettings from "./settings/Settings";

export function ProfileContent() {
    const [activeSection, setActiveSection] = useState<keyof typeof sectionRefs>("history");
    const sectionRefs = {
        history: useRef<HTMLDivElement>(null),
        settings: useRef<HTMLDivElement>(null),
        support: useRef<HTMLDivElement>(null),
    };

    const scrollToSection = (section: keyof typeof sectionRefs) => {
        setActiveSection(section);
        sectionRefs[section]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        scrollToSection("history");
    }, []);

    return (
        <section className="profile-content">
            <header className="profile-header">
                <TextCard head="Добро пожаловать, ИМЯ ФАМИЛИЯ!">
                    <nav className="profile-header-navigation">
                        <ul>
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
                <div ref={sectionRefs.history} className="grid-item">
                    <TextCard>
                        <p>Здесь будет отображаться история ваших предсказаний.</p>
                    </TextCard>
                </div>

                {/* Якорь "Настройки" */}
                <div ref={sectionRefs.settings} className="grid-item">
                    <TextCard>
                        <ProfileSettings />
                    </TextCard>
                </div>

                {/* Якорь "Поддержка" */}
                <div ref={sectionRefs.support} className="grid-item">
                    <TextCard>
                        <p>Здесь вы найдете ответы на часто задаваемые вопросы.</p>
                    </TextCard>
                </div>
            </div>
        </section>
    );
}

export default ProfileContent;
