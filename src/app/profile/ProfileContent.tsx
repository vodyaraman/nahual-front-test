'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ProfileHeader from "./ProfileHeader";
import { Skeleton } from "@mui/material";
import ProfileLayout from "@/components/layouts/ProfileLayout";

const ProfileSettings = dynamic(() => import("./settings/Settings"), { ssr: false });

export const SECTIONS = [
    { key: "history", label: "📖 История предсказаний", content: <p>Здесь будет отображаться история ваших предсказаний.</p> },
    { key: "settings", label: "⚙️ Настройки профиля", content: <ProfileSettings /> },
    { key: "support", label: "🎧 Поддержка", content: <p>Здесь вы найдете ответы на часто задаваемые вопросы.</p> },
    { key: "billing", label: "💳 Биллинг", content: <p>Здесь будет отображаться информация о вашем биллинге.</p> },
] as const;

export function ProfileContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState<typeof SECTIONS[number]["key"] | null>(null);

    useEffect(() => {
        const sectionFromQuery = searchParams.get("section") as typeof SECTIONS[number]["key"];
        if (sectionFromQuery && SECTIONS.some(({ key }) => key === sectionFromQuery)) {
            setActiveSection(sectionFromQuery);
        } else {
            setActiveSection("history");
            router.push(`?section=history`, {});
        }
    }, [searchParams, router]);

    const handleSectionClick = (key: string) => {
        setActiveSection(key as typeof SECTIONS[number]["key"]);
        router.push(`?section=${key}`, {});
    };

    return (
        <ProfileLayout>
            <section className="profile-content">
                <div className="profile-header">
                    {activeSection === null ? (
                        <article>
                            <Skeleton variant="text" width="80%" height={50} />
                            <Skeleton variant="text" width="90%" height={50} />
                            <Skeleton variant="text" width="90%" height={50} />
                            <Skeleton variant="text" width="90%" height={50} />
                        </article>
                    ) : (
                        <ProfileHeader
                            activeSection={activeSection ?? "history"}
                            handleSectionClick={handleSectionClick}
                        />
                    )}
                </div>
                <div className="profile-grid">
                    {activeSection ? (
                        <div className="grid-item">
                            <article>
                                {SECTIONS.find(({ key }) => key === activeSection)?.content}
                            </article>
                        </div>
                    ) : (
                        // Скелет для содержимого
                        <div className="grid-item skeleton">
                            <article>
                                <Skeleton variant="text" width="80%" height={30} />
                                <Skeleton variant="text" width="60%" height={30} />
                                <Skeleton variant="rectangular" width="100%" height={200} />
                            </article>
                        </div>
                    )}
                </div>
            </section>
        </ProfileLayout>
    );
}

export default ProfileContent;


