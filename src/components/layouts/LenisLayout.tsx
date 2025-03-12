"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisLayout = ({ children, mainClassName }: { children: React.ReactNode, mainClassName: string }) => {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    // Создаём Lenis, привязываем к <main>
    const lenis = new Lenis({
      wrapper: mainRef.current,
      content: mainRef.current,
      duration: 1.5,
    });

    window.__lenis = lenis; // Сохраняем глобально, если нужно для вызова в других компонентах

    // GSAP ScrollTrigger обновляется при скролле Lenis
    lenis.on("scroll", () => ScrollTrigger.update());
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <main className={mainClassName} ref={mainRef}>{children}</main>;
};

export default LenisLayout;
