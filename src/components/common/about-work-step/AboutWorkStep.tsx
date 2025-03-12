'use client'

import React, { useRef } from 'react';

// Стили
import './AboutWorkStep.scss';

// Компоненты
import Image from 'next/image';

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';

type Props = {
    imgUrl: string,
    title: string,
    text: string,
    side: 'l' | 'r',
}

export default function AboutWorkStep({ imgUrl, title, text, side }: Props) {
    const targetStep = useRef(null);
    const targetImgStep = useRef(null);
    const targetTitleStep = useRef(null);
    const targetTextStep = useRef(null);

    const sideAnim = {
        l: {
            from: { x: -300, opacity: 0, duration: .8 },
            to: { x: 0, opacity: 1 }
        },
        r: {
            from: { x: 300, opacity: 0, duration: .8 },
            to: { x: 0, opacity: 1 }
        }
    }

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                scroller: window.__lenis?.rootElement,
                trigger: targetStep.current,
                start: 'top 80%',
                end: 'bottom 75%',
                scrub: true,
            }
        })

        tl
            .from(targetStep.current, sideAnim[side].from)
            .to(targetStep.current, sideAnim[side].to)
            .to(targetImgStep.current, { rotateY: 35 })
            .to(targetTitleStep.current, { y: -10, opacity: 0 })
            .fromTo(targetTextStep.current, { x: -50, y: -15, opacity: 0 }, { x: 0, y: -15, opacity: 1 })

    })

    return (

        <div className="step" ref={targetStep}>
            <figure className={clsx("step__desc", side === 'r' && 'step__desc--right')}>
                <Image ref={targetImgStep} className="step-img" src={imgUrl} alt="step-1" width={250} height={250} />
                <figcaption>
                    <p ref={targetTitleStep} className={clsx("step__desc-title", side === 'r' && 'title--right')}>
                        {title}
                    </p>
                    <p ref={targetTextStep} className={clsx("step__desc-text text-right", side === 'r' && 'text--right')}>
                        {text}
                    </p>
                </figcaption>
            </figure>
        </div>

    )
}