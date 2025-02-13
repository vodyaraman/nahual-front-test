"use client";
import StyledTypography from "@/components/common/StyledTypography";
import Card from "@/components/common/text-card/TextCard";
import Wheel from "@/components/common/wheel/Wheel";
import { contentData } from "@/data/contentData";
import { useEffect, useState } from "react";


export default function LandingContent() {
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 580 && windowWidth <= 1024) {
      const landingContent = document.querySelector(".landing-content")
      if (!landingContent) return
      const HandleScroll = () => {
        setOffset(landingContent.scrollTop)
      };
      landingContent.addEventListener("scroll", HandleScroll);
      return () => landingContent.removeEventListener("scroll", HandleScroll)
    }
    else {
      setOffset(0)
    }
  }, [windowWidth]);


  return (
    <>
      <section className="hero">
        <StyledTypography>
          ПРИВЕТСТВУЮ!
        </StyledTypography>
      </section>
      <section className="landing-content">
        {/* Компонент Wheel */}
        <div className="main-content" style={{
          transform: `translateY(${offset}px)`,
        }}>
          <Card
            key={0}
            head={contentData[0].head}
            body={contentData[0].body}
          >
            <Wheel />
          </Card>

        </div>

        {/* Первый грид */}
        <div className="card-grid">
          {contentData.slice(1).map((card, index) => (
            <Card
              key={index + 1}
              head={card.head}
              body={card.body}
            />
          ))}
        </div>
      </section>
      <section className="pricing">
        <StyledTypography>
          ПЛАТИ БАБКИ!!
        </StyledTypography>
      </section>
      <footer className="footer">
        <StyledTypography>
          ПЛАТИ БАБКИ!!
        </StyledTypography>
      </footer>
    </>
  );
}
