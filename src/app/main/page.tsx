import React from "react";
import Header from "@/components/common/header/Header";
import "./Main.scss"
import MainContent from "./MainContent";

export default function MainAction() {
    return (
        <main className="main-container">
            <Header />
            <MainContent/>
        </main>
    )
};