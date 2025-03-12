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

type Props = {
    imgUrl: string,
    title: string,
    text: string,
    index?: number,
}

export default function AboutWorkStep({ imgUrl, title, text, }: Props) {
    const targetStep = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.about-work__steps',
                start: 'top center',
                end: 'bottom 40%',
                markers: {
                    startColor: 'white',
                    endColor: 'white',
                }
            }
        })

        tl
            .from('.step', { x: -100, opacity: 0.2 })
            .to('.step', { x: 0, opacity: 1 })
    })

    return (

        <div className="step" ref={targetStep}>
            <figure className="step__desc">
                <Image className="step-img" src={imgUrl} alt="step-1" width={250} height={250} />
                <figcaption>
                    <p className="step__desc-title">
                        {title}
                    </p>
                    <p className="step__desc-text text-right">
                        {text}
                    </p>
                </figcaption>
            </figure>
        </div>

    )
}