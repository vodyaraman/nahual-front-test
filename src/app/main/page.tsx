'use client'
import React from "react";
import StateLayout from '@/components/layouts/StateLayout';
import StyleLayout from '@/components/layouts/StyleLayout';
import Header from "@/components/common/Header";
import Background from "@/components/common/Background";

export default function MainAction() {
    return (
        <StateLayout>
            <StyleLayout>
                <Header/>
                <Background/>
                <div></div>
            </StyleLayout>
        </StateLayout>
)};