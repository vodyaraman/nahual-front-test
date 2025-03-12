"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Данные
import { contentData } from "@/data/contentData";
import { aboutWorkData } from "@/data/aboutWorkData";

// Компоненты
import { CardHand } from "@/components/common/pricing/CardHand";
import ScrollButton from "@/components/common/scroll-button/ScrollButton";
import Card from "@/components/common/text-card/TextCard";
import Wheel from "@/components/common/wheel/Wheel";
import AboutWorkStep from "@/components/common/about-work-step/AboutWorkStep";

gsap.registerPlugin(ScrollTrigger);

export default function LandingContent() {
  const landingRef = useRef<HTMLElement | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  // ✅ 1. Следим за шириной окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ 2. Реализуем эффект параллакса между `hero` и `landing-content`
  useEffect(() => {
    if (!landingRef.current || !window.__lenis) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "center top",
        scrub: true,
        scroller: "main",
        pin: true,
        pinSpacing: false,
      },
    });

    tl.to(".hero", {
      yPercent: -50,
      opacity: 0,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // ✅ 3. Двигаем `.main-content`, если ширина в диапазоне 580px - 1024px, используя Lenis
  useEffect(() => {
    if (windowWidth >= 580 && windowWidth <= 1024) {
      const mainContent = document.querySelector(".main-content");
      if (!mainContent) return;

      const handleScroll = () => {
        mainContent.classList.add("sticky");
      };

      window.__lenis?.on("scroll", handleScroll);
      return () => {
        mainContent.classList.remove("sticky");
        window.__lenis?.off("scroll", handleScroll);
      };
    } else {
      document.querySelector(".main-content")?.classList.remove("sticky");
    }
  }, [windowWidth]);


  return (
    <>
      {/* 🚀 HERO */}
      <section className="hero">
        <article className="hero__content">
          <h1 className="hero__title">
            УЗНАЙ БУДУЩЕЕ, СОКРЫТОЕ В <span>ЗВЁЗДНОМ НЕБЕ!</span>
          </h1>
          <ScrollButton target={".landing-content"} type="btn">
            explore
          </ScrollButton>
        </article>
      </section>

      {/* 🚀 LANDING CONTENT */}
      <section ref={landingRef} className="landing-content">
        <div className="main-content">
          <Card key={0} head={contentData[0].head} body={contentData[0].body}>
            <Wheel />
          </Card>
        </div>

        <div className="card-grid">
          {contentData.slice(1).map((card, index) => (
            <Card key={index + 1} head={card.head} body={card.body} link={card.link === null ? undefined : card.link} />
          ))}
        </div>
      </section>

      {/* ABOUR WORK */}
      <section className="about-work" id="about-work">
        <h2 className="about-work__title" id="about-work__title">Как это работает?</h2>

        <div className="about-work__steps">
          {
            aboutWorkData.map(step =>
              <AboutWorkStep
                key={step.id}
                side={step.side}
                imgUrl={step.imageUrl}
                title={step.title}
                text={step.text}
              />
            )
          }
        </div>
      </section>

      {/* 🚀 PRICING */}
      <section className="pricing">
        <CardHand />
      </section>

      {/* 🚀 FOOTER */}
      <footer className="footer">

      </footer>
    </>
  );
}
